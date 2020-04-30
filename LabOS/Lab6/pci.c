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
  {
    if (pcidev->base_addr[i].iobase)
      info2 ("BAR%d IO %x, ", i, pcidev->base_addr[i].iobase);
    if (pcidev->base_addr[i].membase)
      info2 ("BAR%d MEM32 %x, ", i, pcidev->base_addr[i].membase);     
  }

  info2 ("\n");
  
}


//-----------------------------------------------
//               Read/Write
//  a dword in configuration base, using IO port.
//  @offset : bits 1:0 must always be 00.
//-----------------------------------------------

u32 pci_conf_read32_long(int bus, int device, int func, int offset) 
{
  
  u32 addr = 0x80000000 | (bus<<16) | (device<<11) | (func<<8) | (offset & 0xfc);
  
  outl(addr, PCI_CONF_ADDR);
  u32 data= inl(PCI_CONF_DATA);
  
  return data;
}

u32 pci_conf_read32 (pci_device_t* pcidev, int offset)
{
  return pci_conf_read32_long (pcidev->bus, pcidev->device, pcidev->function, offset);
} 

u16 pci_conf_read16 (pci_device_t* pcidev, int offset)
{
  u32 data = pci_conf_read32 (pcidev, offset);
  return ( (data >> ((offset&0x02)*8)) & 0xFFFF );
} 

void pci_conf_write32(pci_device_t* pcidev, int offset, u32 data) 
{

  u32 addr = 0x80000000 | (pcidev->bus<<16) | (pcidev->device<<11) | (pcidev->function<<8) | (offset&0xFC);
  
  outl(addr, PCI_CONF_ADDR);
  outl(data, PCI_CONF_DATA);
}


void pci_conf_write16(pci_device_t* pcidev, int offset, u16 data) 
{

  u32 addr = 0x80000000 | (pcidev->bus<<16) | (pcidev->device<<11) | (pcidev->function<<8) | (offset&0xFC);
  
  u32 tmp = pci_conf_read32 (pcidev, offset);
  
  if (offset&0x02)                            // offset end with 2. so modify high 16 bits.
    tmp = (tmp & 0x0000FFFF) | (data<<16);
  
  else                                        // data is 16 low bits of the register.
    tmp = (tmp & 0xFFFF0000)|data;      
  
  outl(addr, PCI_CONF_ADDR);
  outl(tmp,  PCI_CONF_DATA);
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

	      u32 reg0 = pci_conf_read32_long(bus,device, func, PCI_CONF_REG_00);
        
        u16 vendor_id = (u16)reg0;
        if (vendor_id != 0xFFFF) 
        {
          pci_device_t *pcidev = &pci_devices[pci_dev_nr++];
          pcidev->bus       = bus;
          pcidev->device    = device;
          pcidev->function  = func;
          pcidev->vendor_id = vendor_id;
          pcidev->device_id = reg0>>16;
         
          u32 reg1 = pci_conf_read32(pcidev, PCI_CONF_REG_01);
          pcidev->command = (u16)(reg1);
          pcidev->status = (u16)(reg1>>16);

          u32 reg2 = pci_conf_read32(pcidev, PCI_CONF_REG_02);
          pcidev->revision_id = (u8)(reg2);
          pcidev->prog_if     = (u8)(reg2>>8);
          pcidev->subclass    = (u8)(reg2>>16);
          pcidev->class_code  = (u8)(reg2>>24);

          u32 reg3 = pci_conf_read32(pcidev, PCI_CONF_REG_03);
          pcidev->header_type = (reg3>>16) & 0x7F;
          
          for (int i=0; pcidev->header_type==PCI_TYPE_DEVICE && i<BAR_NR; i++) // read base address registers
          {
          
            u32 bar = pci_conf_read32(pcidev, PCI_CONF_REG_04+i*4);

            if (!bar) continue;

            if (bar & BAR_TYPE_IO) // bar is a io base
            {
              pcidev->base_addr[i].space_type = BAR_TYPE_IO;
              pcidev->base_addr[i].iobase    = bar & 0xFFFFFFFC; //Bits 31-2 
            }
          
            else //bar is memory base
            {
              pcidev->base_addr[i].space_type = bar & 0x7; //bits 0-2
              pcidev->base_addr[i].membase    = bar & 0xFFFFFFF0; //Bits 31-4
            }
          
          }          
          
          u32 regb = pci_conf_read32(pcidev, PCI_CONF_REG_0B);
          pcidev->subsys_vendor_id = (u16)regb;
          pcidev->subsys_id        = (u16)(regb>>16) ;

          u32 regf = pci_conf_read32(pcidev, PCI_CONF_REG_0F);
          pcidev->interrupt_line = (u8)regf;
          pcidev->interrupt_pin  = (regf>>8) & 0xFF;
          pcidev->min_grant      = (regf>>16) & 0xFF;
          pcidev->max_latency    = (regf>>24) & 0xFF;

#if DEBUG_PCI 
          pci_print_info(pcidev);
#endif

        }
      }
 	  }
  }
}

