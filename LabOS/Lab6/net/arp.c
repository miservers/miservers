/* 2020 @AR
 *
 * Address Resolution Protocol-ARP
 *
 */
#include <net/arp.h>
#include <net/net.h>
#include <types.h>
#include <libc.h>
#include <mm.h>

void arp_request(ipv4_addr_t *src_ip, ipv4_addr_t *dest_ip)
{
  // Init arp header
  arp_frame_t *arp_frame = kmalloc (sizeof(arp_frame_t), GFP_KERNEL);
  
  arp_hdr_t *arp_hdr = &arp_frame->arp_hdr;

  arp_hdr->hw_type        = htons(ARP_HW_ETH);
  arp_hdr->proto          = htons(ARP_PROTO_IPv4);
  arp_hdr->hw_addr_len    = MAC_LEN;
  arp_hdr->proto_addr_len = IPv4_ADDR_LEN;
  arp_hdr->opcode         = htons(ARP_OP_REQUEST);
  
  // src_mac will be set by Ethernet layer
  // Dest MAC is broadcast addr FF:FF:FF:FF:FF:FF 
  ip_addr_copy(src_ip, arp_hdr->src_ip);
  ip_addr_copy(dest_ip, arp_hdr->dest_ip);
  
  ipv4_addr_t ip0 = {0,0,0,0};
  ip_addr_copy (ip0, arp_hdr->dest_ip);

  arp_frame->ethdr.eth_type = htons(ETH_TYPE_ARP);
  
  // In case of ARP-Request. dest MAC is broadcast
  mac_t mac_broadcast = {0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF};
  mac_copy(mac_broadcast, arp_hdr->dest_mac);
  mac_copy(mac_broadcast, &arp_frame->ethdr.mac_dest);
    
  // Ethernet layer will populate src_mac 
  // and send the frame
  ether_send_packet ((u8*) arp_frame, sizeof(arp_frame_t));
}

void arp_request_test()
{
  ipv4_addr_t src_ip = {192, 168, 43, 5};
  ipv4_addr_t dest_ip = {192, 168, 43, 1};
  arp_request (&src_ip, &dest_ip);
}