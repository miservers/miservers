

src     = $(wildcard *.c)
objs    = $(src:.c=.o)

bindir  = ../../bin/drivers

INCLUDE += -I../include


all: $(objs)

%.o:%.c
	$(CC) $(CFLAGS) $(INCLUDE) -c $< -o $(bindir)/$@

clean:
	rm -f $(bindir)/*.o
