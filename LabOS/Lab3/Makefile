# LAB-3 Makefile 2020

IMG     = vmlabos.img
EXE     = bootsect.bin setup.bin head.bin

SRC_DIR = .
SRC     = $(wildcard *.S)
OBJ     = $(SRC:.S=.o)
OUT_DIR = ../../bin/Lab3
OUT_IMG = $(OUT_DIR)/$(IMG)
OUT_EXE = $(addprefix $(OUT_DIR)/, $(EXE)) 
OUT_OBJ = $(addprefix $(OUT_DIR)/, $(OBJ))


INCLUDE += -I./
LD       = i386-elf-ld
CC       = i386-elf-gcc
CFLAGS += -O0 -Wall -fno-builtin -nostdinc -fno-omit-frame-pointer  $(INCLUDE)

all: $(IMG)

$(OUT_DIR)/%.o:%.S
	$(CC) $(CFLAGS) -c $< -o $@

$(OUT_DIR)/bootsect.bin:$(OUT_DIR)/bootsect.o
	$(LD) --oformat binary -Ttext 0x0  $^ -o $@

$(OUT_DIR)/setup.bin:$(OUT_DIR)/setup.o
	$(LD) --oformat binary -Ttext 0x0  $^ -o $@

$(OUT_DIR)/head.bin:$(OUT_DIR)/head.o
	$(LD) --oformat binary -Ttext 0x2000  $^ -o $@

$(IMG): $(OUT_EXE)
	@echo -------- Building HD Image---------
	cat $(OUT_DIR)/bootsect.bin $(OUT_DIR)/setup.bin $(OUT_DIR)/head.bin  /dev/zero | dd status=none of=$(OUT_IMG) bs=512 count=512
	
init:
	mkdir -p $(OUT_DIR)

clean:
	rm -f $(OUT_EXE) $(OUT_OBJ) $(OUT_IMG)


