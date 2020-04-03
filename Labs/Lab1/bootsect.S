/* LAB-1,  2020 @AR
*
*  This Boot Sector will only print a message on the creen. 
*  
*  It is loaded by BIOS at 0x7C00 (31K). 
*
*/

BOOTSEG = 0x07C0  

.att_syntax noprefix
.code16
.global _start

_start:
   # Init the DS and SS
   movw $BOOTSEG, ax
   mov ax, ds
   mov ax, es
   movw 0x9000, ax   # Stack segment
   mov ax, ss
   movw 0xF000, sp   # stack 0x9F000 -> 0x90000. 651K->589K

   mov $v_hello, si
   call print_msg

print_msg:
   push ax
  while_1: 
   lodsb           # load byte at ds:si into AL
   test al, al      # test si AL=0 
   jz end_1
   movb 0x0E, ah    # write function 
   int $0x10        # Bios interrupt:write AL on screen
   jmp while_1 
  end_1:
   pop ax
   ret

v_hello:
   .asciz "Hello World!" # message on the screen


.org 510
boot_flag:  
   .word 0xAA55  # magic word, for bootable disk
.end
