

src     = $(wildcard *.c)
objs    = $(src:.c=.o)

bindir  = ../../bin/net

INCLUDE += -I../include


all: $(objs)

%.o:%.c
	$(CC) $(CFLAGS) $(INCLUDE) -c $< -o $(bindir)/$@

clean:
	rm -f $(bindir)/*.o
