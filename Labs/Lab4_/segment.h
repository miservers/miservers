#ifndef SEGMENT_H
#define SEGMENT_H

#define BOOTSEG   0x07C0        /* where BIOS load BootSector*/ 
#define INITSEG   0x9000        /* where BootSect move itself */
#define SYSSEG    0x1000        /* BootSect loads Kernel there*/

#define STACKSEG  0x9000        

#endif