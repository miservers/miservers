## Lab 2
1. BootSector is loaded by BIOS at 0x7C00.
2. It move itself to 0x90000.
3. Then, it loads Kernel at 0x10000. Kernel size is 16KB max. 
4. Then jump to Kernel Setup at 0x10000(far jump). From now, BootSector and BIOS will never be used, and may be overwritten.
5. Setup intialise IDT-Interrupt Descriptor Table at 0. then intialise GDT.
5. It activate Protected mode.  
6. then it passes control to Kernel Main.


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
