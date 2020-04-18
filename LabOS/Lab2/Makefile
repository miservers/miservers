# LAB-2 Makefile 2020

IMG     = vmlabos.img
EXE     = bootsect.bin setup.bin

SRC_DIR = .
SRC     = $(wildcard *.S)
OBJ     = $(SRC:.S=.o)
OUT_DIR = ../../bin/Lab2
OUT_IMG = $(OUT_DIR)/$(IMG)
OUT_EXE = $(addprefix $(OUT_DIR)/, $(EXE)) 
OUT_OBJ = $(addprefix $(OUT_DIR)/, bootsect.o setup.o )

LD       = i386-elf-ld
CC       = i386-elf-gcc
CFLAGS += -O0

all: $(IMG)

$(OUT_DIR)/bootsect.o:$(SRC_DIR)/bootsect.S
	$(CC) $(CFLAGS) -c $< -o $@
	
$(OUT_DIR)/setup.o:$(SRC_DIR)/setup.S
	$(CC) $(CFLAGS) -c $< -o $@


$(OUT_DIR)/bootsect.bin:$(OUT_DIR)/bootsect.o
	$(LD) --oformat binary -Ttext 0x0  $^ -o $@

$(OUT_DIR)/setup.bin:$(OUT_DIR)/setup.o
	$(LD) --oformat binary -Ttext 0x0  $^ -o $@

$(IMG): $(OUT_EXE)
	@echo -------- Building HD Image---------
	cat $(OUT_DIR)/bootsect.bin $(OUT_DIR)/setup.bin /dev/zero | dd status=none of=$(OUT_IMG) bs=512 count=512
	
init:
	mkdir -p $(OUT_DIR)

clean:
	rm -f $(OUT_EXE) $(OUT_OBJ) $(OUT_IMG)
