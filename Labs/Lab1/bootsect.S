/* LAB-1,  2020 @AR
*
*  This Boot Sector aims to :
*           - Print a message on the creen. Only. 
*  
*  It is loaded by BIOS at 0x7C00 (31K). 
*
*/

BOOTSEG  = 0x07C0  
STACKSEG = 0x9000

VIDEO_MODE = 0x03        # 03h : 80x25 16 color text (CGA,EGA,MCGA,VGA)
                         # 12h : 640x480 16 color graphics (VGA)
SCREEN_BG  = 0x11 
ATTR_COLOR = 0x11

.att_syntax noprefix
.code16
.global _start

_start:
   # Init the DS and SS
   movw $BOOTSEG, ax
   movw ax, ds
   movw ax, es
   movw $STACKSEG, ax     # Stack segment
   movw ax, ss
   movw $0xF000, sp       # stack 0x9F000 -> 0x90000. 636K->576K : ~64KB

   # Set video mode
   # clear screen
   movb $0, ah
   movb $VIDEO_MODE, al
   int $0x10

   
   # Display Hello message
   mov $v_hello, si
   call print_msg

   # boucle halt
   call halt

halt:
   jmp halt


#
# Display a message on screen
#     Parameter : string pointer in ds:si
#
print_msg:
   push ax
   push bx

   movb $0x0e, ah        # write function 
   movb $0, bh           # page
   movb $0x99, bl
  while_1: 
   lodsb                 # [ds:si] -> al
   test al, al           # test if AL=0 
   jz end_1
   int $0x10             
   jmp while_1 
  end_1:
   pop bx
   pop ax
   ret

v_hello:
   .asciz "Hello World...Boot Sector [OK] !"


.org 510
boot_flag:  
   .word 0xAA55  # magic word, for bootable disk
.end
