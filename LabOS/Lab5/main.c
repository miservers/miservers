
#include <console.h>
#include <idt.h>
#include <system.h>

void start_kernel(void);  
 
/* process #0*/
void cpu_idle(void)
{
  while (1);
}

void start_kernel () {
	
	char * banner = "Starting Lab OS...\n"; 
	

	cons_init();

	cons_write(banner);

	idt_init();
	cons_write("IDT initialised.............[OK]\n");

	sti();
	cons_write("Interrupts enabled..........[OK]\n");
		
	cpu_idle();
}

