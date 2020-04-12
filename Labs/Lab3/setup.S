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

tempCS = 8
temp_DS = 16

SYSADDR = 0x1400 

SETUPSIZE = 0x400       # 1Kbytes. this binary size. 

.att_syntax noprefix
.code16
.global setup_start

setup_start:
   

   #call save_meminfo     # save phy memory size at INITSEG (0x90000)


/* Enabling protected mode */
   cli
   mov $gdtr_desc, esi 
   lgdt (esi)          # load gdt desc in gdtr register
   
   mov cr0, eax        # set bit 0(PE) of CR0 
   or $1, eax
   mov eax, cr0

   mov $SYSSEG, eax
   shl $4, eax   # eax << 4
   jmp $0x8,$0x1000+next   # far jump
  
   next:
   mov $temp_DS, ax
   mov ax, ds
   mov ax, es
   mov ax, fs
   mov ax, gs
   mov ax, ss

   jmp 0x1400   # far jump
  

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
   jc halt
   ret


halt:
   jmp halt

#
# linear address calculator 
#  in : addr in eax
#  out: linear addr in esi. esi = INITSEG<<4 + eax 
linear_calc:
   mov $SYSSEG, esi
   shl $4, esi   # eax << 4
   add eax, esi
   ret



# Temporary GDT, used only for boot purpose. it has 3 entries: 0, CS, DS.
# for DS and CS: base=0, limit=ffffffff, DPL=0(kernel privileges)  
.org 512
temp_gdt:
   .word 0, 0, 0, 0
   .word 0xFFFF, 0, 0x9A00, 0x00CF  # Code Segment Descriptor base=0 limit=FFFFFFFF DPL=0 type=0xA(exec/read)
                                    # s=1, p(resent)=1, AVL=0, DB=1, G=1(Granularity=4K pages) 
   .word 0xFFFF, 0, 0x9200, 0x00CF  # DS type=2(read/write)

gdtr_desc: 
   .word 3*8                        # limit : number of bytes in GDT
   .long (SYSSEG<<4) + temp_gdt     # gdt base : GDT linear address
   
setup_end:
.org SETUPSIZE-4       
   .ascii "ANAS"
.end
