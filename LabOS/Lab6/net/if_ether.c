// 2020 @AR
#include <if_ether.h>
#include <libc.h>
#include <kernel.h>
#include <e1000.h>

extern net_device_t *e1000_dev;

//-----------------------------------------------------
//         Send 
//  add ethernet header to @payload and send it
//----------------------------------------------------- 
void ether_send_packet (ethframe_t *ethframe)
{
  u8 buf[TX_BUF_LEN];

  if (!e1000_dev)
  {
    warn ("Unable to send a Ethernet packet : E1000 not exist!");
    return;
  }

  net_device_t* netdev = e1000_dev;

  // Set Ethernet header
  memset (ethframe->hdr.mac_dest, 0xFF                 , MAC_LEN); //broadcast
  memcpy (netdev->mac,            ethframe->hdr.mac_src, MAC_LEN);
  ethframe->hdr.eth_type = ETH_TYPE_ARP;
  
 
  // Copy Frame content on the head tx buffer
  memcpy ( (u8*)&ethframe->hdr,  buf,                                    ETH_HDR_SIZE         );
  memcpy ( ethframe->payload,    buf+ETH_HDR_SIZE,                       ethframe->payload_len);
  memcpy ( (u8*)&ethframe->crc,  buf+ETH_HDR_SIZE+ethframe->payload_len, 4                    );

  info ("Sending Ethernet frame-> payload_len %#X ", ETHFRAME_SIZE(ethframe));

  e1000_send_packet (buf, ETHFRAME_SIZE(ethframe));

}

void test_send_eth()
{
  ethframe_t ethframe;

  u32 payload_len = 238; 
  u8 payload[payload_len];
  
  memset(payload, 0xA7 , payload_len);

  ethframe.payload     = payload;
  ethframe.payload_len = payload_len;
  ethframe.crc        = 0;
  
  ether_send_packet (&ethframe);
}






