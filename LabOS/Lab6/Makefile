# LAB-6 Makefile 2020

img     = vmlabos.iso

src     = $(wildcard *.c)
bindir  = ../bin

kern_objs     = boot/head.o $(src:.c=.o) sys_call.o
objs          = $(addprefix $(bindir)/, $(kern_objs))  

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

subdirs  = boot drivers net

all: $(img)  

.PHONY:  $(subdirs) all

$(bindir)/%.o:%.S
	$(CC) $(CFLAGS) $(INCLUDE) -c $< -o $@

$(bindir)/%.o:%.c
	$(CC) $(CFLAGS) $(INCLUDE) -c $< -o $@

$(subdirs):
	$(MAKE)  -C $@

$(bindir)/kernel.elf: $(objs) 
	@echo Linking stage 1
	$(LD) -n -T linker.ld $^  $(bindir)/drivers/*.o  -o $@
	$(OBJCOPY)  --only-keep-debug $@ $(bindir)/kernel-debug.sym
	$(OBJCOPY)  --strip-debug $@ $@
	
$(bindir)/kernel.bin:$(bindir)/kernel.elf
	@echo Linking stage 2
	$(OBJCOPY) -O binary $<  $@

$(img): $(subdirs) $(bindir)/kernel.bin
	@echo -------- HD Image---------
	cat  $(bindir)/boot/bootsect.bin $(bindir)/boot/setup.bin $(bindir)/kernel.bin  /dev/zero |\
	                                         dd of=$(bindir)/$@ bs=512 count=2048 status=none
	#vboxmanage convertfromraw $(OUT_img) $(OUT_img).vdi --format vdi


init:
	mkdir -p $(bindir)/boot $(bindir)/drivers $(bindir)/net 

clean:
	rm -f $(objs) $(bindir)/$(img)  $(bindir)/$(img).vdi  $(bindir)/kernel.bin $(bindir)/kernel-debug.sym $(bindir)/kernel.elf
	$(MAKE) -C boot    clean
	$(MAKE) -C drivers clean
	$(MAKE) -C net     clean






