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

setup_start:
   

   #call save_meminfo        # save phy memory size at INITSEG (0x90000)

   # Enabling protected mode
   cli
   lgdt (gdtr_desc)          # load gdt desc in gdtr register
   
   mov cr0, eax              # set bit 0(PE) of CR0 
   or $1, eax
   mov eax, cr0

   jmp $KERNEL_CS,$SYSADDR      # far jump to Head.S (32 bits code)
  

# save phy memory size at 0x90000
# https://wiki.osdev.org/Detecting_Memory_(x86)
save_meminfo:
   clc      # clear Carry flag
   movw $INITSEG, ax
   movw ax, es
   movw $0, di   # es:di is the destination buffer
   mov $0, ebx
   mov $24, ecx
   mov $0x534D4150, edx  # magic number: "SMAP" 
   mov $0x0000E820, eax  # function
   int $0x15
   ret


# GDT, used only for boot purpose. it has 3 entries: 0, CS, DS.
# for DS and CS: base=0, limit=ffffffff, DPL=0(kernel privileges)  
.org 512
gdt:
   .word 0, 0, 0, 0                 # null
   .word 0xFFFF, 0, 0x9A00, 0x00CF  # Kernel Code Segment Descriptor base=0 limit=FFFFFFFF DPL=0 type=0xA(exec/read)
                                    # s=1, p(resent)=1, AVL=0, DB=1, G=1(Granularity=4K pages) 
   .word 0xFFFF, 0, 0x9200, 0x00CF  # Kernel DS type=2(read/write)
   .word 0xFFFF, 0, 0xFA00, 0x00CF  # User CS. base=0 limit=4G DPL=3 prevelege level
   .word 0xFFFF, 0, 0xF200, 0x00CF  # User DS. base=0 limit=4G DPL=3
   .word 0, 0, 0, 0                 # not used
    

gdtr_desc: 
   .word 3*8                        # limit : number of bytes in GDT
   .long (SYSSEG<<4) + gdt     # gdt base : GDT linear address
   
setup_end:
.org SETUPSIZE-4       
   .ascii "ANAA"
.end
