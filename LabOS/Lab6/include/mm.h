#ifndef MAGOS_MM_H
#define MAGOS_MM_H

#include <types.h>
#include <segment.h>
#include <list.h>
#include <page.h>

#define MAP_NR(vaddr) (_pa(vaddr) >> PAGE_SHIFT)  /*virtual page number in kernel space?*/ 
#define MAP_ADDR(page_nr) ((page_nr) << PAGE_SHIFT)

#define RAM_MAXPAGE (0xffffff >> PAGE_SHIFT) /* 16 Mo de RAM max pour le moment*/ 


#define RAM_MAXPAGE (0xffffff >> PAGE_SHIFT) /* 16 Mo de RAM max pour le moment*/ 

#define LD_ENTRY  0x400000 /*programms will be loaded at this address*/

#define START_LOW_MEM 0x100000  /*low mem start at 1MB*/

#define ZONE_DMA      0x0         /*Zone de 0 a 16Mo, limité par Bus ISA, identity mapping*/
#define ZONE_NORMAL   0x1000000   /*Zone de 16 a 896Mo, identity mapping*/
#define ZONE_HIGHMEM  0x38000000  /*Zone audela de 896M*/

#define DMA_START       0x100000      //DMA : 1MB-16MB
#define DMA_END         0x1000000     
#define VMALLOC_START   0x1000000     //KERNEL PAGES HEAP : 16MB-256MB
#define VMALLOC_END     0x10000000    
#define KMALLOC_START   0x10000000    //KERNEL HEAP : 256MB-1GB
#define KMALLOC_END     0x40000000

#define RESERVED_PAGES (16 + 16) /* 64k(16 pages) for kernel code, 64k for kstack */

#define SWAPPER_PG_DIR 0x1000

/*get_free_page (physical) flags*/
#define GFP_DMA    0x00
#define GFP_KERNEL 0x01
#define GFP_USER   0x02


/* memory.c */
unsigned long  get_free_page(int flags); /*renvoie une frame physique libre */
void free_page(unsigned long addr);
unsigned long mem_init(unsigned long start_mem, unsigned long end_mem);
void show_mem(void);

/*get a zeroed free page*/
inline static unsigned long __get_free_page(int flags)
{
  unsigned long addr = get_free_page(flags);
  zero_page(addr);
  return addr;
}


/*kmalloc.c*/
int ksbrk (int n, int order, int flags);
void * kmalloc(size_t size, int flags); 
#define kalloc(size)   kmalloc(size,GFP_KERNEL)
void kfree(void * addr); 
void show_kheap();


#endif
