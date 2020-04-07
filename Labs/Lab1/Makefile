# LAB-1 Makefile 2020

EXE     = bootsect.bin
SRC_DIR = .
SRC     = $(wildcard *.S)
OBJ     = $(SRC:.S=.o)

KERN_IMG = ../../bin/Lab1.img

OUT_DIR = ../../bin/Lab1/boot
OUT_EXE = $(addprefix $(OUT_DIR)/, $(EXE)) 
OUT_OBJ = $(addprefix $(OUT_DIR)/, bootsect.o )

LD       = i386-elf-ld
CC       = i386-elf-gcc
CFLAGS += -O0

all: kernel.imgage

$(OUT_DIR)/bootsect.o:$(SRC_DIR)/bootsect.S
	$(CC) $(CFLAGS) -c $< -o $@
	
$(OUT_DIR)/bootsect.bin:$(OUT_DIR)/bootsect.o
	$(LD) --oformat binary -Ttext 0x0  $^ -o $@


kernel.imgage: $(OUT_EXE)
	@echo -------- Building HD Image---------
	cat $(OUT_DIR)/bootsect.bin /dev/zero | dd status=none of=$(KERN_IMG) bs=512 count=240
	
init:
	mkdir -p $(OUT_DIR)

clean:
	rm -f $(OUT_EXE) $(OUT_OBJ) $(KERN_IMG)
