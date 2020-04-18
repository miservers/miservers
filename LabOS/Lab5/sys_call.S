/*
 * INT :  does automatiquely
     -  without previlege transition
        ss:esp = old ss:esp
        push  eflags
        pushd cs
        push  eip
        push errorCode #if any
        
     - with previlege transition
        ss:esp = from TSS
        pushd old_ss
        push  old_esp
        push  eflags
        pushd cs
        push  eip
        push errorCode #if any
 * IRET :  does automatiquely certain pops then does return
     - return to same previlege level
       pop eip
       pop cs
       pop eflags
       
     - return to outer previlege level
       pop eip
       pop cs
       pop eflags
       pop esp
       pop ss
 
* System Call:
  %eax  sys call number
  %ebx  arg1
  %ecx  arg2
  %edx  arg3
  %esi  arg4
  %edi  arg5
 */

.att_syntax noprefix

#include <segment.h>

PIC_MASTER = 0x20   // master PIC  port  
PIC_SLAVE = 0xA0    // // slave PIC  port

FIRST=1
SECOND=2

/*if you modify this, you must do the same in ptrace.h*/ 
_EBX  = 0
_ECX  = 4
_EDX  = 8
_ESI  = 12
_EDI  = 16
_EBP  = 20
_EAX  = 24
_ES   = 28
_DS   = 32
_ERROR_CODE = 36
_EIP  = 40
_CS   = 44
_EFLAGS  = 48
_ESP = 52
_SS  = 56


.global irq_1
.global system_call

.extern keyboard_handler
   

.macro SAVE_ALL
   pushl ds
   pushl es
   push eax
   push ebp
   push edi
   push esi
   push edx
   push ecx
   push ebx   /*pushs in this order, system call args*/
   mov $KERNEL_DS, eax
   mov ax, ds
   mov ax, es
   mov $USER_DS, eax
   mov ax, fs
   mov ax, gs
   mov _EAX(esp), eax  #restore eax
   xor ebp, ebp /*zero first ebp, useful to show_trace*/
.endm

.macro RESTORE_ALL    
   pop ebx
   pop ecx
   pop edx
   pop esi
   pop edi
   pop ebp
   pop eax
   popl es   
   popl ds
   add $4, esp  #code error
.endm

 
# EOI : End Of Interrput acknowlegment. If not PIC wont handle anymore
.macro ack_pic chip
  push eax
  push edx
  mov $0x20, al
  mov \chip, dx
  outb al, dx
  jmp 1f
1:pop edx
  pop eax
.endm


irq_1: /*Keyboard*/
   pushl $0  #code error
   SAVE_ALL
   ack_pic $PIC_MASTER
   call keyboard_handler
   orl $0x200, _EFLAGS(esp)   #enable interrupt just after iret
   RESTORE_ALL
   iret

.end