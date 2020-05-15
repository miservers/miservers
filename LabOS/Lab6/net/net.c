/* 2020 @AR
 *
 * Initialiase network devices and interfaces
 */
# include <net/net.h>
# include <list.h>
# include <mm.h>

struct list_head   netif_list;    // all net interfaces are registered here

struct list_head   netdev_list;  // all net devices are here

netif_t ETH0={.name      = "eth0", 
              .ip        = {192,168,56,4}, 
              .mask      = {255,255,255,0},
              .broadcast = {192,168,56,255},
              .state     = NETIF_UP,
              .mtu       = MTU,   
              .qlen      = 1000};

extern net_device_t* e1000_dev;


void netif_init ()
{
  INIT_LIST_HEAD(&netif_list);
  INIT_LIST_HEAD(&netdev_list);

  if (e1000_dev) 
  {
    list_add_tail (e1000_dev->list, &netdev_list);
    mac_copy (e1000_dev->mac, ETH0.mac);
    list_add_tail (ETH0.list, &netif_list);    
  }
  
}




