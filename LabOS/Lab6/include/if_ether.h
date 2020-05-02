#ifndef IF_ETHER_H
#define IF_ETHER_H

/* IEEE 802.3 standard.
 *
 * MTU-Maximum transmission unit : 1500B
 *
 * In case of broadcast dest mac is FF-FF-FF-FF-FF-FF. 
 */

#include <types.h>

#define MAC_LEN  6

typedef struct {
  u8 mac_dest[MAC_LEN];
  u8 mac_src[MAC_LEN];
  u16 eth_type;
} __attribute((packed)) ethhdr_t;
 

/* Ether type */
#define ETH_TYPE_IPv4    0x0800
#define ETH_TYPE_ARP     0x0806
#define ETH_TYPE_DOMAIN  0x8019
#define ETH_TYPE_8021Q   0x8100























#endif