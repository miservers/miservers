#ifndef _ASM_SYSTEM_H
#define _ASM_SYSTEM_H


#define cli() __asm__ __volatile__("cli":::)
#define sti() __asm__ __volatile__("sti":::)
#define nop() __asm__ __volatile__("nop":::)
#define iret() __asm__ __volatile__("iret":::)
#define halt() __asm__ __volatile__("hlt":::)

#define zero_mem(addr,nbytes)  \
              __asm__(                          \
                  "cld\n\t"                     \
                  "xor %%al, %%al\n\t"          \
                  "rep; stosb"                  \
                  ::"c"(nbytes),"D"(addr));

#endif
