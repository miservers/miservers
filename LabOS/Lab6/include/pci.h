#ifndef PCI_H
#define PCI_H

#include <types.h>

#define PCI_MAX_DEV          64    // max number of PCI devices 

#define BAR_NR                5    // number of base address registers


#define BAR_TYPE_MEM32    0x00    // Base Address Register(BAR)type Memory 32
#define BAR_TYPE_IO       0x01    // Base Address Register(BAR)type IO
#define BAR_TYPE_MEMLow   0x02    // below 1MB
#define BAR_TYPE_MEM64    0x04    // 64 bits addr

/* Base Address Register */
struct pci_base_address_s
{
  u32  iobase;      // IO base address 
  u32  membase;     // Memory base address
  u8   type;  // base address : IO or Mem
};

typedef struct pci_base_address_s base_address_t; 


typedef struct pci_device
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
  base_address_t base_addr[BAR_NR];         // base address registers
  u16 subsys_vendor_id;
  u16 subsys_id;
  u8 interrupt_line;     
  u8 interrupt_pin;
  u8 min_grant;
  u8 max_latency;
  
}_packed_ pci_device_t;

//-----------------------------------
// devices connected on the PCI bus
//-----------------------------------
extern pci_device_t pci_devices[PCI_MAX_DEV];   

extern int  pci_dev_nr;   // number of pci devices

void pci_probe_devices(); 

u32 pci_conf_read32 (pci_device_t* pcidev, int offset);

u16 pci_conf_read16 (pci_device_t* pcidev, int offset);

void pci_conf_write32(pci_device_t* pcidev, int offset, u32 data);

void pci_conf_write16(pci_device_t* pcidev, int offset, u16 data);

/* PCI Configuration space registers */
#define PCI_CONF_REG_00       0x00
#define PCI_COMMAND           0x04 
#define PCI_CONF_REG_01       0x04
#define PCI_CONF_REG_02       0x08
#define PCI_CONF_REG_03       0x0C
#define PCI_CONF_REG_04       0x10
#define PCI_CONF_REG_05       0x14
#define PCI_CONF_REG_06       0x18
#define PCI_CONF_REG_07       0x1C
#define PCI_CONF_REG_08       0x20
#define PCI_CONF_REG_09       0x24
#define PCI_CONF_REG_0A       0x28
#define PCI_CONF_REG_0B       0x2C
#define PCI_CONF_REG_0C       0x30
#define PCI_CONF_REG_0D       0x34
#define PCI_CONF_REG_0E       0x38
#define PCI_CONF_REG_0F       0x3C

/* Command register */
#define  PCI_COMMAND_IO        0x1 /* Enable response in I/O space */
#define  PCI_COMMAND_MEMORY    0x2 /* Enable response in Memory space */
#define  PCI_COMMAND_MASTER    0x4 /* Enable bus mastering */
#define  PCI_COMMAND_INTX    0x400 /* INTx Emulation Disable */


#endif