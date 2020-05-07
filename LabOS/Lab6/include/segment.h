#ifndef SEGMENT_H
#define SEGMENT_H

/* Segments in Real Mode */
#define BOOTSEG   0x07C0        /* where BIOS load BootSector*/ 
#define INITSEG   0x9000        /* BootSect move itself at 0x90000=640K*/
#define SYSSEG     0x100        /* BootSect loads setup+Kernel at 0x1000=4K*/
#define STACKSEG  0x9000        

/* Segments in Protected Mode */
#define KERNEL_CS      0x8
#define KERNEL_DS     0x10
#define USER_CS       0x1B    /*0x18+3, user RPL=3*/
#define USER_DS       0x23	  /*0x20+3, user RPL=3*/	
#define SYSADDR     0x2000    // Kernel code(Heads and C code) linked and loaded at this addr
#define SETUPSIZE   0x1000    // 4KB. Size of setup.bin file. 


#define PAGE_OFFSET     0x00000000 /* No offset in Kernel Code. kVirtual addr = phy addr*/


#endif