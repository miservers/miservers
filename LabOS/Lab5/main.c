
#include <console.h>
#include <system.h>
#include <pic.h>
#include <timex.h>
#include <keyboard.h>

extern void kbc_i8042_init();

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


    pic_8259a_init(); // PIC 8259
	kbc_i8042_init(); // Keyboard controller
	pit_8253_init();  // Timer controller		
	

	sti();
	cons_write("Interrupts enabled..........[OK]\n");
	
	
	cpu_idle();
}

