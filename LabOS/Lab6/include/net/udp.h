#ifndef UDP_H
#define UDP_H

#include <types.h> 
#include <net/net.h> 
#include <net/ip.h> 

// RFC 768
typedef struct udphdr
{
  port_t src_port;   // optional
  port_t dest_port;
  u16 length;        // header+payload
  u16 checksum;

} _packed_ udphdr_t;

typedef struct udppacket
{
  ippacket_t ippacket; 
  udphdr_t   udphdr;
  //payload go here
  u8 data[];
}_packed_  udppacket_t;



void udp_send (ipaddr_t dest_ip, port_t dest_port, u8* payload, u32 payload_len, netif_t *netif);

void udp_send_test();















#endif