/* 2020 @AR
 *
 *
 * Simple implementation of IP protocol. rfc791
 *
 * https://tools.ietf.org/html/rfc791#page-11
 */
#include <net/ip.h>
#include <net/net.h>
#include <net/if_ether.h>
#include <mm.h>
#include <libc.h>
#include <kernel.h>

u16 iphdr_checksum(iphdr_t *hdr);


/* RFC 791
 *  
 * @data_len: payload length. dont include IP Header length. 
 */
void ip_send (ipaddr_t dest_ip, ippacket_t *ippacket, u32 data_length, netif_t *netif)
{
  
  ippacket->ethframe.ethhdr.eth_type = htons(ETH_TYPE_IPv4);

  iphdr_t * iphdr = &ippacket->iphdr;
  
  // Set ARP Header
  iphdr->version      = IPv4_VERSION;
  iphdr->ihl          = 5;
  iphdr->tos          = IP_TOS_PRIORITY;
  u16 iptotal_len     = data_length+sizeof(iphdr_t);
  iphdr->total_length = htons(iptotal_len); // data + ip-header length
  iphdr->id           = 0;
  iphdr->frag_offset  = htons(0x4000);      // first fragment, dont fragment
  iphdr->ttl          = 64;     // 64 is recommanded by  RFC 1700
  //iphdr->proto:  set by layer above 
  iphdr->checksum     = 0;

  
  ip_addr_copy (netif->ip, iphdr->src_ip);
  ip_addr_copy (dest_ip, iphdr->dest_ip);
  
  iphdr->checksum = iphdr_checksum(iphdr);

  u32 ethframe_len = iptotal_len + sizeof(ethhdr_t);
  // Ethernet layer will populate src_mac 
  // and send the frame
  ether_send_packet ((ethframe_t *)ippacket, ethframe_len, netif);
}


u16 iphdr_checksum(iphdr_t *iphdr)
{
  u32 sum = 0;
  u8* ptr = (u8 *)iphdr;
  u16 count = sizeof(iphdr_t);

  while (count >= 2)
  {
    sum   += *(u16 *)ptr;
    ptr   += 2;
    count -= 2;
  }
  sum = (sum>>16) + (sum&0xffff);
  sum = sum + (sum>>16);
  return (u16)~sum; 
}






