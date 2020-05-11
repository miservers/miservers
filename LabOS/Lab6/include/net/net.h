#ifndef NET_H
#define NET_H

#include <types.h>
#include <pci.h>
#include <libc.h>


#define MTU    1500    // Bytes. maximum transmission unit.
 
// Little <-> big Endian conversion
#define bswap16(a)     ( ((a&0xFF)<<8) | (a>>8))
#define bswap32(a)     ( ((a&0xFF)<<24) | (((a&0xFF00)<<8)&0xff0000) | ((a>>8)&0xff00) | ((a>>24)&0x00ff))



// host to network: litte to big endian
#define htons(a)     bswap16(a)
#define htonl(a)     bswap32(a)

#define ntohs(a)     bswap16(a)
#define ntohl(a)     bswap32(a)


#define MAC_LEN          6
#define IPv4_ADDR_LEN    4


typedef u8 mac_t[MAC_LEN];    

typedef u8 ipaddr_t[IPv4_ADDR_LEN]; 

typedef u16 port_t;

#define MAC_BROADCAST   {0xFF,0xFF,0xFF,0xFF,0xFF,0xFF}

#define ip_addr_copy(src, dest)  memcpy ((u8 *)src, (u8 *)dest,  IPv4_ADDR_LEN);
#define mac_copy(src, dest)      memcpy ((u8 *)(src), ((u8 *)dest),  MAC_LEN);
  

typedef struct net_device 
{
  struct list_head *list;
  char *dev_name;    //net device name
  char *vendor_name; //vendor name 
  u32  iobase;       //IO base retrieved from BAR0
  u32  membase;      //Memory base from BAR2
  u8   base_addr_type;

  u32    irq;
  mac_t  mac;       //MAC address 

  pci_device_t *pcidev;

} net_device_t;


typedef struct netif
{
  struct list_head *list;
  net_device_t *dev; 
  char*        name;
  ipaddr_t   ip;
  ipaddr_t   mask;
  ipaddr_t   broadcast;
  u8         state; //UP-DOWN
  u16        mtu; 
  u16        qlen;  //queue length
  mac_t      mac;
} netif_t; 


void netif_init ();


#define NETIF_UP     1
#define NETIF_DOWN   0






#endif