SRC= $(wildcard *.cpp) 

BIN_DIR=./bin
BIN=$(addprefix $(BIN_DIR)/, $(SRC:.cpp=)) 

all:$(BIN)

INCLUDE= -I./include
CC=g++ 
CCFLAGS=-Wall -g -std=c++14 $(INCLUDE) 


$(BIN_DIR)/%:%.cpp
	$(CC) $(CCFLAGS) $^ -o $@
	
init:
	mkdir -p $(BIN_DIR)
	
clean:
	rm -f  $(BIN)
	
	
	