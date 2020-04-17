/* @AR 2020
*  
*/
.att_syntax noprefix
.code32

#include <segment.h>


.global  startup_32
.extern start_kernel


_ESP = STACKSEG<<4 + 0x9C00      # linear addr for esp

startup_32:
	mov $KERNEL_DS, ax
   	mov ax, ds
   	mov ax, es
   	mov ax, fs
   	mov ax, gs
   	mov ax, ss
 
   	mov $_ESP, esp

   
   #movl $0x07690748,0xb8000

   call start_kernel




 
