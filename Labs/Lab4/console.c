#include <console.h>
#include <io.h>
#include <libc.h>

#define COLOR_BASE   0xB8000   /* base of color video memory. 32KB*/
#define COLOR_SIZE    0x4000   /* 16K color video memory */

/* VGA CRT controller chips. */
#define C_GD5446_INDEX         0x3D4   /* port for 6845 color */
#define INDEX              0   /* 6845's index register */
#define DATA               1   /* 6845's data register */


#define NR_CONS 4

#define SCR_WIDTH    	80	/* # characters on a line */
#define SCR_LINES    	25	/* # lines on the screen */
#define SCR_SIZE	(80*25)	/* # characters on the screen */

#define DEFAULT_ATTR  ((LIGHT_BLUE<<4 | WHITE) << 8)
#define ERASE_CHAR             (DEFAULT_ATTR | 0x00)


int video_port;		/* I/O port for accessing 6845 */

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

#define pos(cons,row,col) (unsigned short *)(cons->start + cons->origin*2 + (row)*SCR_WIDTH*2 + (col)*2)
#define cursor(cons) (cons->origin + cons->col + cons->row*SCR_WIDTH)

void set_6845(unsigned short value, int reg);

void cons_clear(int tty)
{
  console_t *cons = &consoles[tty];
  memsetw ((short*)pos(cons,0,0), cons->blank, COLOR_SIZE);
  cons->col = cons->row = 0;
}

void cons_init()
{
  curcons = &consoles[0];
  curcons->start = COLOR_BASE; 
  curcons->origin = 0;
  curcons->cursor = 0; 
  curcons->col = curcons->row = 0;
  curcons->attr = DEFAULT_ATTR;
  curcons->blank = ERASE_CHAR;
  curcons->size = SCR_SIZE;
  video_port = C_6845;
  cons_clear (0);
}


/* in:
 *   reg: which register pair to set
 *   value : 16-bit value to set it to
 * Set a register pair inside the 6845.
 * Registers 12-13 tell the 6845 where in video ram to start(origin)
 * Registers 14-15 tell the 6845 where to put the cursor
 */
void set_6845(unsigned short value, int reg)
{
  outb(reg, video_port + INDEX); /*set the index register*/
  outb((value >> 8) & 0xff, video_port + DATA);  /*output high byte*/
  outb(reg + 1, video_port + INDEX);
  outb(value & 0xff, video_port + DATA);  /*output low byte*/
}


