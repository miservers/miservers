// 2020 @AR
#include <if_ether.h>
#include <libc.h>

extern  void e1000_send_packet (ethframe_t* ethframe);

void ether_send_packet ()
{

  ethframe_t frame;
  
  memset((char *)&(frame.hdr.mac_dest), 0xFF , MAC_LEN); //broadcast
  frame.hdr.eth_type = ETH_TYPE_ARP;

  u32 payload_len = 238; 
  u8 payload[payload_len];
  memset((char *)&payload[0], 0x77 , payload_len);

  frame.payload     = (u8*)&payload;
  frame.payload_len = payload_len;

  e1000_send_packet (&frame);


}








