#ifndef _KERNEL_H
#define _KERNEL_H

#include <stdarg.h>
#include <system.h>

int vsprintf (char *buf, const char * format, va_list args );
void printk(const char * format,...);

#define warn(...) do {                 \
                  printk("Warning: "); \
                  printk(__VA_ARGS__); \
                  printk("\n");        \
                  }while(0)

#define panic(...) do {                     \
                  printk("Kernel Panic: "); \
                  printk(__VA_ARGS__);      \
                  printk("\n");             \
                  for (;;) halt();          \
                  }while(0)

#if KERNEL_DEBUG         
#define debug(...) do {                 \
                   printk("Debug: ");   \
                   printk(__VA_ARGS__); \
                   printk("\n");        \
                   }while(0)
#else
#define debug(...) do{;} while(0)            
#endif
      
#define info(...) do {                 \
                  printk("Info: ");    \
                  printk(__VA_ARGS__); \
                  printk("\n");        \
                  }while(0)
                
#endif
