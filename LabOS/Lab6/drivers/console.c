#include <console.h>
#include <io.h>
#include <libc.h>

#define VIDEO_BASE         0xb8000   /* base of color video memory. 32KB*/
#define VIDEO_END          0xbffff   /* base of color video memory. 32KB*/
#define VIDEO_SIZE          0x4000   /* 16K color video memory */
#define CONS_RAM_WORDS          80   /* video ram buffer size */


/* VGA CRT (CL-GD5446) controller chips. */
#define REG_INDEX         0x3D4     /* GD5446 index register */
#define REG_DATA          0x3D5     /* GD5446 data register  */
#define REG_ORIGIN         0x0C     /* origin register */
#define REG_CURSOR         0x0E     /* cursor register */


#define NR_CONS 4

#define COLUMN_NR    	80	/* # characters on a line */
#define ROW_NR    	  25	/* # lines on the screen */
#define SCR_SIZE	(80*25)	/* # characters on the screen */

#define DEFAULT_ATTR           ((BLUE<<4 | WHITE) << 8)
#define ERASE_CHAR             (DEFAULT_ATTR | 0x00)

#define SCROLL_UP   0
#define SCROLL_DOWN 1



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
  char inqueue[128];     /*for cons read*/
  int  in_idx;            /*in index*/
  
  } console_t;
 
console_t consoles[NR_CONS];
console_t *curcons; /*currently visible*/

#define pos(cons,row,col) (unsigned short *)(cons->start + cons->origin*2 + (row)*COLUMN_NR*2 + (col)*2)
#define cursor_pos(cons) (unsigned short *)(cons->start + cons->origin*2 + cons->row*COLUMN_NR*2 + cons->col*2 )
#define cursor(cons) (cons->origin + cons->row*COLUMN_NR  + cons->col )

extern int enter, up_arrow, down_arrow, page_up, page_down, backspace; /*keyborad.c*/
void set_gd5446(unsigned int value, int reg);

void cons_clear(int tty)
{
  console_t *cons = &consoles[tty];
  cons->col = cons->row = 0;
  cons->origin = 0;
  memsetw ((u16*)pos(cons,0,0), cons->blank, VIDEO_SIZE);
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
  curcons->in_idx = 0;
  set_gd5446 (curcons->origin,REG_ORIGIN); //tell the 5446 where in video ram to start(origin)
  set_gd5446 (0,REG_CURSOR);               //tell the 5446 to put the cursor at top
  cons_clear (0);
}



void clear_line(console_t* cons, int nr)
{
  memsetw ((u16 *)pos(cons,nr,0), (u16)cons->blank, COLUMN_NR);
}


void cons_scroll (console_t *cons, int direction)
{
  
  if (direction == SCROLL_DOWN) {
    if ((cons->origin + SCR_SIZE) >= VIDEO_SIZE) { //we reach the end of VGA mem
      memcpy ((u8 *)(VIDEO_BASE+2*COLUMN_NR), (u8 *)VIDEO_BASE, (VIDEO_SIZE-COLUMN_NR)*2);     
    }
    else
      cons->origin += COLUMN_NR;   
  }

  else if (direction == SCROLL_UP)
  {
    cons->origin -= COLUMN_NR;
  }
  
  set_gd5446(cons->origin, REG_ORIGIN);
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
  
  if (curcons->col >= COLUMN_NR) {
    flush (curcons);
    curcons->row++;
    curcons->col = 0;
  } 

  if (curcons->row >= ROW_NR) {
    cons_scroll(curcons, SCROLL_DOWN);
    clear_line (curcons, ROW_NR-1);
    curcons->row = ROW_NR-1;
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



void cons_handler(char (*getc)(void))
{
  char c;
  if ((c=getc()) >= 0) {
    curcons->inqueue[curcons->in_idx++] = c;
    cons_putchar (c);
    flush (curcons);
  }

  else if (enter) {
    curcons->inqueue[curcons->in_idx] = '\0';
  }

  else if (up_arrow)
    cons_scroll(curcons, SCROLL_UP);
  
  else if (down_arrow)
    cons_scroll(curcons, SCROLL_DOWN);
  
  else if (backspace)
    cons_backspace();
}

void move_cursor_arrow(int arrow)
{
  switch (arrow) {  
  case UP_ARROW   : curcons->row--; break;  
  case DOWN_ARROW : curcons->row++; break;  
  case LEFT_ARROW : curcons->col--; break;  
  case RIGHT_ARROW: curcons->col++; break;
  default : break; 
  }
  update_cursor(curcons);  
}


void show_cursor()
{
  update_cursor(curcons);
}

void cons_backspace()
{
  if (curcons->col <= 2) 
    return; /*dont remove ps1*/
  curcons->col--;
  *cursor_pos(curcons) = curcons->blank;
  update_cursor(curcons);
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


