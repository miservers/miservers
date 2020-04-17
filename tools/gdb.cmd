target remote localhost:1234

### Real Mode 
#set architecture i8086
#break *0x7c00
#break *0x1000

### Protected Mode 
set arch i386
symbol-file ~/magOS/bin/Lab4/kernel-debug.sym
#symbol-file ~/magOS/bin/kernel/kernel-debug.sym
#symbol-file ~/magOS/bin/usr/user-debug.sym

#break  *0x2000
#break  *0x10000c
#break _start
break startup_32
break start_kernel
#b cons_clear
c
