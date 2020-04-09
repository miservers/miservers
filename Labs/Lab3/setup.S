/* Copyright 2020 @AR
 *
 * setup.S : this is the Kernel Entry.
 *   - get the machine info(cpu/ram) and save them at 0x90000.
 *   - initialize:
 *     - the temp GDT : for Segmentation. 
 *       Tow segment descriptorw will be defined: CS and DS. with base=0 , limit=4GB, DPL=0.  
 *   - switch  cpu to protected mode(PE)
 *   - jump to head.S:startup_32(at 0x1000)
 */

#include <segment.h>


.att_syntax noprefix
.code16
.global setup_start

temp_CS = 8
temp_DS = 16

setup_start:
   
   call save_meminfo

   call halt

halt:
   jmp halt

# save phy memory info at 0x90000
# http://www.uruk.org/orig-grub/mem64mb.html
save_meminfo:
   clc      # clear Carry flag
   mov $0, ebx
   movw $INITSEG, ax
   movw ax, es
   movw $0, di   # es:di is the destination buffer
   mov $20, ecx
   mov $v_smap, edx
   mov $0xE820, eax  # function
   int $0x15
   jc .error
   .error: nop
   ret

v_smap: 
   .asciz "SMAP"

# Temporary GDT, used only for boot purpose. it has 3 entries: 0, CS, DS.
# for DS and CS: base=0, limit=ffffffff, DPL=0(kernel privileges)  
temp_gdt:
   .word 0, 0, 0, 0
   .word 0xFFFF, 0, 0x9A00, 0x00CF  # Code Segment Descriptor base=0 limit=FFFFFFFF DPL=0 type=0xA(exec/read)
                                    # s=1, p(resent)=1, AVL=0, DB=1, G=1(Granularity=4K pages) 
   .word 0xFFFF, 0, 0x9200, 0x00CF  # DS type=2(read/write)

   
setup_end:
.org 2044      # 4 sectors
   .ascii "ANAS"
.end
