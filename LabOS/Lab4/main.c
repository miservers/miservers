
#include <console.h>
#include <system.h>


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

	cons_write("Lab 4.......[OK]");

	cpu_idle();
}

