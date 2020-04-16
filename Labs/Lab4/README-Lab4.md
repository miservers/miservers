## Lab 4
1. Enter the Kernel calling Main.c (Kernel)
2. Write console driver, to write text on the console

**Kernel bootable image**  
![](../../documentation/images/kernel-bootable-image.png)

##  Cirrus CL-GD5446 PCI VGA card
See **CL-GD5446 technical manual reference**  
- Emulated by Qemu
- it is compabible with IBM VGA hardware
- CRTC controller registers
  - CRTC index and data : **3D4-3D5** when CL-GD5446 is programmed for color.

**Example of setting cursor location**  
![](../../documentation/images/Kervel-VGA-CTR-Example.png)

**Example of setting screen start address**  
![](../../documentation/images/Kervel-VGA-CTR-Example2.png)


**Video RAM**:  
From  0xB8000 to 0xBF000. 0xB8000 is the base of color video/text memory(32KB).

**Console properties**:  
color text mode. 16 colors. 80 rows and 25 columns. the VGA mode is set BIOS(bootSect.S). 

**VGA Character arrangement**  
![](../../documentation/images/Kernel-VGA-Char-arrangement.png)


**Cirrus CL-GD5446**    
![](../../documentation/images/Kernel-VGA-CL-GD5446.png)

**PC L-GD5446 subsystem architecture**    
![](../../documentation/images/Kernel-VGA-Architecture.png)

**PC CL-GD5446 functional diagram**    
![](../../documentation/images/Kernel-VGA-Diagram.png)



## Char and Block Driver
**Motherboard: Northbridge KT400**  
![](../../documentation/images/Kernel-Motherboard-KT400.png)

**Model of connecting CPU and IO controllers**  
![](../../documentation/images/kernel-connecting-CPU-IO-controllers.png)

**PC IO architecture**  
![](../../documentation/images/Kernel-PC-IO-architecture.png)

**VGA connector**  
![](../../documentation/images/kernel-VGA_conector.png)