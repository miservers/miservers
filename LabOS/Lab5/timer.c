/*
 * Copyright 2016 @AR
 *
 * this program define the timer(PIT 8253 - Programmable Interrupt Timer) isr
 * see: http://lacl.univ-paris12.fr/cegielski/bios/ch8.pdf
 *
 * Pit 8253 has 3 separate compters(channels). CLK0/
*/
#include <timex.h>
#include <io.h>
#include <types.h>
#include <ptrace.h>
#include <console.h>

#define HZ                   100  /*100Hz. frequence out. an interrupt every 10ms=1/100 s*/
#define CLOCK_RATE       1193180  /*frequence in entry. 1.19318Mz. */

#define LATCH  (CLOCK_RATE / HZ)  /* LATCH=11931.8: the frequency divider*/   
                                                 


#define TIMER_0     0x40  /*timer 0 port*/
#define TIMER_1     0x41  /*timer 1 port*/
#define TIMER_2     0x42  /*timer 2 port*/
#define CTRL_PORT   0x43  /*Mode control port*/


#define DEBUG 0

unsigned long jiffies = 0;

void timer_handler(unsigned long esp)
{
  
  jiffies++;
  
  #if DEBUG==1 
  cons_write("Timer...");
  #endif

}

void pit_8253_init(void)
{
  outb_p(0b00110110, CTRL_PORT);   /* binary, mode 3, LSB/MSB, chanel(timer) 0*/ 
  outb_p(LATCH & 0xff, TIMER_0);   /* LSB. divider low byte */
  outb_p(LATCH >> 8, TIMER_0);     /* MSB. divider high byte */
}



