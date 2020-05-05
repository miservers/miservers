#include <stdarg.h>
#include <libc.h>

u8 * memcpy(u8 *src, u8 *dst, int len)
{
   __asm__ ("rep movsb "
            ::"S"(src), "D"(dst), "c"(len):);
   return dst;
}

void memset(u8 *adr, u8 val, int len)
{
   __asm__ ("rep stosb "::"D"(adr), "al"(val), "c"(len):);
}

void memsetw(u16 *adr, u16 val, int len)
{
    __asm__  ("rep stosw "::"D"(adr), "ax"(val), "c"(len):);
}

void memsetd(u32 *adr, u32 val, int len)
{
   __asm__ ("rep stosl "::"D"(adr), "a"(val), "c"(len):);
}

/*convert an integer <n> to ascii string*/
int itoa( u8 *buf, u32 n, int base)
{
   int mod, i=0, j=0;
   u8 c;
   
   do {
      mod = n%base;
      buf[i++] = (mod<10)?(mod+'0'):(mod-10+'a');
   } while (n/=base);
   
   buf[i--] = '\0';
   
   for (j=0; j<i; j++, i--) {
      c = buf[j];
      buf[j] = buf[i];
      buf[i] = c;
   }
   
   return 0;   
}

int atoi(u8 *str)
{
   u8 *tmp = str;
   int n=0, base, itmp;
   
   if ((*tmp++ == '0') && (*tmp++ == 'x'))
      base = 16;
   else {
      base = 10;
      tmp = str;
   }
   for (;*tmp; tmp++){
     itmp = (*tmp<='9')?(*tmp-'0'):(*tmp-'a'+10);
     n = n*base + itmp;
   } 
   
   return n;
}

int ctoi(u8 c)
{
  return (c - '0');
}

int utoa( u8 *buf,  u32 n, int base)
{
   int mod, i=0, j=0;
   u8 c;
   
   do {
      mod = n%base;
      buf[i++] = (mod<10)?(mod+'0'):(mod-10+'a');
   } while (n/=base);
   
   buf[i--] = '\0';
   
   for (j=0; j<i; j++, i--) {
      c = buf[j];
      buf[j] = buf[i];
      buf[i] = c;
   }
   
   return 0;   
}


