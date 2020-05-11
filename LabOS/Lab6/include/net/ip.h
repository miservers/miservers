#ifndef IP_H
#define IP_H

#include <types.h>
#include <net/net.h>
#include <net/if_ether.h>

//
// RFC 791
//
typedef struct iphdr
{
   u8 ihl:4,         // IP header length(4bits) in 32bits incerements. min 5
      version:4;     // ip version(4 bits). 4 for ipv4               
   u8 tos;           // type of service
  u16 total_length;  // total length of IP packet
  u16 id;  
  u16 frag_offset;   // fragment offset(13 bits)      
   u8 ttl;            // time to live.
   u8 proto;          // protocol above IP
  u16 checksum;       // header checksum 
  ipaddr_t src_ip;
  ipaddr_t dest_ip;
  #if 0
  u32 options[2];
  #endif
} _packed_ iphdr_t; 


typedef struct ippacket 
{  
  ethframe_t ethframe;  // Ethernet frame
  iphdr_t    iphdr;     // IP header
  // data go here   
} _packed_  ippacket_t;


void ip_send (ipaddr_t dest_ip, ippacket_t *ippacket, u32 data_length, netif_t *netif);


#define IPv4_VERSION         4

// type of service
#define IP_TOS_ROUTINE    0x00
#define IP_TOS_PRIORITY   0x08
#define IP_TOS_IMMEDIATE  0x10

//
// Protocol number: RFC 790
//
#define IP_PROTO_ICMP       0x01
#define IP_PROTO_TCP        0x06
#define IP_PROTO_UDP        0x11
#define IP_PROTO_SATNET     0x40




















#endif