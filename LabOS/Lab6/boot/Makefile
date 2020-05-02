
bins     = bootsect.bin setup.bin

bindir  = ../../bin/boot

INCLUDE += -I../include


all: $(bins) 

$(bindir)/%.o:%.S
	$(CC) $(CFLAGS) $(INCLUDE) -c $< -o $@

bootsect.bin:$(bindir)/bootsect.o
	$(LD) --oformat binary -Ttext 0x0  $^ -o $(bindir)/$@

setup.bin:$(bindir)/setup.o
	$(LD) --oformat binary -Ttext 0x0  $^ -o $(bindir)/$@

clean:
	rm -f $(bindir)/*.o $(bindir)/*.bin 
