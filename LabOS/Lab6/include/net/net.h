#ifndef NET_H
#define NET_H

#include <types.h>
#include <net/net.h>

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


typedef u8 mac_t [MAC_LEN];    

typedef u8 ipv4_addr_t [IPv4_ADDR_LEN]; 


#define ip_addr_copy(src, dest)  memcpy ((u8 *)src, (u8 *)dest,  IPv4_ADDR_LEN);
#define mac_copy(src, dest)      memcpy ((u8 *)(src), ((u8 *)dest),  MAC_LEN);
  

#endif