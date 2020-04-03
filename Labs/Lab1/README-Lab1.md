## Real mode 
It is a 16-bit mode. All x86 boot in real mode.

**Memory Addressing**  
In real mode, only 1MB is addressable (20bits Bus). By using segmementation, **Segment:Offset**. 16 bit Segment Registers:  CS, DS, ES, FS, GS, SS. 

    PhysicalAddr = Segment*16 + Offset  = Segment<<4 + Offset

Example : 
    
    18FA:9C04 ,  PhyAddr = 18FA0+9C04 = 22BA4

## MBR
MBR-Master Boot Record, is the first sector(LBA=0).

![](/documentation/images/MBR.png)

## Boot Process
- On powerOn, Bios load the MBR at (segment,offset)=(0x07C0:0x0000).

**Memory at boot**  
![](/documentation/images/Memory-Boot-Lab1.png)



## References
- http://a.michelizza.free.fr/pmwiki.php?n=TutoOS.Bootsect
- https://www.eecs.wsu.edu/~cs460/
- https://github.com/bhanderson/cpts460