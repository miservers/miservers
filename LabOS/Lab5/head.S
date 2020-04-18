/* @AR 2020
*  
*/
.att_syntax noprefix
.code32

#include <segment.h>


.global  startup_32, _idt , _idtr
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

   
   call setup_idt     # setup IDT table

   call start_kernel


#
# init IDT 256 entries. then load idtr register pointing on the table.
#
setup_idt:
  mov $desc_ignore_int, ebx  # desc_ignore_int.offset = ignore_int
  mov $ignore_int, eax     
  movw ax, (ebx)
  shrl $16, eax
  movw ax, 6(ebx)
  
  xor ecx, ecx       
  mov desc_ignore_int, eax
  mov desc_ignore_int+4, edx
  mov  $_idt, ebx
for_each_idt:             # idt[i]=desc_ignore_int for all 256 interrupts
  mov eax, (ebx, ecx, 8)
  mov edx, 4(ebx, ecx, 8)
  inc ecx
  cmpl $256, ecx
  jb for_each_idt
  
  lidt (_idtr)  
  ret

  
ignore_int:
  iret

.data
.align 4
desc_ignore_int:
  .word 0          #offset low
  .word KERNEL_CS  #selector
  .word 0x8E00     #type INTGATE  
  .word 0          #offset high 

## IDT
.align 16 
_idtr:
  .word 256*8  #limit 
  .long _idt

.align 16
_idt:
  .fill 256,8,0


 
