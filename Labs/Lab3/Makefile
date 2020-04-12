# LAB-2 Makefile 2020

EXE     = bootsect.bin setup.bin head.bin
SRC_DIR = .
SRC     = $(wildcard *.S)
OBJ     = $(SRC:.S=.o)

KERN_IMG = ../../bin/Lab3.img

OUT_DIR = ../../bin/Lab3/boot
OUT_EXE = $(addprefix $(OUT_DIR)/, $(EXE)) 
OUT_OBJ = $(addprefix $(OUT_DIR)/, bootsect.o setup.o head.o )

INCLUDE += -I./

LD       = i386-elf-ld
CC       = i386-elf-gcc
CFLAGS += -O0 -Wall -fno-builtin -nostdinc -fno-omit-frame-pointer  $(INCLUDE)

all: kernel.imgage

$(OUT_DIR)/bootsect.o:$(SRC_DIR)/bootsect.S
	$(CC) $(CFLAGS) -c $< -o $@
	
$(OUT_DIR)/setup.o:$(SRC_DIR)/setup.S
	$(CC) $(CFLAGS) -c $< -o $@

$(OUT_DIR)/head.o:$(SRC_DIR)/head.S
	$(CC) $(CFLAGS) -c $< -o $@

$(OUT_DIR)/bootsect.bin:$(OUT_DIR)/bootsect.o
	$(LD) --oformat binary -Ttext 0x0  $^ -o $@

$(OUT_DIR)/setup.bin:$(OUT_DIR)/setup.o
	$(LD) --oformat binary -Ttext 0x0  $^ -o $@

$(OUT_DIR)/head.bin:$(OUT_DIR)/head.o
	# kernel space 3GB-to-4GB
	$(LD) --oformat binary -Ttext 0x1400  $^ -o $@

kernel.imgage: $(OUT_EXE)
	@echo -------- Building HD Image---------
	cat $(OUT_DIR)/bootsect.bin $(OUT_DIR)/setup.bin $(OUT_DIR)/head.bin /dev/zero | dd status=none of=$(KERN_IMG) bs=512 count=512
	
init:
	mkdir -p $(OUT_DIR)

clean:
	rm -f $(OUT_EXE) $(OUT_OBJ) $(KERN_IMG)
