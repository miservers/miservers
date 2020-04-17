#ifndef SEGMENT_H
#define SEGMENT_H

/* Segments in Real Mode */
#define BOOTSEG   0x07C0        /* where BIOS load BootSector*/ 
#define INITSEG   0x9000        /* BootSect move itself at 0x90000=640K*/
#define SYSSEG     0x100        /* BootSect loads setup+Kernel at 0x1000=4K*/
#define STACKSEG  0x9000        

/* Segments in Protected Mode */
#define KERNEL_CS       8
#define KERNEL_DS      16
#define USER_CS        32
#define USER_DS        48
#define SYSADDR    0x2000         // Kernel code(Heads and C code) linked and loaded at this addr
#define SETUPSIZE  0x1000        // 4KB. Size of setup.bin file. 


#endif