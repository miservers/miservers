## Real mode 
It is a 16-bit mode. All x86 boot in real mode.

**Memory Addressing** 
There is 1MB addressable memory (20bits). By using segmementation, **Segment:Offset**. 16 bit Segment Registers:  CS, DS, ES, FS, GS, SS. 

    PhysicalAddr = Segment*16 + Offset  = Segment<<4 + Offset

Example : 
    
    18FA:9C04 ,  PhyAddr = 18FA0+9C04 = 22BA4

## MBR
MBR-Master Boot Record, is first sector(LBA=0).

![](/documentation/images/MBR.png)

   
