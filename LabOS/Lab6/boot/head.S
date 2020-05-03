/* @AR 2020
*  
*/
.att_syntax noprefix
.code32

#include <segment.h>


.global  startup_32, _idt , _idtr, ignore_int
.extern start_kernel, cons_write, idt_init

_ESP = STACKSEG<<4 + 0x9C00      # linear addr for esp

startup_32:
    cli
	  mov $KERNEL_DS, ax
   	mov ax, ds
   	mov ax, es
   	mov ax, fs
   	mov ax, gs
   	mov ax, ss
 
   	mov $_ESP, esp

   
   call idt_init     # init IDT table

   lidt (_idtr)      # load IDT desc in IDTR register  
   
   call start_kernel
  
ignore_int:
  iret

.data
## IDT
.align 8 
_idtr:
  .word 256*8  #limit 
  .long _idt

.align 8
_idt:
  .fill 256,8,0

.end 
