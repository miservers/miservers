// Test of Code C. this is not a test of kernel
#include <stdio.h>

void bit_field_test()
{
  printf ("bit_field_test:\n");

  struct date 
  {
    unsigned char day:5, 
                  month:3;
    unsigned int year;
  };

  struct date d = {25, 3, 2020};
  printf ("Date: %d-%d-%d\n", d.day, d.month, d.year); 

}

int main()
{
  bit_field_test();
  return 0;    
}