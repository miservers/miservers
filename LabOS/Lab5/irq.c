/* Copyrigth 2020 @AR
 * 
 * irq.c definit le handler de traitement des interruptions matirielles non masques. 
 * puis initialise le IDT sur les entrées de 32 a 47, supposant qu'on dispose de deux controlleur PIC 8259A, 
 * maitre et esclave.
*/ 
#include <irq.h>
#include <idt.h>
#include <io.h>
#include <keyboard.h>

#define IRQ_0  32  /*Timer*/
#define IRQ_1  33  /*keyboard*/
#define IRQ_2  34
#define IRQ_3  35
#define IRQ_4  36

#define IRQ_5  37
#define IRQ_6  38
#define IRQ_7  39
#define IRQ_8  40  /*system clock*/
#define IRQ_9  41 
#define IRQ_10 42
#define IRQ_11 43  /*network interface*/
#define IRQ_12 44  /*PS/2 mouse*/
#define IRQ_13 45  /*mathematical coprocessor*/
#define IRQ_14 46  /*hd primary controler*/
#define IRQ_15 47  /*hd secondary controler*/

void irq_1(void);


/* 
 * PIC 8259A (Programmabl3 Interrupt Controller).
 * 
 */
void _8259a_init()
{
   /* Init de ICW1,ICW2,ICW3 et ICW4 du Maitre(Port 0x20/0x21), Slave 0xA0/0xA1*/
   int master =  0x20;
   int slave =  0xA0;
   outb_p(0x11, master);   // ICW1  
   outb_p(0x11, slave); 
   outb_p(0x20, master+1); // ICW2 master. Set the master PIC's base offset to 32
   outb_p(0x70, slave+1);  // ICW2 slave. Set the slave PIC's base offset to 96
   outb_p(0x04, master+1); // ICW3
   outb_p(0x02, slave+1); 
   outb_p(0x01, master+1); // ICW4  
   outb_p(0x01, slave+1); 
   
   /* Init de OCW1 à 4 */

}

void irq_init()
{
   _8259a_init();
   
   set_intr_gate(IRQ_1, (u32) irq_1);  // keyboard irq   
}








