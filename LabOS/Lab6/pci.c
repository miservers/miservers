/* 2020 @AR
*
* This simple PCI driver aims:
*    Detecte all available PCI devices 
*    
* Reference : https://wiki.osdev.org/PCI
*/

#include <io.h>
#include <types.h>
#include <kernel.h>


#define PCI_CONF_ADDR    0x0CF8    //PCI config address register
#define PCI_CONF_DATA    0x0CFC    //PCI config DATA register

#define MAX_PCI_DEV          64    // max number of PCI devices 

#define PCI_TYPE_DEVICE         0x00     // Header Type defining a general PCI device
#define PCI_TYPE_PCI_BRIDGE     0x01     //PCI to PCI Bridge
#define PCI_TYPE_CARDBUS_BRIDGE 0x02

struct pci_device
{
  u8 bus;
  u8 device;
  u8 function;
	u16 vendor_id;
	u16 device_id;
	u16 command;
	u16 status;
  u8 revision_id;
  u8 prog_if;
  u16 subclass;
  u16 class_code;
  u8 cache_line_size,latency_timer;
  u8 header_type;
  u8 birst;
  u32 bar0;
  u32 bar4;
  u16 subsys_vendor_id;
  u16 subsys_id;
  u8 interrupt_line;
  u8 interrupt_pin;
  u8 min_grant;
  u8 max_latency;
  
}__attribute__ ((packed));

typedef struct pci_device pci_device_t;

pci_device_t pci_devices[MAX_PCI_DEV];   // PCI devices
int  pci_dev_nr = 0;                     // number of pci devices
  
void pause()
{          
	int t = 10;
	while(t--)halt();
}


char * header_type_name(pci_device_t *dev) 
{
  if (dev->header_type == PCI_TYPE_DEVICE)
    return "PCI Device";
 if (dev->header_type == PCI_TYPE_PCI_BRIDGE)
    return "PCI-To-PCI Bridge";
 if (dev->header_type == PCI_TYPE_CARDBUS_BRIDGE)
    return "CardBus Bridge";
 return "Unknown Header Type";
}

/* match class codes and their names
 *
 */
char* class_codes_names(pci_device_t *dev) 
{
  switch (dev->class_code) 
  {
    case 0x00 : return "Unclassified";
    case 0x01 : switch (dev->subclass)
                {
                  case 0x00 : return "SCSI Bus Controller"; 
                  case 0x01 : return "IDE Controller";
                  case 0x02 : return "Floppy Disk Controller"; 
                  case 0x05 : return "ATA Controller";
                  default   : return "Mass Storage Controller"; 
                };
    case 0x02 :  switch (dev->subclass)
                {
                  case 0x00 : return "Ethernet Controller"; 
                  default   : return "Network Controller"; 
                };
    case 0x03 :  switch (dev->subclass)
                {
                  case 0x00 : return "VGA Controller"; 
                  default   : return "Display Controller"; 
                };
    case 0x06 :  switch (dev->subclass)
                {
                  case 0x00 : return "Host Bridge"; 
                  case 0x01 : return "ISA Bridge"; 
                  case 0x04 : 
                  case 0x09 : return "PCI-to-PCI Bridge "; 
                  default   : return "Bridge"; 
                };
    default   : return "Other"; 

  }
}


void dump_device (pci_device_t *dev) 
{
  info("Bus %x, Device %x, Function %x: \n"
       "\t\t %s: %s  %x:%x\n"
       "\t\t BAR0 %x, BAR4 %x, interrupt %x", 
                 dev->bus, dev->device, dev->function, 
                 class_codes_names(dev), header_type_name(dev), dev->vendor_id,  dev->device_id, 
                 dev->bar0, dev->bar4,dev->interrupt_line);
}


/*
 * read a DWord in configuration, using IO port.
 * 
 */ 
u32 pci_conf_readl(int bus, int device, int func, int offset) 
{
  u32 addr = 0x80000000 | (bus<<16) | (device<<11) | (func<<8) | (offset & 0xfc);
  outl(addr, PCI_CONF_ADDR);
  u32 data= inl(PCI_CONF_DATA);
  return data;
}

/* This function use the brut force to search 
 * all available PCI devices. there are 255 possible bus, each bus
 * can connect 32 devices. each device can handle till 8 functions.
 *
 * https://wiki.osdev.org/PCI
 */
void pci_probe_devices() 
{
  info("Start probing pci device!");
	u8  bus, device, func;
  for (bus = 0; bus < 255; bus++) 
  {
	  for (device = 0; device < 32; device++) 
    {
	    for (func = 0; func < 8; func++) 
      {
	      u32 reg0 = pci_conf_readl(bus,device, func, 0x00);
        u16 vendor_id = (u16)reg0;
        if (vendor_id != 0xFFFF) 
        {
          pci_device_t *dev = &pci_devices[pci_dev_nr++];
          dev->bus       = bus;
          dev->device    = device;
          dev->function  = func;
          dev->vendor_id = vendor_id;
          dev->device_id = reg0>>16;
          
          u32 reg2 = pci_conf_readl(bus,device, func, 0x08);
          dev->revision_id = (u8)(reg2);
          dev->prog_if     = (u8)(reg2>>8);
          dev->subclass    = (u8)(reg2>>16);
          dev->class_code  = (u8)(reg2>>24);

          u32 reg3 = pci_conf_readl(bus,device, func, 0x0C);
          dev->header_type = (reg3>>16) & 0x7F;
          
          dev->bar0 = pci_conf_readl(bus,device, func, 0x10);
          dev->bar4 = pci_conf_readl(bus,device, func, 0x20);

          
          u32 regb = pci_conf_readl(bus,device, func, 0x2C);
          dev->subsys_vendor_id = (u16)regb;
          dev->subsys_id        = (u16)(regb>>16) ;

          u32 reg3c = pci_conf_readl(bus,device, func, 0x3C);
          dev->interrupt_line = (u8)reg3c;
          dev->interrupt_pin  = (reg3c>>8) & 0xFF;
          dev->min_grant      = (reg3c>>16) & 0xFF;
          dev->max_latency    = (reg3c>>24) & 0xFF;

          dump_device(dev);
        }
      }
 	  }
  }
  info("End probing pci device!");
}

