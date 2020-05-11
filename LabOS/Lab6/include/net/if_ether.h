#ifndef IF_ETHER_H
#define IF_ETHER_H

/* IEEE 802.3 standard.
 *
 * MTU-Maximum transmission unit : 1500B
 *
 * In case of broadcast dest mac is FF-FF-FF-FF-FF-FF. 
 */

#include <types.h>
#include <net/net.h>

#define ETH_HDR_SIZE  14
#define ETH_CRC_LEN    4     // Checksum length 


typedef struct ethhdr 
{
  mac_t mac_dest;
  mac_t mac_src;
  u16 eth_type;
} _packed_ ethhdr_t;
 
typedef struct ethframe
{
  ethhdr_t ethhdr;
  // data go here
} _packed_ ethframe_t;


void ether_send_packet (ethframe_t* ethframe, u32 frame_len, netif_t *netif);

u32 ether_checksum (u8 *addr, u32 count);


/* Ether type */
#define ETH_TYPE_IPv4    0x0800
#define ETH_TYPE_ARP     0x0806
#define ETH_TYPE_DOMAIN  0x8019
#define ETH_TYPE_8021Q   0x8100























#endif