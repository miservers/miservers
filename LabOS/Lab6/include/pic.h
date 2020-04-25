#ifndef _PIC_H
#define _PIC_H

#define MASTER 1
#define SLAVE  2


void pic_8259a_init();
   
void irq_init();

#endif
