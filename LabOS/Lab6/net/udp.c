/* 2020 @AR
 * simple implementation of UDP- User datagram Protocol
 *  RFC 768
 */
#include <net/udp.h>
#include <net/if_ether.h>
#include <net/ip.h>
#include <net/net.h>
#include <mm.h>
#include <libc.h>
#include <kernel.h>



void udp_send (ipaddr_t dest_ip, port_t dest_port, u8* payload, u32 payload_len, netif_t *netif)
{
  udppacket_t *udppacket = (udppacket_t *)kalloc(sizeof(udppacket_t) + payload_len);
  
  udphdr_t *udphdr = &udppacket->udphdr;

  udphdr->src_port  = 0; // Optional in UDP, dont care.
  udphdr->dest_port = htons(dest_port);
  u16 udp_len       = sizeof(udphdr_t)+payload_len;  // udp header + udp data
  udphdr->length    = htons(udp_len);
  udphdr->checksum  = 0; // optional in udp

  memcpy (payload, udppacket->data, payload_len); 

  // Fill IP header
  udppacket->ippacket.iphdr.proto = IP_PROTO_UDP;
  
  ip_send (dest_ip, (ippacket_t *)udppacket, udp_len, netif);

  kfree(udppacket);
}

extern netif_t ETH0;

void udp_send_test()
{
  u32 payload_len = 256;
  u8 *payload = (u8 *)kalloc(payload_len);

  memset (payload, 0xDF, payload_len);

  ipaddr_t dest_ip = {192,168,43, 12};
  port_t dest_port = 53;

  info ("Test UDP send");

  udp_send(dest_ip, dest_port,  payload, payload_len, &ETH0); 
} 





