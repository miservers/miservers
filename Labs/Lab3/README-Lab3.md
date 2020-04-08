## Lab 3
0. Makefile must link(ld) kerenl code at 0xC0000000(3GB).
1. bootSector jump to setup.S (Kernel Entry) at 0x10000(far jump).
2. Setup intialize:
   2.1. IDT- Interrupt directory table at addr 0. idt size:     
   
   2.2. GDT- Global diretory table at 0x. gdt size: 40 B(five 64bits-entries).   
        GDTR register pointe on GDT.
        GDT is used for SEGMENTATION.
   
   2.3. a Directory Table-DT0(4KB) , and a Page Table-PT0(4KB). they are used,  for PAGING, to translate   
        kernel linear addresses to physical ones.  
        CR3 will pointe on DT.

3. Then we activate Protected Mode.
6. then we passes control to Kernel Main(C program).




NOTE: Kernel Image must mounted on drive 0, Qemu option -hda. Because it is hard-coded in bootsect.S.

To run this Lab :
	
	$ cd Lab2 
	$ make
	$ ~/magOS/Labs/run-qemu-Lab.sh 2

To run in debug mode: see [qemu-gdb.md](/documentation/kernel/qemu-gdb.md)
	
	$ ~/magOS/Labs/run-qemu-Lab.sh 2 -g
	$ gdb -x ~/magOS/tools/gdb-user.cmd


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

**Memory Addressing**  
In real mode, only **1MB** is addressable (**20bits** Bus). By using segmementation, **Segment:Offset**. 16 bit Segment Registers:  CS, DS, ES, FS, GS, SS. 

    PhysicalAddr = Segment*16 + Offset  = Segment<<4 + Offset

Segment is **64Kb** size, and 16 bits align.


Example : 
    
    18FA:9C04 ,  PhyAddr = 18FA0+9C04 = 22BA4



## References
- http://a.michelizza.free.fr/pmwiki.php?n=TutoOS.Bootsect
- https://www.eecs.wsu.edu/~cs460/
- https://github.com/bhanderson/cpts460
- INT 13H:  https://stanislavs.org/helppc/int_13.html
- INT 10H:  https://stanislavs.org/helppc/int_10.html
