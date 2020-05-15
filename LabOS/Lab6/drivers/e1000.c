/* 2020 @AR
*
*  This straight-forward driver for Intel Ethernet controllers 8254x: 
*      - https://pdos.csail.mit.edu/6.828/2019/readings/hardware/8254x_GBe_SDM.pdf
*      - concerned cards : 82540EP/EM, 82541xx, 82544GC/EI, 82545GM/EM, 82546GB/EB, and 82547xx
*  8254x are PCI(not PCIe) devices.
*  https://wiki.osdev.org/Intel_Ethernet_i217
*  E1000 registers can be found in Linux e1000_hw.h 
*    
*/
#include <net/e1000.h>
#include <types.h>
#include <io.h>
#include <pci.h>
#include <kernel.h>
#include <errno.h>
#include <libc.h>
#include <net/if_ether.h>
#include <net/net.h>
#include <mm.h>

 
net_device_t *e1000_dev;                 // E1000 device if existe.  


#define RXRING_ZISE      128             // RX ring size
#define TXRING_ZISE      128             // TX ring size

// Receive Ring
rxdesc_t rxring[RXRING_ZISE] __attribute__ ((aligned (16)));   

// Transmit Ring
txdesc_t txring[TXRING_ZISE] __attribute__ ((aligned (16)));   


void delay(int t) {while(t--);} // bad way to make a delay

//---------------------------------------------------------------------
// 
// To read and write E1000 registers :
//  - use IO ports if BAR type is IO
//  - else use IO Mapped Memory
//
//---------------------------------------------------------------------
u32 e1000_read_cmd (net_device_t *netdev, u32 addr)
{
  u32 ioaddr, iodata;

  if (netdev->base_addr_type == BAR_TYPE_IO)         
  {
    ioaddr = netdev->iobase + E1000_IOADDR;
    iodata = netdev->iobase + E1000_IODATA;
    outl(addr, ioaddr);
    return inl(iodata);
  }

  else if (netdev->base_addr_type == BAR_TYPE_MEM32)   
  {
    ioaddr = netdev->membase + addr;
    return *((volatile u32*)ioaddr);
  }

  panic("E1000 Read : Base address Type %#x not supported", netdev->base_addr_type);
  return -EINVAL;

}

void e1000_write_cmd (net_device_t *netdev, u32 addr, u32 data)
{
  u32 ioaddr, iodata;
  
  if (netdev->base_addr_type == BAR_TYPE_IO)
  {
    ioaddr = netdev->iobase + E1000_IOADDR;
    iodata = netdev->iobase + E1000_IODATA + data;
    outl(addr, ioaddr);
    outl(data, iodata);

  }
  
  else if (netdev->base_addr_type == BAR_TYPE_MEM32)
  {
    ioaddr = netdev->membase + addr;
    *((volatile u32*)ioaddr) = data;
  }
  
  else
    panic("E1000 Write : Base address Type %#x not supported", netdev->base_addr_type);
  
}

//----------------------------------------------
// print NIC infos on the screen
// common to all NICs 
//----------------------------------------------
void net_print_info (net_device_t *netdev)
{
  
  pci_device_t *pcidev =  netdev->pcidev;
  
  info2 ("Network Controller %s %s\n", netdev->vendor_name, netdev->dev_name);
  info2 ("\tBus %x, Device %x, Function %x: \n"
         "\tIRQ %x \n", 
                 pcidev->bus, pcidev->device, pcidev->function,  
                 netdev->irq);
  
  info2 ("\tIO base at %x\n", netdev->iobase);
  info2 ("\t32 bits Memory base addr at %x\n", netdev->membase);
  info2 ("\n");
  
}

//-----------------------------------------------------------
// EEPROM/Flash utilities:
//   - To check if EEPROM use EEPROM control Register(EEC)
//   - To read EEPROM memory use Read Register(EERD)
//----------------------------------------------------------
int e1000_eeprom_exist(net_device_t *netdev)
{
  
  u32 ee_ctrl;
  
  // 1. Set request bit in ctrl register
  ee_ctrl = e1000_read_cmd(netdev, E1000_EEC);
  ee_ctrl |= E1000_EE_REQ;                 
  e1000_write_cmd(netdev, E1000_EEC, ee_ctrl);

  // 2. Pool Grant bit until its ready
  int ee_exist =  FALSE; 
  int i = 0;
  while (!ee_exist && i++<1000) //poll until Grant bit set
  {
    ee_ctrl = e1000_read_cmd(netdev, E1000_EEC);
  
    if (ee_ctrl & E1000_EE_GNT)
      ee_exist = TRUE;
  
  }
  
  // 3. clear request bit
  ee_ctrl &= ~E1000_EE_REQ;                 
  e1000_write_cmd(netdev, E1000_EEC, ee_ctrl);

  return ee_exist;
}

u32 e1000_eerd_read(net_device_t *dev, u8 addr)
{
  u32 eerd; 

  eerd = e1000_read_cmd(dev, E1000_EERD);
  
  eerd = (addr<<8) | E1000_EE_START;  // addr=15-8 bits and set start bit
  
  e1000_write_cmd(dev, E1000_EERD, eerd);

  // pool READ DONE field
  int i = 0;
  while (i++<1000)      //poll until DONE bit set
  { 
    eerd = e1000_read_cmd(dev, E1000_EERD);
  
    if (eerd & E1000_EE_DONE)
      return eerd;
  }
  
  return 0;
}


//-----------------------------------------------------------
// MAC utilities
//  - If EEPROM exist, read MAC from it.
//  - else read it from the mapped memory(membase+0x05400).
//------------------------------------------------------------
void e1000_read_mac (net_device_t *netdev)
{
  
  if (e1000_eeprom_exist(netdev))  
  {
    u32 eerd;
    
    eerd = e1000_eerd_read (netdev, 0x00);
    
    netdev->mac[0] = (eerd>>16) & 0xFF;
    netdev->mac[1] = (eerd>>24) & 0xFF;

    eerd = e1000_eerd_read (netdev, 0x01);
    
    netdev->mac[2] = (eerd>>16) & 0xFF;
    netdev->mac[3] = (eerd>>24) & 0xFF;
    
    eerd = e1000_eerd_read (netdev, 0x02);
    
    netdev->mac[4] = (eerd>>16) & 0xFF;
    netdev->mac[5] = (eerd>>24) & 0xFF;
    
    info ("MAC read from EEPROM");

  }
  
  else 
  {

    u32 tmp = e1000_read_cmd(netdev, E1000_MAC_REG);
    
    netdev->mac[0] = tmp & 0xFF;
    netdev->mac[1] = (tmp>>8) & 0xFF;
    netdev->mac[2] = (tmp>>16) & 0xFF;
    netdev->mac[3] = (tmp>>24) & 0xFF;
    
    tmp = e1000_read_cmd(netdev, E1000_MAC_REG+4);
    
    netdev->mac[4] = (tmp) & 0xFF;
    netdev->mac[5] = (tmp>>8) & 0xFF;
    
    info ("MAC read from IOMM");
  }
  
}

void print_mac(net_device_t *netdev)
{

  printk ("MAC %x:%x:%x:%x:%x:%x\n", netdev->mac[0], netdev->mac[1],netdev->mac[2],
                                     netdev->mac[3], netdev->mac[4], netdev->mac[5]); 

}


//-----------------------------------------------------------
//              Interrupts-IRQ handler
// 
//-----------------------------------------------------------
void e1000_handler()
{
  info ("E1000 handler invoked");
}


//-------------------------------------------------------------------
//
// To detect E1000 nic on the PCI: we browse PCI devices list looking
// for (vendorID,deviceID)=(8086,100E) 
//
//------------------------------------------------------------------
net_device_t* e1000_probe()
{

  for (int i=0; i<pci_dev_nr; i++)
  {
    pci_device_t *pcidev = &pci_devices[i];
  
    if (pcidev->vendor_id == INTEL_VENDOR_ID && pcidev->device_id == E1000_DEV_ID)
    {
      info ("E1000 present");
      net_device_t *netdev =  (net_device_t *)kalloc(sizeof(net_device_t));
      netdev->vendor_name  = "INTEL";
      netdev->dev_name     = "E1000";
      netdev->pcidev       = pcidev;
      netdev->base_addr_type   = pcidev->base_addr[0].type;
  
      for (int k=0; k<BAR_NR; k++)
      {
        if (pcidev->base_addr[k].iobase)
          netdev->iobase = pcidev->base_addr[k].iobase;
  
        else if (pcidev->base_addr[k].membase)
          netdev->membase = pcidev->base_addr[k].membase;
      }

      netdev->irq = pcidev->interrupt_line;
  
      e1000_dev = netdev;
      return netdev;
    }
  }
  return NULL;
}

//-------------------------------------------------
//
//              Initializations
//  See Ch. 14.5 Transmit Initialization
//      Ch. 14.4 Receive Initialization
//-------------------------------------------------
void e1000_rx_init(net_device_t *netdev)
{
  
  // set RAL0 RAH0 with the desired MAC addresses.
  // can be do later by if_config. dont care

  // Initialize the MTA (Multicast Table Array) to 0b
  for (int i = 0; i < E1000_FILTER_MTA_LEN; i++)
      e1000_write_cmd (netdev, E1000_FILTER_MTA+i, 0);


  // Program the Interrupt Mask Set/Read (IMS) register to enable any 
  // interrupt the software driver wants to be notified of when the event occurs. 
  e1000_write_cmd (netdev, E1000_IMC, 0xFF);  
  e1000_write_cmd (netdev, E1000_IMS, 0xFF);  
  u32 ims = E1000_IMS_RXT0 | E1000_IMS_RXO | E1000_IMS_RXDMT0 | E1000_IMS_LSC;
  e1000_write_cmd (netdev, E1000_IMS, ims);  



  // Receive Descriptor Base Address (RDBAL/RDBAH) registers
  e1000_write_cmd (netdev, E1000_RDBAL, (u32)rxring);
  e1000_write_cmd (netdev, E1000_RDBAH, 0);

  // Receive Descriptor Length (RDLEN) register = size (in bytes) of tx ring
  u32 rxlen = (RXRING_ZISE) * sizeof (rxdesc_t);
  e1000_write_cmd (netdev, E1000_RDLEN, rxlen);

  // Transmit Descriptor Head and Tail (RDH/RDT)
  e1000_write_cmd (netdev, E1000_RDH, 0);
  e1000_write_cmd (netdev, E1000_RDT, RXRING_ZISE-1);

  // Init of Rransmit Control Register (RCTL)
  u32 rctl = e1000_read_cmd (netdev, E1000_RCTL); 
 
  rctl |= E1000_RCTL_EN | E1000_RCTL_BAM;
  rctl &= ~E1000_RCTL_LBM;  // LBM=00b for normal operations
  
  // receive buffer size: 1KB
  rctl = (rctl & ~E1000_RCTL_BSIZE) | (E1000_RCTL_BSIZE_1K); //Block size 1K
  rctl &= ~E1000_RCTL_BSEX;  // clear bsex bit

  e1000_write_cmd (netdev, E1000_RCTL,rctl);

}

void e1000_tx_init (net_device_t *netdev)
{

  // Init TX descriptors
  memset((u8 *)&txring[0], 0 , TXRING_ZISE*16);

  for (int i = 0; i < TXRING_ZISE; i++)
  {
    txdesc_t* txdesc = &txring[i];

    txdesc->addr_low  = 0;
    txdesc->addr_high = 0;
    txdesc->length    = 0;

  }

  // Transmit Descriptor Base Address (TDBAL/TDBAH) registers
  u32 tdbal = (u32) txring;
  e1000_write_cmd (netdev, E1000_TDBAL, tdbal);
  e1000_write_cmd (netdev, E1000_TDBAH, 0);

  // Transmit Descriptor Length (TDLEN) register = size (in bytes) of tx ring
  u32 txlen = (TXRING_ZISE) * sizeof (txdesc_t);
  e1000_write_cmd (netdev, E1000_TDLEN, txlen);

  // Transmit Descriptor Head and Tail (TDH/TDT)
  e1000_write_cmd (netdev, E1000_TDH, 0);
  e1000_write_cmd (netdev, E1000_TDT, 0);

  // Init of Transmit Control Register (TCTL)
  u32 tctl = e1000_read_cmd (netdev, E1000_TCTL); 
  tctl |= E1000_TCTL_EN | E1000_TCTL_PSP | E1000_TCTL_RTLC;         
  tctl = (tctl & ~E1000_TCTL_CT) | (0x10 << 4);  // Collision Threshold set a 10h
  tctl = (tctl & ~E1000_TCTL_COLD) | (0x40 << 12);  //full duplex 40h
  e1000_write_cmd (netdev, E1000_TCTL,tctl);

}

//-------------------------------------------------
//
//            Send/Receive a packet
//
//-------------------------------------------------
void e1000_send_packet (u8* payload, u32 payload_len)
{

  u8* tx_buf = kmalloc (TX_BUF_LEN, GFP_KERNEL);

  u32 tail = e1000_read_cmd (e1000_dev, E1000_TDT);

  memcpy (payload, tx_buf, payload_len);

  txring[tail].addr_low  = (u32) tx_buf;
  txring[tail].length    = payload_len;
  txring[tail].cmd       = E1000_TDESC_CMD_EOP | E1000_TDESC_CMD_RS | E1000_CMD_IFCS;
  txring[tail].status    = 0;

  tail = (tail + 1) % TXRING_ZISE;
  
  e1000_write_cmd (e1000_dev,  E1000_TDT, tail);  
  delay(1000);

  //debug
  tail = e1000_read_cmd (e1000_dev, E1000_TDT);
  u32 head = e1000_read_cmd (e1000_dev, E1000_TDH);
  info ("head:tail after : %d:%d", head,tail);  
  info ("Status after : %x", txring[0].status);
    
}


//-------------------------------------------------
//
//  MAIN : E1000 Initialization
//
//-------------------------------------------------

void e1000_init () 
{
  net_device_t *netdev;
  u32 ctrl;


  netdev = e1000_probe();
 
  if (!netdev) 
    goto no_e1000;

  e1000_dev = netdev;

  net_print_info(netdev);

  e1000_read_mac(netdev);

  print_mac (netdev);

  /* PHY reset */
  ctrl  = e1000_read_cmd (netdev, E1000_CTRL); 
  e1000_write_cmd(netdev, E1000_CTRL, ctrl | E1000_CTRL_PHY_RST);
  delay(10);

  /* MAC reset */
  e1000_write_cmd(netdev, E1000_CTRL, ctrl | E1000_CTRL_RST);
  delay(10);
  
  /* Enable Interrupts */
  e1000_write_cmd(netdev, E1000_IMS, 0xFF);
  e1000_write_cmd(netdev, E1000_IMC, 0xFF);
  
  /* Mastering device */
  u16 command = pci_conf_read16 (netdev->pcidev, PCI_COMMAND);
  command |= PCI_COMMAND_MASTER | PCI_COMMAND_INTX;
  pci_conf_write16(netdev->pcidev, PCI_COMMAND, command); 

 
  e1000_tx_init (netdev);    // Initialize Transmission Desc and Ring

  e1000_rx_init (netdev);

out:
  return;
no_e1000:
  warn ("No Intel E1000 exist");
  goto out;
}
















