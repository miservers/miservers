#ifndef _KLIBC_H
#define _KLIBC_H

#include <types.h>

u8* memcpy(u8 *src, u8 *dst, int len);

void memset(u8 *adr, u8 val, int len);
void memsetw(u16 *adr, u16 val, int len);
void memsetd(u32 *adr, u32 val, int len);

int itoa(u8 *buf, u32 n, int base);
int utoa(u8 *buf, u32 n, int base);

int atoi(u8 *str);

int ctoi(u8 c);

#define is_digit(c)   (((c - '0') >= 0 && (c - '0') <= 9)?1:0)

#endif
