
#include <console.h>
#include <system.h>
#include <pic.h>
#include <timex.h>
#include <keyboard.h>
#include <pci.h>
#include <net/e1000.h>
#include <net/net.h>
#include <net/arp.h>
#include <net/ip.h>
#include <net/udp.h>
#include <kernel.h>
#include <mm.h>

unsigned long start_low_mem = START_LOW_MEM;
unsigned long low_mem;
unsigned long start_mem;
unsigned long end_mem;

void start_kernel(void);  
 
/* process #0*/
void cpu_idle(void)
{
  while (1) halt();
}

void start_kernel () {
	
	char * banner = "Starting Lab OS...\n"; 
	

	cons_init();

	cons_write(banner);

	start_mem = ZONE_NORMAL; // 16MB. 
	end_mem   = (0x100000 * 32 );  //32 MB. must be determined dynamically
  start_mem = mem_init(start_mem, end_mem);    //physical mem
    
	show_mem ();

										// DO NOT initialize KBC!!.  
	pit_8253_init();  // Timer controller		
	pic_8259a_init(); // PIC 8259
	

	pci_probe_devices();
	
	e1000_init ();
	netif_init ();

	sti();
	cons_write("Interrupts enabled..........[OK]\n");

	// DEBUG
	arp_request_test ();
	//udp_send_test();
	//DEBUG END

	cpu_idle();
}

