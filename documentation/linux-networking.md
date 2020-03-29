Networking
=================
Ubuntu 

### ifconfig
    # ifconfig     ; list actif interfaces
    # ifconfig -a  ; list active and inactive interfaces

    # ifconfig eth0 up  ; Enable an interface. down to disable it.

### Routing Table
Routing table explained: https://geek-university.com/ccna/routing-table-explained

    # route -n
    Kernel IP routing table
    Destination     Gateway         Genmask         Flags Metric Ref    Use Iface
    0.0.0.0         10.98.56.1      0.0.0.0         UG    100    0        0 enp0s3
    170.56.2.0      10.2.0.1        255.255.255.0   U     100    0        0 enp0s3
    168.254.0.0     0.0.0.0         255.255.0.0     U     1000   0        0 enp0s8

Send to "10.2.0.1"(Gateway) all packets that are destinated to the network 170.56.2.0(from 170.56.2.0 to 
170.56.2.254) by passing by interface enp0s3.

**Default route**: dest=0.0.0.0 and mask=0.0.0.0. route for all packets that don't have a specified route 
in routing table. We use the default route for Internet.

Delete a route:

    # route del default

Add default route

    # route add default gw 10.98.56.1 dev enp0s3


Open connections
	
	netstat -np | grep 8080
	lsof -nPp 2552257 | grep 8080     ; -P : for numerique ports 

	
### TCPDUMP & Wireshark

	tcpdump -v -A -s 0  port 8080 and host 192.168.1.1  -w capt.log   
	
	use Wireshark to read capt.log
	 
	 

Remove netplan on ubuntu 18.04
============================================
On ubuntu 18.04, **ifconfig** is deprecated and replaced by **netplan**. file **/etc/network/interfaces** is no longer used. instead **/etc/netplan/xyz.yml** is used.

https://www.allerstorfer.at/remove-netplan-on-ubuntu-18-04/


nano /etc/default/grub
GRUB_CMDLINE_LINUX="netcfg/do_not_use_netplan=true"

update-grub

apt purge netplan.io
rm -rf /usr/share/netplan
rm -rf /etc/netplan

apt install ifupdown

nano /etc/network/interfaces
source /etc/network/interfaces.d/*

# The loopback network interface
auto lo
iface lo inet loopback


Dynamic IP (DHCP)

# The primary network interface
auto eth0
iface eth0 inet dhcp

Static IP

# The primary network interface
auto eth0
iface eth0 inet static
address 192.168.0.10
netmask 255.255.255.0
gateway 192.168.0.1
broadcst 192.168.0.255
dns-nameservers 192.168.0.2 192.168.0.3
dns-search lan














