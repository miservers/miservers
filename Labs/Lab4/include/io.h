#ifndef _ASM_IO_H
#define _ASM_IO_H

#define outb(value,port) \
	__asm__("outb %%al, %%dx"::"a"(value), "d"(port))

	
#define inb(port) \
  ({ unsigned char _value;\
	 __asm__ volatile("inb %%dx, %%al":"=a"(_value):"d"(port));\
	 _value; })

#endif 
