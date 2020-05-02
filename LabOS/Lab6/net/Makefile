

src     = $(wildcard *.c)
objs    = $(addprefix $(bindir)/,$(src:.c=.o))

bindir  = ../../bin/net

INCLUDE += -I../include


all: $(objs)

$(bindir)/%.o:%.c
	$(CC) $(CFLAGS) $(INCLUDE) -c $< -o $@

clean:
	rm -f $(bindir)/*.o
