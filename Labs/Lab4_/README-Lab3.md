## Lab 3
1. Makefile must link(ld) kerenl code at 0xC0010000(3GB+0x10000), kernel will be loaded at phy addr 0x10000 .
2. bootSector jump to setup.S  at 0x10000(far jump).
2. setup save cpu/mem using bios INT 15H.
3. Setup intialize: 
   3.2. GDT- Global diretory table at 0x. gdt size: 40 B(five 64bits-entries).   
        GDTR register pointe on GDT.
        GDT is used for SEGMENTATION.
   
   3.3. a Directory Table-DT0(4KB) , and a Page Table-PT0(4KB). they are used,  for PAGING, to translate   
        kernel linear addresses to physical ones.  
        CR3 will pointe on DT.

4. Then we activate Protected Mode.
5. From now, BIOS will never be used, and may be overwritten.
6. then we passes control to Kernel Main(C program).



## Protected Mode 

**Physical Memory Layout in protected mode**  
  ![](/documentation/images/phy-mem-boot-protected-Mode.png)

**Segmentation and paging**  
  ![](/documentation/images/IA32-Segmentation-Paging.png)


**Segmentation: Flat Model**  
  ![](/documentation/images/IA32-Segmentation-Flat-Model.png)

**Segmentation: Protected Flat Model**  
  ![](/documentation/images/IA32-Segmentation-Protected-Flat-Model.png)

**Paging**  
  ![](/documentation/images/IA32-Paging.png)

**Virtual(logical) To Physical Memory Translation**  
  ![](/documentation/images/Virtual-To-Physical-Memory.png)
