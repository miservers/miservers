
SRC_DIR := src
OBJ_DIR := build
BIN_DIR := bin

SRC := $(wildcard $(SRC_DIR)/*.cpp) 
OBJS:= $(SRC:$(SRC_DIR)/%.cpp=$(OBJ_DIR)/%.o) 

EXE := $(BIN_DIR)/jadi  # Java Disassembler and Interpreter

all:$(EXE)

.PHONY: all

INCLUDE= -I./include
#GCC_INCLUDE=-I/usr/lib/gcc/i686-redhat-linux/4.4.7/include
AS=as
LD=ld
CC=g++ 
CFLAGS=-Wall -g -std=c++11 $(INCLUDE) $(GCC_INCLUDE)
LDFLAGS=

$(OBJ_DIR)/%.o:$(SRC_DIR)/%.cpp
	$(CC) $(CFLAGS) -c $< -o $@


$(EXE):$(OBJS)
	$(CC) $(CCFLAGS) $^ -o $@
	@echo -e '\n************* END ********************'
	@echo -e '** Java Interpreter: $(EXE)'
	@echo -e '**************************************'
	
init:
	mkdir -p $(BIN_DIR) $(OBJ_DIR) 
	
clean:
	rm -f $(EXE) $(OBJS)
	
	
	