// 2020 @AR
#include <net/if_ether.h>
#include <net/arp.h>
#include <net/e1000.h>
#include <libc.h>
#include <kernel.h>
#include <mm.h>


extern net_device_t *e1000_dev;

//-----------------------------------------------------
//           Send a frame
// @frame_len : total frame length
//----------------------------------------------------- 
void ether_send_packet (ethframe_t* ethframe, u32 frame_len, netif_t *netif)
{
  u8* payload = (u8 *)(&ethframe->ethhdr + sizeof (ethhdr_t));

  if (!e1000_dev)
  {
    warn ("Unable to send a Ethernet packet : E1000 not exist!");
    return;
  }

  ethhdr_t *ethhdr = &ethframe->ethhdr;

  // dest_mac and eth_type are set by IP or ARP layer
  
  mac_copy (netif->mac, ethhdr->mac_src);

  // checksum FCS
  u32 sum = ether_checksum (payload, frame_len);
  *((u8 *)ethframe + frame_len - ETH_CRC_LEN) = sum; // FCS need to be calculated

  info ("Sending Ethernet frame-> payload length %d Bytes. Checksum %x ", frame_len, sum);

  e1000_send_packet ((u8 *)ethframe, frame_len);
}

//--------------------------------------------
// BAD
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






