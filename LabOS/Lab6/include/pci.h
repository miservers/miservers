#ifndef PCI_H
#define PCI_H

#include <types.h>

#define PCI_MAX_DEV          64    // max number of PCI devices 

#define BAR_NR                5    // number of base address registers


#define BAR_TYPE_IO       0x01    // Base Address Register(BAR)type IO

#define BAR_TYPE_MEM32    0x00    // Base Address Register(BAR)type Memory 32
#define BAR_TYPE_MEMLow   0x02    // below 1MB
#define BAR_TYPE_MEM64    0x04    // 64 bits addr

//Base Address Register
struct bar_struct
{
  u32  bar;
  u8   space_type;
  u32  iobase;      //IO base retrieved from BAR
  u32  membase;     //Memory base from BAR
};

typedef struct bar_struct bar_t; 


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
  bar_t bar[BAR_NR];         // base address registers
  u16 subsys_vendor_id;
  u16 subsys_id;
  u8 interrupt_line;
  u8 interrupt_pin;
  u8 min_grant;
  u8 max_latency;
  
}__attribute__ ((packed));

typedef struct pci_device pci_device_t;

//-----------------------------------
// devices connected on the PCI bus
//-----------------------------------
extern pci_device_t pci_devices[PCI_MAX_DEV];   

extern int  pci_dev_nr;   // number of pci devices

void pci_probe_devices(); 

#endif