## Lab 1
In this Lab, I write , in assembler,  a BootSector witch only prints a message on the screen, by using BIOS interrupt 10H.

Kernel image is generated in the Makefile (command Linux dd).

To run this Lab :
	
	$ cd Lab1 
	$ make
	$ ~/magOS/Labs/run-qemu-Lab.sh 1

To run in debug mode: see [qemu-gdb.md](/documentation/kernel/qemu-gdb.md)
	
	$ ~/magOS/Labs/run-qemu-Lab.sh 1 -g
	$ gdb -x ~/magOS/tools/gdb-user.cmd


## Real mode 
It is a 16-bit mode. All x86 boot in real mode.

**Memory Addressing**  
In real mode, only **1MB** is addressable (**20bits** Bus). By using segmementation, **Segment:Offset**. 16 bit Segment Registers:  CS, DS, ES, FS, GS, SS. 

    PhysicalAddr = Segment*16 + Offset  = Segment<<4 + Offset

Segment is **64Kb** size, and 16 bits align.


Example : 
    
    18FA:9C04 ,  PhyAddr = 18FA0+9C04 = 22BA4

## MBR
MBR-Master Boot Record, is the first sector(LBA=0).

![](/documentation/images/MBR.png)

## Boot Process
- On powerOn, Bios load the MBR at (segment,offset)=(0x07C0:0x0000).
  
![Memory at boot](/documentation/images/Memory-Boot-Lab1.png)

**Hexadecimals**  
0x400    =  2^10 = 1 KB  
0x1000   =  2^12 = 4 KB  
0x10000  =  2^16 = 64 KB  
0x100000 =  2^20 = 1 MB  
            2^32 = 4 GB    

0xA0000  =  A*0x10000 = A*2^16 = 640 KB








## References
- http://a.michelizza.free.fr/pmwiki.php?n=TutoOS.Bootsect
- https://www.eecs.wsu.edu/~cs460/
- https://github.com/bhanderson/cpts460