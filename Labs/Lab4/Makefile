# LAB-2 Makefile 2020

EXE     = bootsect.bin setup.bin kernel.bin

OUT_DIR = ../../bin/Lab4

KERN_IMG = $(OUT_DIR)/kernel.img

SRC     = $(wildcard *.c)
OBJ     =  head.o $(SRC:.c=.o) 

KERN    = $(addprefix $(OUT_DIR)/, $(OBJ)) 

OUT_EXE = $(addprefix $(OUT_DIR)/, $(EXE)) 
OUT_OBJ = $(addprefix $(OUT_DIR)/, bootsect.o setup.o )  $(KERN)


INCLUDE += -I./

LD       = i386-elf-ld
CC       = i386-elf-gcc
CFLAGS += -O0 -Wall -fno-builtin -nostdinc -fno-omit-frame-pointer  $(INCLUDE)

       
all: kernel.image

$(OUT_DIR)/%.o:%.S
	$(CC) $(CFLAGS) -c $< -o $@

$(OUT_DIR)/%.o:%.c
	$(CC) $(CFLAGS) -c  $< -o $@

$(OUT_DIR)/bootsect.bin:$(OUT_DIR)/bootsect.o
	$(LD) --oformat binary -Ttext 0x0  $^ -o $@

$(OUT_DIR)/setup.bin:$(OUT_DIR)/setup.o
	$(LD) --oformat binary -Ttext 0x0  $^ -o $@

$(OUT_DIR)/kernel.bin:$(KERN)
	$(LD) --oformat binary -Ttext 0x1400  $^ -o $@

kernel.image:$(OUT_EXE)
	@echo -------- Building HD Image---------
	cat $(OUT_DIR)/bootsect.bin $(OUT_DIR)/setup.bin $(OUT_DIR)/kernel.bin /dev/zero | dd status=none of=$(KERN_IMG) bs=512 count=512
	
init:
	mkdir -p $(OUT_DIR)

clean:
	rm -f $(OUT_EXE) $(OUT_OBJ) $(KERN_IMG)
