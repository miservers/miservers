#include <console.h>
#include <io.h>
#include <libc.h>

#define VIDEO_BASE   0xB8000   /* base of color video memory. 32KB*/
#define VIDEO_SIZE    0x4000   /* 16K color video memory */

/* VGA CRT (CL-GD5446) controller chips. */
#define GD5446_INDEX         0x3D4     /* GD5446 index register */
#define GD5446_DATA          0x3D5     /* GD5446 data register  */



#define NR_CONS 4

#define SCR_WIDTH    	80	/* # characters on a line */
#define SCR_LINES    	25	/* # lines on the screen */
#define SCR_SIZE	(80*25)	/* # characters on the screen */

#define DEFAULT_ATTR  ((BLUE<<4 | WHITE) << 8)
#define ERASE_CHAR             (DEFAULT_ATTR | 0x00)


typedef struct console {
  int row;               /*current line*/
  int col;               /*current column*/
  unsigned short cursor; /* offset in video RAM for cursor*/
  unsigned short attr;   /*attribute.8 low bits are zeroed*/
  unsigned short blank;  /*erase character*/
  long start;            /* start of video memory of this console */
  long origin;           /* offset in RAM where 6845 base points */
  int  size;             /* size of video memory */
  long limit;            /* limit of this console's video memory */
} console_t;
 
console_t consoles[NR_CONS];
console_t *curcons; /*currently visible*/

#define mem_pos(cons,row,col) (unsigned short *)(cons->start + cons->origin*2 + (row)*SCR_WIDTH*2 + (col)*2)
#define cursor(cons) (cons->origin + cons->row*SCR_WIDTH  + cons->col )

void set_gd5446(unsigned short value, int reg);

void cons_clear(int tty)
{
  console_t *cons = &consoles[tty];
  memsetw ((short*)mem_pos(cons,0,0), cons->blank, VIDEO_SIZE);
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
  cons_clear (0);
}


/* in:
 *   index: set index register register
 *   value : 16-bit value to set it to
 * Set a register pair inside the gd5446.
 * indexes 0Ch-0Dh tell the 5446 where in video ram to start(origin)
 * indexes 0Eh-0Fh tell the 5446 where to put the cursor
 */
void set_gd5446(unsigned short value, int index)
{
  outb(index,  GD5446_INDEX ); /*set the index register*/
  outb((value >> 8) & 0xff,   GD5446_DATA);  /*output high byte*/
  outb(index + 1,   GD5446_INDEX);
  outb(value & 0xff,   GD5446_DATA);  /*output low byte*/
}


