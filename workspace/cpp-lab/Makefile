EXE=cast
SRC= $(wildcard *.cpp) 
OBJ= $(SRC:.cpp=.o)


OUT_DIR=./bin
OUT_OBJ=$(addprefix $(OUT_DIR)/, $(OBJ)) 

all:$(OUT_DIR)/$(EXE)

INCLUDE= -I./include
#GCC_INCLUDE=-I/usr/lib/gcc/i686-redhat-linux/4.4.7/include
CC=g++ 
CFLAGS=-Wall -g -std=c++11 $(INCLUDE) $(GCC_INCLUDE)

$(OUT_DIR)/%.o:%.cpp
	$(CC) $(CFLAGS) -c $< -o $@


$(OUT_DIR)/$(EXE):$(OUT_OBJ)
	$(CC) $(CCFLAGS) $^ -o $@
	
init:
	mkdir -p $(OUT_DIR)
	
clean:
	rm -f $(OUT_DIR)/$(EXE) $(OUT_OBJ)
	
	
	