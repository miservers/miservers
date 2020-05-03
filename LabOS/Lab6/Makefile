# LAB-6 Makefile 2020

img     = vmlabos.iso

src     = $(wildcard *.c)

bindir  = ../bin

driv_objs = $(addprefix $(bindir)/drivers/, console.o keyboard.o pci.o e1000.o)
net_objs  = $(addprefix $(bindir)/net/, if_ether.o)
kern_objs = $(addprefix $(bindir)/, boot/head.o $(src:.c=.o) sys_call.o)

subdirs  = boot drivers net

INCLUDE += -I./include
ARCH     = i386-elf
LD       = $(ARCH)-ld  
CC       = $(ARCH)-gcc
OBJCOPY  = $(ARCH)-objcopy
MAKE     = make --no-print-directory
CFLAGS  += -g -O0 -Wall  -fno-builtin -nostdinc -fno-omit-frame-pointer 

export LD
export CC
export CFLAGS


all: $(img) 

.PHONY:  $(subdirs) all

$(bindir)/%.o:%.S
	$(CC) $(CFLAGS) $(INCLUDE) -c $< -o $@

$(bindir)/%.o:%.c
	$(CC) $(CFLAGS) $(INCLUDE) -c $< -o $@

$(subdirs):
	$(MAKE)  -C $@

$(bindir)/kernel.elf: $(kern_objs) $(driv_objs)  $(net_objs)    
	@echo ++++ Linking stage 1
	$(LD) -n -T linker.ld $(kern_objs)  $(net_objs) $(driv_objs)  -o $@
	$(OBJCOPY)  --only-keep-debug $@ $(bindir)/kernel-debug.sym
	$(OBJCOPY)  --strip-debug $@ $@
	
$(bindir)/kernel.bin:$(bindir)/kernel.elf
	@echo ++++ Linking stage 2
	$(OBJCOPY) -O binary $<  $@

$(img): $(subdirs) $(bindir)/kernel.bin
	@echo ++++ HD Image
	cat  $(bindir)/boot/bootsect.bin $(bindir)/boot/setup.bin $(bindir)/kernel.bin  /dev/zero |\
	                                         dd of=$(bindir)/$@ bs=512 count=2048 status=none

vbox:
	rm -f $(bindir)/$(img).vdi                             
	vboxmanage convertfromraw $(bindir)/$(img) $(bindir)/$(img).vdi --format vdi
	vboxmanage storageattach LabOS --storagectl "SCSI" --port 0 --device 0 --medium none
	vboxmanage closemedium disk $(bindir)/$(img).vdi
	vboxmanage storageattach LabOS --storagectl "SCSI" --port 0 --device 0 --type hdd --medium $(bindir)/$(img).vdi


init:
	mkdir -p $(bindir)/boot $(bindir)/drivers $(bindir)/net 

clean:
	rm -f $(kern_objs) $(bindir)/$(img) $(bindir)/$(img).vdi  $(addprefix $(bindir)/kernel, .elf .bin -debug.sym)
	$(MAKE) -C boot    clean
	$(MAKE) -C drivers clean
	$(MAKE) -C net     clean






