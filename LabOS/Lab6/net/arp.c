/* 2020 @AR
 *
 * TCP/IP Address Resolution Protocol-ARP
 *
 */
#include <net/arp.h>
#include <net/net.h>
#include <types.h>
#include <libc.h>
#include <mm.h>

/* Send a broadcast request: hwo has @target_ip?
 * @target_ip MAC resolution. 
 */
void arp_request(ipaddr_t target_ip, netif_t *netif)
{
  // Init arp header
  arpframe_t *arpframe = kalloc (sizeof(arpframe_t));
  
  arpframe->ethframe.ethhdr.eth_type = htons(ETH_TYPE_ARP);
  
  arphdr_t *arphdr = &arpframe->arphdr;

  // Set ARP Header
  arphdr->hw_type        = htons(ARP_HW_ETH);
  arphdr->proto          = htons(ARP_PROTO_IPv4);
  arphdr->hw_addr_len    = MAC_LEN;
  arphdr->proto_addr_len = IPv4_ADDR_LEN;
  arphdr->opcode         = htons(ARP_OP_REQUEST);
  
  // src_mac will be set by Ethernet layer
  // Dest MAC is broadcast  FF:FF:FF:FF:FF:FF 
  ip_addr_copy(netif->ip, arphdr->src_ip);
  ip_addr_copy(target_ip, arphdr->dest_ip);
  
  mac_copy (netif->mac, arphdr->src_mac);
  
  // In case of ARP-Request. dest MAC is broadcast
  mac_t mac_broadcast = {0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF};
  mac_copy(mac_broadcast, arphdr->dest_mac);
  mac_copy(mac_broadcast, &arpframe->ethframe.ethhdr.mac_dest);
    
  // Ethernet layer will populate src_mac 
  // and send the frame
  ether_send_packet ((ethframe_t*) arpframe, sizeof(arpframe_t), netif);

  kfree(arpframe);
}


void arp_request_test()
{
  extern netif_t ETH0;
  ipaddr_t target_ip = {192, 168, 56, 17};
  arp_request (target_ip, &ETH0);
}

