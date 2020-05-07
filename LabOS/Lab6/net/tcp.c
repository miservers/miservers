
#include <net/if_ether.h>

struct tcp_struct
{
  ethdr_t ethdr;   //ethernet header
  //iphdr_t iphdr;
  //tcphdr_t tcphdr;

  u8* data;

  u32 crc;         // ethernet checksum
};


