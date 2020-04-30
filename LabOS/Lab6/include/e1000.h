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

  u32  irq;

  u8   mac[6];      //MAC address 

  pci_device_t *pcidev;
};

typedef struct net_device_struct net_device_t;

struct tx_desc
{
  u32 addr_low;   // buffer address
  u32 addr_high;
  
  u16 length;    // buffer length. 16KB by default 
  u8 cso;        //checksum offset. where to insert TCP checksum
  u8 cmd;
  u8 sta;
  u8 rsv;
  u8 css;
  u16 special;

} __attribute__ ((packed));

typedef struct tx_desc tx_desc_t;

struct tx_buf_struct 
{
  int a;
} __attribute__ ((packed));

#define TX_BUF_LEN      4192

typedef  u8 tx_buf_t[TX_BUF_LEN];   

struct tx_ring_struct 
{
  struct tx_ring_struct* head; 
  struct tx_ring_struct* tail; 
}; 




void e1000_start();
void e1000_test ();

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
#define E1000_IMS            0x000D0  /* Interrupt Mask Set - RW */
#define E1000_IMC            0x000D8  /* Interrupt Mask Clear - RW */
#define E1000_RCTL           0x00100  /* Receive Control Register */
#define E1000_TCTL           0x00400  /* Transmit Control Register */
#define E1000_TDBAL          0x03800  /* Transmit Descriptor Base Address Low */
#define E1000_TDBAH          0x03804  /* Transmit Descriptor Base Address high */
#define E1000_TDLEN          0x03808  /* Transmit Descriptor Length */
#define E1000_TDH            0x03810  /* Transmit Descriptor Head */
#define E1000_TDT            0x03818  /* Transmit Descriptor Tail */


// Control register bits
#define E1000_CTRL_ASDE       (1<<5)  // Auto-Speed Detection Enable
#define E1000_CTRL_RST        (1<<26) // Device reset
#define E1000_CTRL_PHY_RST    (1<<31) // PHY reset

/* EEPROM/FLASH Control Register BITS */
#define E1000_EE_REQ            0x40  //Request bit
#define E1000_EE_GNT            0x80  //Grant bit 

/* EEPROM Read Register BITS */
#define E1000_EE_START          0x01  //Start bit
#define E1000_EE_DONE           0x10  //Done bit 


/* Receive Control Register bits */
#define E1000_RCTL_BSIZE         (0x03<<16)   // Receive buffer size 
#define E1000_RCTL_BSIZE_2K          (0x00)   // with RCTL.BSEX=0b        
#define E1000_RCTL_BSIZE_1K      (0x01<<16)           
#define E1000_RCTL_BSIZE_512B    (0x10<<16)           
#define E1000_RCTL_BSIZE_256B    (0x11<<16)           
#define E1000_RCTL_BSEX             (1<<25)   // buffer size extension. if set , BSIZE_x is multiplied by 16 

/* Transmit Control Register bits */
#define E1000_TCTL_EN                 (1<<1)  // trasmit enable
#define E1000_TCTL_PSP                (1<<3)  // Pad Short Packets
#define E1000_TCTL_CT              (0xFF<<4)   // b11:4. Collision Threshold
#define E1000_TCTL_COLD          (0x3FF<<12)   // b21:12. Collision Distance
#define E1000_TCTL_RTLC              (1<<24)  // retrasmit on late-collision



#define E1000_MAC_REG        0x05400  /* MAC register - RW */

#define E1000_IOADDR         0x00000   // I/O-Mapped Internal Register. see manual Ch 13.2.2
#define E1000_IODATA         0x00004

















#endif











