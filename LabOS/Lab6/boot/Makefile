
bindir  = ../../bin/boot

bins     = $(addprefix $(bindir)/,bootsect.bin setup.bin)

INCLUDE += -I../include


all: $(bins) 

$(bindir)/%.o:%.S
	$(CC) $(CFLAGS) $(INCLUDE) -c $< -o $@

$(bindir)/bootsect.bin:$(bindir)/bootsect.o
	$(LD) --oformat binary -Ttext 0x0  $^ -o $@

$(bindir)/setup.bin:$(bindir)/setup.o
	$(LD) --oformat binary -Ttext 0x0  $^ -o $@

clean:
	rm -f $(bindir)/*.o $(bindir)/*.bin 
