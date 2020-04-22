
### Ading a card in Qemu

    qemu -net nic,model=e1000 ...

### Others emulated architectures

    $ qemu-system-<arch> -net nic,model=?
      Supported NIC models: ne2k_pci,i82551,i82557b,i82559er,rtl8139,e1000,pcnet,virtio,sungem

## Ethernet Cards
### 3Com 501
- created in 1988 by 3Com.
- among the first card supported by Linux

### Intel E1000
- it is available on a variety of emulators such as VirtualBox, Qemu
- 1Gb/b
- PCI

### NE2000
- Produced by Novell in 1988s.
- it is a 16-bit ISA card.
- Emulated by Qemu

### RTL8139C : Realtek Fast Ethernet 
- 10/100 Mbits/s. PCI 2.2. 
- Wake-on-LAN from PCI bus(magic packet). 
- Emulated by Qemu



## References
- cours de Patrick Cegielski.  http://lacl.univ-paris12.fr/cegielski/reseau.html
- https://en.wikipedia.org/wiki/QEMU#Emulated_hardware_platforms

