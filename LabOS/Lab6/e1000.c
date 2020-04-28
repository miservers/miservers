/* 2020 @AR
*
*  This driver support : 
*      - Intel Ethernet 8254x GBe : https://pdos.csail.mit.edu/6.828/2019/readings/hardware/8254x_GBe_SDM.pdf
*  https://wiki.osdev.org/Intel_Ethernet_i217
*  E1000 registers can be found in Linux e1000_hw.h 
*    
*/
#include <e1000.h>
#include <types.h>
#include <io.h>
#include <pci.h>
#include <kernel.h>
#include <errno.h>

 
#define NET_MAX_DEV             16  // network maximum devices 


net_device_t net_devices[NET_MAX_DEV];   // all registered net devices are here

int  net_dev_nr = 0;                     // number of net devices

net_device_t *e1000_dev;                 // E1000 device if existe.  


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

  if (netdev->space_type == BAR_TYPE_IO)         
  {
    ioaddr = netdev->iobase + E1000_IOADDR;
    iodata = netdev->iobase + E1000_IODATA;
    outl(addr, ioaddr);
    return inl(iodata);
  }

  else if (netdev->space_type == BAR_TYPE_MEM32)   
  {
    ioaddr = netdev->membase + addr;
    return *((volatile u32*)ioaddr);
  }

  panic("space type %x not supported", netdev->space_type);
  return -EINVAL;

}

void e1000_write_cmd (net_device_t *netdev, u32 addr, u32 data)
{
  u32 ioaddr, iodata;
  
  if (netdev->space_type == BAR_TYPE_IO)
  {
    ioaddr = netdev->iobase + E1000_IOADDR;
    iodata = netdev->iobase + E1000_IODATA + data;
    outl(addr, ioaddr);
    outl(data, iodata);
  }
  
  else if (netdev->space_type == BAR_TYPE_MEM32)
  {
    ioaddr = netdev->membase + addr;
    *((volatile u32*)ioaddr) = data;
  }
  
  else
    panic("space type %x not supported", netdev->space_type);

}

//----------------------------------------------
// print NIC infos on the screen
// common to all NICs 
//----------------------------------------------
void net_print_info (net_device_t *netdev)
{
  
  pci_device_t *pcidev =  netdev->pci_dev;
  
  info2 ("Network Controller %s %s\n", netdev->vendor_name, netdev->dev_name);
  info2 ("\tBus %x, Device %x, Function %x: \n"
         "\tinterrupt %x \n", 
                 pcidev->bus, pcidev->device, pcidev->function,  
                 pcidev->interrupt_line);
  
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
      net_device_t *netdev = &net_devices[net_dev_nr++];
      netdev->vendor_name = "INTEL";
      netdev->dev_name    = "E1000";
      netdev->pci_dev     = pcidev;
      netdev->space_type   = pcidev->bar[0].space_type;
  
      for (int k=0; k<BAR_NR; k++)
      {
        if (!pcidev->bar[k].bar) continue;
  
        if (pcidev->bar[k].space_type == BAR_TYPE_IO)
          netdev->iobase = pcidev->bar[k].iobase;
  
        else 
          netdev->membase = pcidev->bar[k].membase;
      }
  
      e1000_dev = netdev;
      return netdev;
    }
  }
  return NULL;
}

//-------------------------------------------------
//
//  MAIN : E1000 START
//
//-------------------------------------------------

void e1000_start() 
{
  net_device_t *netdev;


  netdev = e1000_probe();
 
  if (!netdev) 
    goto no_e1000;
  net_print_info(netdev);

  e1000_read_mac(netdev);

  print_mac (netdev);

  // reset phy
  // set Auto-Speed Detection Enable (CTRL.ASDE)
  u32 ctrl = e1000_read_cmd (netdev, E1000_CTRL);
  ctrl |= E1000_CTRL_ASDE; 


  return ;

no_e1000:
   info ("No Intel E1000 exist");
     
}





















