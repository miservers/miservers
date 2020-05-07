# LAB-6 Makefile 2020

img     = vmlabos.iso

src     = $(wildcard *.c)

bindir  = ../bin

# very bad to do so, find other way?
libc_objs = $(addprefix $(bindir)/libc/, libc.o printk.o vsprintf.o)
mm_objs   = $(addprefix $(bindir)/mm/, memory.o kmalloc.o)
driv_objs = $(addprefix $(bindir)/drivers/, console.o keyboard.o pci.o e1000.o)
net_objs  = $(addprefix $(bindir)/net/, if_ether.o arp.o)
kern_objs = $(addprefix $(bindir)/, boot/head.o $(src:.c=.o) sys_call.o)

modules  = boot libc mm drivers net 

INCLUDE += -I./include
ARCH     = i386-elf
LD       = $(ARCH)-ld  
CC       = $(ARCH)-gcc
OBJCOPY  = $(ARCH)-objcopy
MAKE     = make --no-print-directory
CFLAGS  += -g -O0 -Wall -Werror  -fno-builtin -nostdinc -fno-omit-frame-pointer 

export LD
export CC
export CFLAGS


all: $(img) 

.PHONY:  $(modules) all

$(bindir)/%.o:%.S
	$(CC) $(CFLAGS) $(INCLUDE) -c $< -o $@

$(bindir)/%.o:%.c
	$(CC) $(CFLAGS) $(INCLUDE) -c $< -o $@

$(modules):
	$(MAKE)  -C $@


kern_deps=$(kern_objs) $(libc_objs) $(mm_objs) $(driv_objs)  $(net_objs)

$(bindir)/kernel.elf: $(kern_deps)    
	@echo ++++ Linking stage 1
	$(LD) -n -T linker.ld $(kern_deps) -o $@
	$(OBJCOPY)  --only-keep-debug $@ $(bindir)/kernel-debug.sym
	$(OBJCOPY)  --strip-debug $@ $@
	
$(bindir)/kernel.bin:$(bindir)/kernel.elf
	@echo ++++ Linking stage 2
	$(OBJCOPY) -O binary $<  $@

$(img): $(modules) $(bindir)/kernel.bin
	@echo ++++ HD Image
	cat  $(bindir)/boot/bootsect.bin $(bindir)/boot/setup.bin $(bindir)/kernel.bin  /dev/zero |\
	                                         dd of=$(bindir)/$@ bs=512 count=2048 status=none


init:
	mkdir -p $(addprefix $(bindir)/, $(modules))  

clean:
	rm -f $(kern_objs) $(bindir)/$(img) $(bindir)/$(img).vdi  $(addprefix $(bindir)/kernel, .elf .bin -debug.sym)
	$(MAKE) -C boot    clean
	$(MAKE) -C libc    clean
	$(MAKE) -C mm      clean
	$(MAKE) -C drivers clean
	$(MAKE) -C net     clean






