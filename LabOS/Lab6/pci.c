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
#include <pci.h>

#define DEBUG_PCI   0

#define PCI_CONF_ADDR    0x0CF8    //PCI config address register
#define PCI_CONF_DATA    0x0CFC    //PCI config DATA register


#define PCI_TYPE_DEVICE         0x00     // Header Type defining a general PCI device
#define PCI_TYPE_PCI_BRIDGE     0x01     //PCI to PCI Bridge
#define PCI_TYPE_CARDBUS_BRIDGE 0x02

pci_device_t pci_devices[PCI_MAX_DEV];   // devices connected on the PCI bus

int  pci_dev_nr = 0;                     // number of pci devices
  

char * header_type_name(pci_device_t *pcidev) 
{
  switch (pcidev->header_type)
  {
    case PCI_TYPE_DEVICE:          return "PCI Device";
    case PCI_TYPE_PCI_BRIDGE:      return "PCI-To-PCI Bridge";
    case PCI_TYPE_CARDBUS_BRIDGE:  return "CardBus Bridge";
    default:                       return "Unknown Header Type";
     
  }
 
}

/* match class codes and their names
 *
 */
char* class_codes_names(pci_device_t *pcidev) 
{

  switch (pcidev->class_code) 
  {
    case 0x00 : return "Unclassified";
  
    case 0x01 : switch (pcidev->subclass)
                {
                  case 0x00 : return "SCSI Bus Controller"; 
                  case 0x01 : return "IDE Controller";
                  case 0x02 : return "Floppy Disk Controller"; 
                  case 0x05 : return "ATA Controller";
                  default   : return "Mass Storage Controller"; 
                };
  
    case 0x02 :  switch (pcidev->subclass)
                {
                  case 0x00 : return "Ethernet Controller"; 
                  default   : return "Network Controller"; 
                };
  
    case 0x03 :  switch (pcidev->subclass)
                {
                  case 0x00 : return "VGA Controller"; 
                  default   : return "Display Controller"; 
                };
  
    case 0x06 :  switch (pcidev->subclass)
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


void pci_print_info (pci_device_t *pcidev) 
{
  
  info2("Bus %x, Device %x, Function %x: \n"
       "\t%s: %s  %x:%x\n"
       "\tinterrupt %x \n", 
                 pcidev->bus, pcidev->device, pcidev->function, 
                 class_codes_names(pcidev), header_type_name(pcidev), pcidev->vendor_id,  pcidev->device_id, 
                 pcidev->interrupt_line);
  
  info2 ("\t");
  for (int i=0; i<BAR_NR; i++)
    if (pcidev->bar[i].bar)
      info2 ("BAR%d %x, ", i, pcidev->bar[i]);
  info2 ("\n");
  
}


//-----------------------------------------------
//
// read a DWord in configuration base, using IO port.
//
//-----------------------------------------------
u32 pci_conf_readl(int bus, int device, int func, int offset) 
{

  u32 addr = 0x80000000 | (bus<<16) | (device<<11) | (func<<8) | (offset & 0xfc);
  
  outl(addr, PCI_CONF_ADDR);
  u32 data= inl(PCI_CONF_DATA);
  
  return data;

}

/*--------------------------------------------------------------------
 * This function use the brut force to search 
 * all available PCI devices. there are 255 possible bus, each bus
 * can connect 32 devices. each device can handle till 8 functions.
 *
 * https://wiki.osdev.org/PCI
 *---------------------------------------------------------------------*/
void pci_probe_devices() 
{
  for (u8 bus = 0; bus < 255; bus++) 
  {

	  for (u8 device = 0; device < 32; device++) 
    {

	    for (u8 func = 0; func < 8; func++) 
      {

	      u32 reg0 = pci_conf_readl(bus,device, func, 0x00);
        
        u16 vendor_id = (u16)reg0;

        if (vendor_id != 0xFFFF) 
        {
          pci_device_t *pcidev = &pci_devices[pci_dev_nr++];
          pcidev->bus       = bus;
          pcidev->device    = device;
          pcidev->function  = func;
          pcidev->vendor_id = vendor_id;
          pcidev->device_id = reg0>>16;
          
          u32 reg2 = pci_conf_readl(bus,device, func, 0x08);
          pcidev->revision_id = (u8)(reg2);
          pcidev->prog_if     = (u8)(reg2>>8);
          pcidev->subclass    = (u8)(reg2>>16);
          pcidev->class_code  = (u8)(reg2>>24);

          u32 reg3 = pci_conf_readl(bus,device, func, 0x0C);
          pcidev->header_type = (reg3>>16) & 0x7F;
          
          for (int i=0; pcidev->header_type==PCI_TYPE_DEVICE && i<BAR_NR; i++)
          {
          
            pcidev->bar[i].bar = pci_conf_readl(bus,device, func, 0x10+i*4);

            if (pcidev->bar[i].bar & BAR_TYPE_IO) // bar is a io base
            {
              pcidev->bar[i].space_type = BAR_TYPE_IO;
              pcidev->bar[i].iobase    = pcidev->bar[i].bar & 0xFFFFFFFC; //Bits 31-2 
            }
          
            else //bar is memory base
            {
              pcidev->bar[i].space_type = pcidev->bar[i].bar & 0x7; //bits 0-2
              pcidev->bar[i].membase    = pcidev->bar[i].bar & 0xFFFFFFF0; //Bits 31-4
            }
          
          }
          
          
          u32 regb = pci_conf_readl(bus,device, func, 0x2C);
          pcidev->subsys_vendor_id = (u16)regb;
          pcidev->subsys_id        = (u16)(regb>>16) ;

          u32 reg3c = pci_conf_readl(bus,device, func, 0x3C);
          pcidev->interrupt_line = (u8)reg3c;
          pcidev->interrupt_pin  = (reg3c>>8) & 0xFF;
          pcidev->min_grant      = (reg3c>>16) & 0xFF;
          pcidev->max_latency    = (reg3c>>24) & 0xFF;

#if DEBUG_PCI 
          pci_print_info(dev);
#endif

        }
      }
 	  }
  }
}
