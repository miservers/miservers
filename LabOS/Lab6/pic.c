/* Copyrigth 2020 @AR
 * 
 * irq.c definit le handler de traitement des interruptions matirielles non masques. 
 * puis initialise le IDT sur les entrées de 32 a 47, supposant qu'on dispose de deux controlleur PIC 8259A, 
 * maitre et esclave.
*/ 
#include <pic.h>
#include <idt.h>
#include <io.h>
#include <keyboard.h>

/*PIC 1*/
#define IRQ_0  32  /*Timer*/
#define IRQ_1  33  /*keyboard*/
#define IRQ_2  34
#define IRQ_3  35
#define IRQ_4  36
#define IRQ_5  37
#define IRQ_6  38
#define IRQ_7  39

/*PIC 2*/
#define IRQ_8  40  /*system clock*/
#define IRQ_9  41 
#define IRQ_10 42
#define IRQ_11 43  /*network interface*/
#define IRQ_12 44  /*PS/2 mouse*/
#define IRQ_13 45  /*mathematical coprocessor*/
#define IRQ_14 46  /*hd primary controler*/
#define IRQ_15 47  /*hd secondary controler*/

#define PIC1_CMD    0x20
#define PIC2_CMD    0xA0
#define PIC1_DATA   0x21
#define PIC2_DATA   0xA1


extern void irq_0();
extern void irq_1();
extern void irq_11();

void pic_delay()
{
   for (int i=0; i<255;i++);
}
/* 
 * PIC 8259A (Programmabl3 Interrupt Controller).
 * 
 */
void pic_8259a_init()
{   
   /* Init de ICW1,ICW2,ICW3 et ICW4 du Maitre(Port 0x20/0x21), Slave 0xA0/0xA1*/
   outb_p(0x11, PIC1_CMD);   // ICW1  
   pic_delay();
   outb_p(0x11, PIC2_CMD); 
   pic_delay();

   /*Remap*/
   outb_p(0x20, PIC1_DATA);  // ICW2 . idt offeset. Remapping. Set the master PIC's base offset to 32.
   pic_delay();
   outb_p(0x28, PIC2_DATA);  // Set the slave PIC's base offset to 40
   pic_delay();

   /*Cascade identity with slave PIC at IRQ2 */
   outb_p(0x02, PIC1_DATA);  // ICW3
   pic_delay();
   outb_p(0x04, PIC2_DATA); 
   pic_delay();
   
   /*Request 8086 mode on each PIC */
   outb_p(0x01, PIC1_DATA);  // ICW4  
   pic_delay();
   outb_p(0x01, PIC2_DATA); 
   pic_delay();
   
   /*OCW1, mask*/
   outb_p(0xFC, PIC1_DATA); // OCW4 master.0xFC. 11111100b. enable (clear bit) irq0 and irq1 and disable other(set bit) 
   outb_p(0xA7, PIC2_DATA); // OCW4 slave.0xA7. 10100111b. ebable irq11/12/14 and disable others.  
   
}

void irq_init()
{
   set_intr_gate(IRQ_0, (u32) irq_0);    // Timer 
   
   set_intr_gate(IRQ_1, (u32) irq_1);    // keyboard 
   
   set_intr_gate(IRQ_11, (u32) irq_11);  // Ethernet 

    
}








