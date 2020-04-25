## Lab 5
1. simple PCI driver


### PCI
Each vendor has a unique ID assigned, and each vendor assigns a unique ID to a device.

**configuration space**  
256 bytes are assigned to each device function in the basic PCI bus variant, 8 functions per device/slot/card and 32 devices per bus can exist in maximum

There are two mechanisms of accessing configuration space on x86 PC:  
- Through well known I/O ports 
   - **0xCF8** – PCI CONFIG_ADDRESS (write address first, A0:1=0)
   - **0xCFC** – PCI CONFIG_DATA (read/write corresponding byte, 16-bit or 32-bit entity, address bits 0 and 1 added to 0xCFC)

- Enhanced Configuration Access Mechanism (ECAM) – required for PCI express – 4kB per slot, memory mapped

**PCI bus hierarchy**  
![](../../documentation/images/Kernel-PCI-Bus-Hierarchy.png)  

There may be 256 PCI bus. 32 devices can be connected on each bus. a device can handle 8 functions.  

CONFIG ADDRESS:  
![](../../documentation/images/Kernel-PCI-Config-address.png)

**Linux PCI list**  

    > lspci

**PCI list by Qemu Monitor**
    
     > info pci


## References
- https://wiki.osdev.org/PCI   : MUST
- Linux code browser: https://elixir.bootlin.com/linux/latest/source
- PCI IDS :http://pciids.sourceforge.net/v2.2/pci.ids
- http://www.mnc.co.jp/english/INtime/faq07-2_kanren/PCIconfigurationregister.htm
- http://www6.uniovi.es/LDP/LDP/LGNET/156/jangir.html