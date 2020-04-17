
#include <console.h>


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

	cpu_idle();
}

