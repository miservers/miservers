#ifndef E1000_H
#define E1000_H

#include <pci.h>


struct net_device_struct 
{
  char *dev_name;    //net device name
  char *vendor_name; //vendor name 
  u32  iobase;      //IO base retrieved from BAR0
  u32  membase;     //Memory base from BAR2
  u8   space_type;

  u8   mac[6];      //MAC address 

  pci_device_t *pci_dev;
};

typedef struct net_device_struct net_device_t;


void e1000_start();


#define INTEL_VENDOR_ID     0x8086  // Vendor ID for Intel 
#define E1000_DEV_ID        0x100E  // Device ID for the e1000 Qemu, Bochs, and VirtualBox emmulated NICs
#define I217_DEV_ID         0x153A  // Device ID for Intel I217
#define I82577LM_DEV_ID     0x10EA  // Device ID for Intel 82577LM

/* Register Set. (82543, 82544) 
 *
 * Linux "e1000_hw.h"
*/

#define E1000_CTRL           0x00000  /* Device Control - RW */
#define E1000_STATUS         0x00008  /* Device Status - RO */
#define E1000_EEC            0x00010  /* EEPROM/Flash Control - RW */
#define E1000_EERD           0x00014  /* EEPROM Read register - RW */

//EEPROM/FLASH Control Register BITS
#define E1000_EE_REQ            0x40  //Request bit
#define E1000_EE_GNT            0x80  //Grant bit 

//EEPROM Read Register BITS
#define E1000_EE_START          0x01  //Start bit
#define E1000_EE_DONE           0x10  //Done bit 

#define E1000_MAC_REG        0x05400  /* MAC register - RW */

#define E1000_IOADDR         0x00000   // I/O-Mapped Internal Register. see manual Ch 13.2.2
#define E1000_IODATA         0x00004


#endif