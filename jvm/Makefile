
SRC_DIR := src
OBJ_DIR := build
BIN_DIR := bin

SRC := $(wildcard $(SRC_DIR)/*.cpp) 
OBJS:= $(SRC:$(SRC_DIR)/%.cpp=$(OBJ_DIR)/%.o) 

EXE := $(BIN_DIR)/jindi  # Java Interpreter and Disassembler 

all:$(EXE)

.PHONY: all

LIBS = -lpaho-mqtt3c
INCLUDE= -I./include
CC=g++ 
CCFLAGS=-Wall -std=c++17 $(INCLUDE) 
DEBUGFLAGS=-g 


$(OBJ_DIR)/%.o:$(SRC_DIR)/%.cpp
	$(CC) $(CCFLAGS) $(DEBUGFLAGS) -c $< -o $@


$(EXE):$(OBJS)
	$(CC) $(CCFLAGS) $(DEBUGFLAGS) $^ -o $@
	@echo -e '\n************* END ********************'
	@echo -e '** Java Interpreter: $(EXE)'
	@echo -e '**************************************'
	
init:
	mkdir -p $(BIN_DIR) $(OBJ_DIR) 
	
clean:
	rm -f $(EXE) $(OBJS)
	
	
	