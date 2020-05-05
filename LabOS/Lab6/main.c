
#include <console.h>
#include <system.h>
#include <pic.h>
#include <timex.h>
#include <keyboard.h>
#include <pci.h>
#include <e1000.h>
#include <if_ether.h>
#include <kernel.h>

extern void kbc_i8042_init();
extern void _i8042_read_polling ();

void start_kernel(void);  
 
void wait (int t) {while(t--) halt();}

/* process #0*/
void cpu_idle(void)
{
  while (1) halt();
}

void start_kernel () {
	
	char * banner = "Starting Lab OS...\n"; 
	

	cons_init();

	cons_write(banner);

										// DO NOT initialize KBC!!.  
	pit_8253_init();  // Timer controller		
	pic_8259a_init(); // PIC 8259
	

	pci_probe_devices();
	e1000_start();

	sti();
	cons_write("Interrupts enabled..........[OK]\n");


	while (1){
		test_send_eth ();
		wait(100);
	}
	
	cpu_idle();
}

