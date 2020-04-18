# LAB-5 Makefile 2020

IMG     = vmlabos.iso
EXE     = bootsect.bin setup.bin kernel.bin 

SRC_DIR = .
SRC     = $(wildcard *.c)
OBJ     = head.o $(SRC:.c=.o) sys_call.o
OUT_DIR = ../../bin/LabOS
OUT_IMG = $(OUT_DIR)/$(IMG)
OUT_EXE = $(addprefix $(OUT_DIR)/, $(EXE)) 
OUT_OBJ = $(addprefix $(OUT_DIR)/, bootsect.o setup.o $(OBJ))

objs    = $(addprefix $(OUT_DIR)/, $(OBJ))

INCLUDE += -I./include
LD       = i386-elf-ld
CC       = i386-elf-gcc
OBJCOPY  = i386-elf-objcopy
CFLAGS += -g -O0 -Wall  -fno-builtin -nostdinc -fno-omit-frame-pointer  $(INCLUDE)

all: $(IMG)

$(OUT_DIR)/%.o:%.S
	$(CC) $(CFLAGS) -c $< -o $@

$(OUT_DIR)/%.o:%.c
	$(CC) $(CFLAGS) -c $< -o $@


$(OUT_DIR)/bootsect.bin:$(OUT_DIR)/bootsect.o
	$(LD) --oformat binary -Ttext 0x0  $^ -o $@

$(OUT_DIR)/setup.bin:$(OUT_DIR)/setup.o
	$(LD) --oformat binary -Ttext 0x0  $^ -o $@

$(OUT_DIR)/kernel.elf: $(objs)
	@echo Kernel linking: stage 1
	$(LD) -n -T linker.ld $^ -o $@
	$(OBJCOPY)  --only-keep-debug $@ $(OUT_DIR)/kernel-debug.sym
	$(OBJCOPY)  --strip-debug $@ $@
	
$(OUT_DIR)/kernel.bin:$(OUT_DIR)/kernel.elf
	@echo Kernel linking: stage 2
	$(OBJCOPY) -O binary $<  $@

$(IMG):$(OUT_EXE)
	@echo -------- Building HD Image---------
	cat $(OUT_EXE) /dev/zero | dd of=$(OUT_IMG) bs=512 count=512 status=none


init:
	mkdir -p $(OUT_DIR)

clean:
	rm -f $(OUT_EXE) $(OUT_OBJ) $(OUT_IMG) $(OUT_DIR)/kernel-debug.sym






