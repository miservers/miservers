#ifndef ARP_H
#define ARP_H

#include <types.h>
#include <net/if_ether.h>
#include <net/net.h>


typedef struct arphdr
{ 
  u16 hw_type ;       //hardware type
  u16 proto;          // protocol type
  u8  hw_addr_len;    // Hardware address length(6)
  u8  proto_addr_len; // protocol address length(4)
  u16 opcode;         //nature of ARP message
  mac_t      src_mac;
  ipaddr_t   src_ip;
  mac_t      dest_mac;
  ipaddr_t   dest_ip; 

} _packed_  arphdr_t;


typedef struct arpframe_struct 
{  
  ethhdr_t ethhdr;  // Ethernet header
  arphdr_t arphdr;  //ARP header
  u32 crc;          // checksum

}_packed_  arpframe_t;


void arp_request(ipaddr_t src_ip, ipaddr_t dest_ip, netif_t *netif);

void arp_request_test();

// Hardware types
#define ARP_HW_ETH    1
#define ARP_HW_IEEE   6
#define ARP_HW_FIBRE  18

// Protocole type
#define ARP_PROTO_IPv4 0x0800 


// OPcodes
#define ARP_OP_REQUEST  1
#define ARP_OP_REPLAY   2


#endif