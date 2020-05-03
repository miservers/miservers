target remote localhost:1234

### Real Mode 
#set architecture i8086
#break *0x7c00
#break *0x1000

### Protected Mode 
set arch i386
symbol-file ~/magOS/LabOS/bin/kernel-debug.sym
#symbol-file ~/magOS/bin/kernel/kernel-debug.sym
#symbol-file ~/magOS/bin/usr/user-debug.sym

#break  *0x2000
#break  *0x10000c
#break _start
#break startup_32
#b irq_init
break start_kernel
b _pci_conf_reg_read
b irq_1
c
