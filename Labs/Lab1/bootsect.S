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
   movw ax, ds
   movw ax, es
   movw $0x9000, ax     # Stack segment
   movw ax, ss
   movw $0xF000, sp     # stack 0x9F000 -> 0x90000. 651K->589K

   # Set video mode : 80x25 16 color text
   # clear screen
   movb $0, ah
   movb $0x03, al
   int $0x10

   # Erase screen and Color screen
   call scroll_up 
   #mov $0x03, al
   #int $0x10


   # Display Hello message on the screen
   mov $v_hello, si
   call print_msg

   # boucle halt
   call halt

halt:
   jmp halt


#
# Scroll up screen
#
scroll_up:
   push ax
   push bx
   push dx
   mov $0, al      # number of lines to scroll 
   mov $0x5F, bh   # attribute to display 
   mov $0, ch      # y top left
   mov $0, cl      # x top left
   mov $24, dh     # y lower right
   mov $79, dl     # x lower right
   mov $0x6, ah    # scroll up function
   int $0x10
   pop dx
   pop bx
   pop ax
   ret

#
# Display a message on screen
#     Parameter : string pointer in ds:si
#
print_msg:
   push ax
   push bx
  while_1: 
   lodsb            # [ds:si] -> al
   test al, al      # test si AL=0 
   jz end_1
   movb $0x0E, ah    # write function 
   int $0x10         # Bios interrupt:write AL on screen
   jmp while_1 
  end_1:
   pop bx
   pop ax
   ret

v_hello:
   .asciz "Hello World!" # message on the screen


.org 510
boot_flag:  
   .word 0xAA55  # magic word, for bootable disk
.end
