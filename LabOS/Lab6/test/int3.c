/**
 *
 * Test on breackpoint Using INT3.
 * 
 *  gdb ./int3 
 *    > set architecture i386:x86-64
 *    > run
 */


int main()
{
  
  __asm__("int3");

  return 0;
}