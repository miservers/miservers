/* LAB-2,  2020 @AR
*
*  This Boot Sector
*  It is loaded by BIOS at 0x7C00 (31K). it moves itself to INITSEG, using INT 13h, then jump to.
*  Then it load Kernel to SYSSEG:0. addr 0x10000. 
*  Finaly it hands over to Kernel(setup.S) 
*  
*  Addr = SEGEMENT*16 + Offset
*
*/

BOOTSEG  = 0x07C0        # BIOS load BootSector here 
INITSEG  = 0x9000        # BootSect move itself here
SYSSEG   = 0x1000        # BootSect loads Kernel there

STACKSEG = 0x9000    
SYSLEN   = 31            # sectors number of kernel (bootsector must not be counted)  

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
   movw ax, fs
   movw ax, gs
   movw $STACKSEG, ax     # Stack segment
   movw ax, ss
   movw $0xF000, sp       # stack 0x9F000 -> 0x90000. 636K->576K : ~64KB

   # Set video mode
   # clear screen
   movb $0, ah
   movb $VIDEO_MODE, al
   int $0x10

   call move_bsect


   movw $INITSEG, ax
   movw ax, ds   
   jmp $INITSEG,$next
   next:
   mov $v_loading, si
   call print_msg

   call load_kernel

   mov $v_ok, si
   call print_msg
   call halt

#
# boucle halt
#
halt:
   jmp halt

#
# Move boot Sector to INITSEG:0. addr 0x90000
#
move_bsect:
   movw $0, si
   movw $INITSEG, ax
   movw ax, es
   movw $0, di
   movw $512*31, cx     # nb of bytes to move
   rep
   movsb                # move [ds:si] to [es:di]
   ret

#
# Load Kernel to SYSSEG:0. addr 0x10000
#
load_kernel:
   movb $0x02, ah
   movb $SYSLEN, al    # number of sectors to read   (1-128 dec.)
   movb $0, ch         # track/cylinder number  (0-1023 dec., see below)
   movb $1, cl         # sector number  (1-17 dec.)
   movb $01, dh        # head number  (0-15 dec.)
   movb $80, dl        # drive number (0=A:, 1=2nd floppy, 80h=drive 0, 81h=drive 1)
   movw $SYSSEG, bx
   movw bx, es
   movw $0, bx         # ES:BX pointer to buffer
   int $0x13
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

v_loading:
   .asciz "Loading Kernel......."

v_ok:
   .asciz "[OK]"

.org 510
boot_flag:  
   .word 0xAA55  # magic word, for bootable disk
.end
