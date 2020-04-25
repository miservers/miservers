#ifndef _ASM_IO_H
#define _ASM_IO_H

#include <types.h>

#define outb(value,port) \
	__asm__("outb %%al, %%dx"::"a"(value), "d"(port))

#define outw(value,port) \
	__asm__("outw %%ax, %%dx"::"a"(value), "d"(port))

#define outl(value,port) \
	__asm__("outl %%eax, %%dx"::"a"(value), "d"(port))

/* outb avec pause*/
#define outb_p(value,port) \
   __asm__("outb %%al, %%dx \n\t" \
           "jmp 1f \n\t" \
	        "1:"::"a"(value), "d"(port))
	
#define inb(port) \
  ({ u8 _value;\
	 __asm__ volatile("inb %%dx, %%al":"=a"(_value):"d"(port));\
	 _value; })

#define inw(port) \
  ({ u16 _value;\
	 __asm__ volatile("inw %%dx, %%ax":"=a"(_value):"d"(port));\
	 _value; })


#define inl(port) \
  ({ u32 _value;\
	 __asm__ volatile("inl %%dx, %%eax":"=a"(_value):"d"(port));\
	 _value; })

#define inb_p(port) \
   ({ u8 _value;\
	  __asm__ volatile("inb %%dx, %%al \n\t" \
	                    "jmp 1f \n\t" \
	                    "1:":"=a"(_value):"d"(port));\
	  _value; }) 	
	
	
#endif 
