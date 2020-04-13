## Lab 4
1. Enter the Kernel calling Main.c (Kernel)
2. Write console driver, to write text on the console


**Memory Adressing**  

logical addr = linear addr = physical addr.

We choose flat model segmentation. Two segments are defined, CS and DS. Segment descriptors are defined in GDT. 
both are with base=0 and limit=FFFFFFFF, so they use all virtual space(4GB).  

**GDT** : Global directory table.   



**Debugging protected mode** 
  ~~~
  $ cp ~/magOS/tools/gdbinit_asm.txt ~/.gdbinit
  $ edit ~/magOS/tools/gdb-user.cmd 

  $ ~/magOS/Labs/run-qemu-Lab.sh 3 -g

  $ gdb -x ~/magOS/tools/gdb-user.cmd 
  ~~~

## Protected Mode 
 Section 9.8 in **Intel Architecture - System Programming Guide Vol 3**  

**Physical Memory Layout in protected mode**  
  ![](../../documentation/images/phy-mem-boot-protected-Mode.png)

**Segmentation and paging**  
  ![](../../documentation/images/IA32-Segmentation-Paging.png)

**Memory Management Registers**  
  ![](../../documentation/images/IA32-MMU-Registers.png)

**Segmentation: Flat Model**  
  ![](../../documentation/images/IA32-Segmentation-Flat-Model.png)

**Segmentation: Protected Flat Model**  
  ![](../../documentation/images/IA32-Segmentation-Protected-Flat-Model.png)

**Segment Descriptor**  
  ![](../../documentation/images/IA32-Segment-Descriptor.png)

**Paging**  
  ![](../../documentation/images/IA32-Paging.png)

**Virtual(logical) To Physical Memory Translation**  
  ![](../../documentation/images/Virtual-To-Physical-Memory.png)
