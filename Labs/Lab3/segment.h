#ifndef SEGMENT_H
#define SEGMENT_H

#define BOOTSEG   0x07C0        /* where BIOS load BootSector*/ 
#define INITSEG   0x9000        /* BootSect move itself at 0x90000=640K*/
#define SYSSEG    0x100         /* BootSect loads Kernel at 0x1000=4K*/

#define STACKSEG  0x9000        

#endif