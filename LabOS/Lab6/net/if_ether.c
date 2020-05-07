// 2020 @AR
#include <net/if_ether.h>
#include <net/arp.h>
#include <net/e1000.h>
#include <libc.h>
#include <kernel.h>
#include <mm.h>


extern net_device_t *e1000_dev;

//-----------------------------------------------------
//         Send 
//  add ethernet header to @payload and send it
// @payload : must start with  a ethdr_t
//----------------------------------------------------- 
void ether_send_packet (u8 *payload, u32 payload_len)
{
  if (!e1000_dev)
  {
    warn ("Unable to send a Ethernet packet : E1000 not exist!");
    return;
  }

  net_device_t* dev = e1000_dev;

  ethdr_t *ethdr = (ethdr_t *)payload;

  // populate Ethernet header
  mac_copy (dev->mac, ethdr->mac_src);
 
  if (ethdr->eth_type == htons(ETH_TYPE_ARP))
  {
    arp_hdr_t *arp_hdr = (arp_hdr_t *) (payload + sizeof(ethdr_t));
    mac_copy (dev->mac, arp_hdr->src_mac);
  }
  // Copy Frame content on the head tx buffer
  //memcpy ( (u8*)&ethframe->hdr,  buf,                                    ETH_HDR_SIZE         );
  //memcpy ( ethframe->payload,    buf+ETH_HDR_SIZE,                       ethframe->payload_len);
  //memcpy ( (u8*)&ethframe->crc,  buf+ETH_HDR_SIZE+ethframe->payload_len, 4                    );

  // checksum
  u32 sum = ether_checksum (payload, payload_len);
  *(payload + payload_len) = htonl(sum);
  payload_len += ETH_SUM_LEN;

  info ("Sending Ethernet frame-> payload length %d Bytes. Checksum %x ", payload_len, sum);

  e1000_send_packet (payload, payload_len);
}

//--------------------------------------------
//
//--------------------------------------------
u32 ether_checksum (u8 *addr, u32 count)
{
  register u32 sum = 0;
  u8* ptr = addr; 
  
  // sum loop
  while (count >= 4)
  {
    sum += *(u32 *)ptr++;
    count -= 4;
  }

  // add left bytes
  while (count > 0)
  {
    sum += *ptr++;
    count -= 1;
  }

  return sum;
}






