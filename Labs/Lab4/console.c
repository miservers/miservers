#include <console.h>
#include <io.h>
#include <libc.h>

#define VIDEO_BASE     0xb8000   /* base of color video memory. 32KB*/
#define VIDEO_SIZE      0x4000   /* 16K color video memory */
#define CONS_RAM_WORDS      80   /* video ram buffer size */

/* VGA CRT (CL-GD5446) controller chips. */
#define REG_INDEX         0x3D4     /* GD5446 index register */
#define REG_DATA          0x3D5     /* GD5446 data register  */
#define REG_ORIGIN         0x0C     /* origin register */
#define REG_CURSOR         0x0E     /* cursor register */


#define NR_CONS 4

#define SCR_WIDTH    	80	/* # characters on a line */
#define SCR_LINES    	25	/* # lines on the screen */
#define SCR_SIZE	(80*25)	/* # characters on the screen */

#define DEFAULT_ATTR           ((BLUE<<4 | WHITE) << 8)
#define ERASE_CHAR             (DEFAULT_ATTR | 0x00)


typedef struct console {
  int row;               /*current line*/
  int col;               /*current column*/
  unsigned short cursor; /* offset in video RAM for cursor*/
  unsigned short attr;   /*attribute.8 low bits are zeroed*/
  unsigned short blank;  /*erase character*/
  long start;            /* start of video memory of this console */
  long origin;           /* offset in RAM(0xb8000) where GD5446 base points */
  int  size;             /* size of video memory */
  long limit;            /* limit of this console's video memory */
  unsigned short ramqueue[CONS_RAM_WORDS]; /* buffer for video RAM */
  } console_t;
 
console_t consoles[NR_CONS];
console_t *curcons; /*currently visible*/

#define pos(cons,row,col) (unsigned short *)(cons->start + cons->origin*2 + (row)*SCR_WIDTH*2 + (col)*2)
#define cursor(cons) (cons->origin + cons->row*SCR_WIDTH  + cons->col )

void set_gd5446(unsigned int value, int reg);

void cons_clear(int tty)
{
  console_t *cons = &consoles[tty];
  memsetw ((short*)pos(cons,0,0), cons->blank, VIDEO_SIZE);
  cons->col = cons->row = 0;
}

void cons_init()
{
  curcons = &consoles[0];
  curcons->start = VIDEO_BASE; 
  curcons->origin = 0;
  curcons->cursor = 0;
  curcons->col = curcons->row = 0;
  curcons->attr = DEFAULT_ATTR;
  curcons->blank = ERASE_CHAR;
  curcons->size = SCR_SIZE;
  set_gd5446 (curcons->origin,REG_ORIGIN); //tell the 5446 where in video ram to start(origin)
  set_gd5446 (0,REG_CURSOR);               //tell the 5446 to put the cursor at top
  cons_clear (0);
}



void clear_line(console_t* cons, int nr)
{
  memsetw ((short*)pos(cons,nr,0), (short)cons->blank, SCR_WIDTH);
}

#define SCROLL_UP   0
#define SCROLL_DOWN 1
void scroll(console_t *cons, int direction)
{
  
  if (direction == SCROLL_UP)
    cons->origin += SCR_WIDTH;
  else if (direction == SCROLL_DOWN)
    cons->origin -= SCR_WIDTH;
 
  if (cons == curcons) set_gd5446(cons->origin, REG_ORIGIN);
}

void update_cursor(console_t *cons)
{
  cons->cursor = cursor(cons);
  set_gd5446 (cons->cursor, REG_CURSOR);
}

void flush (console_t *cons)
{
  int i;
  
  for (i=0; i < cons->col; i++) {
    *pos(cons,cons->row,i) = cons->ramqueue[i];
  }
}
    
void cons_putchar(register char c)
{
  if (c == '\n') {
    flush (curcons);
    curcons->col = 0;
    curcons->row++;
  } 
  else {  
    curcons->ramqueue[curcons->col] = curcons->attr | c;
    curcons->col++;
  }
  
  if (curcons->col >= SCR_WIDTH) {
    flush (curcons);
    curcons->row++;
    curcons->col = 0;
  }      
  if (curcons->row >= SCR_LINES) {
    scroll(curcons, SCROLL_UP);
    clear_line (curcons, SCR_LINES-1);
    curcons->row = SCR_LINES-1;
    curcons->col = 0;
  }
  update_cursor(curcons);
}

void cons_write(char *str)
{
  char* tmp = str;
  while (*tmp)
    cons_putchar(*(char *)tmp++);
  flush (curcons);
}


/* in:
 *   reg: set index register
 *   value : 16-bit value to set it to
 * Set a register pair inside the gd5446.
 * indexes 0Ch-0Dh tell the 5446 the offset where in video ram to start(origin)
 * indexes 0Eh-0Fh tell the 5446 where to put the cursor
 */
void set_gd5446(unsigned int  value, int reg)
{
  outb(reg,  REG_INDEX ); /*set the index register*/
  outb((value >> 8) & 0xff,   REG_DATA);  /*output high byte*/
  outb(reg + 1,   REG_INDEX);
  outb(value & 0xff,   REG_DATA);  /*output low byte*/
}


