target remote localhost:1234

### Real Mode 
#set architecture i8086
#break *0x7c00
break *0x1000

### Protected Mode 
#set arch i386
#symbol-file /magOS/bin/usr/user-debug.sym
#break *0x90200
#break  *0x1000
#break start_kernel
#b *0x400000

c
