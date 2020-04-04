/* LAB-1,  2020 @AR
*
*  This Boot Sector will only print a message on the creen. 
*  
*  It is loaded by BIOS at 0x7C00 (31K). 
*
*/

BOOTSEG = 0x07C0  

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
   movw $0x9000, ax     # Stack segment
   movw ax, ss
   movw $0xF000, sp     # stack 0x9F000 -> 0x90000. 651K->589K

   # Set video mode
   # clear screen
   movb $0, ah
   movb $VIDEO_MODE, al
   int $0x10

   movb $0x0b, ah
   movb $1, bh
   movb $SCREEN_BG, bl
   int $0x10

   # Erase screen and Color screen
   #call scroll_up 
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
   mov $0, al           # number of lines to scroll 
   mov $SCREEN_BG, bh   
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

   movb $0x0e, ah        # write function 
   movb $0, bh           # page
   movb $7, bl
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
   .asciz "Hello World" # message on the screen


.org 510
boot_flag:  
   .word 0xAA55  # magic word, for bootable disk
.end
