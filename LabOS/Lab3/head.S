/* @AR 2020
*  
*/

#include <segment.h>

.att_syntax noprefix
.code32
.global startup_32

_ESP = STACKSEG<<4 + 0x9C00      # linear addr for esp

startup_32:
	mov $KERNEL_DS, ax
   	mov ax, ds
   	mov ax, es
   	mov ax, fs
   	mov ax, gs
   	mov ax, ss
 
   	mov $_ESP, esp


   jmp halt

 halt:
   jmp halt


 


 
