/* @AR 2020
*  
*/
.att_syntax noprefix
.code32

#include <segment.h>


.global  startup_32,_start
.extern start_kernel


_ESP = STACKSEG<<4 + 0x9C00      # linear addr for esp

_start:
startup_32:
	mov $KERNEL_DS, ax
   	mov ax, ds
   	mov ax, es
   	mov ax, fs
   	mov ax, gs
   	mov ax, ss
 
   	mov $_ESP, esp


   call start_kernel

 halt:
   jmp halt


 
