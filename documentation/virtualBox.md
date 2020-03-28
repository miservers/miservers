### Networking
1. NAT : Browse the Web from the Guest
2. Host-only networking: Access the Guest from the Host (and Other Guests). But not outside world.
  - Open VirtualBox, File>Preferences>NetWork, and add Host-only-Networks (vboxnet0)
  ```
    Disable DHCP
    Ipv4 address: 10.98.56.1
    Mask : 255.255.255.0
    Ipv6 address null, length 0
  ```
  - Open Settings of the VM, and set vboxnet0 network.
  - on Geust
  ```
  ifconfig -a   ; find the mounted nic device. 
  edit /etc/network/interfaces
     auto enp0s3
     iface enp0s3 inet static
       address 10.98.56.101
       netmask 255.255.255.0
       broadcast 10.98.56.256
       gateway 10.98.56.1
  sudo /etc/init.d/networking restart
  ```
- Internal networking: Guest communicate only with other guests.
- Bridged networking: the virtual machines can talk to each other and the host as if 
  they were connected through a physical Ethernet switch. the VM can directly communicate with the outside world.
- Host-only networking:  A virtual network interface (similar to a loopback interface) is created on the host, 
  providing connectivity among virtual machines and the host. 
  For example, one virtual machine may contain a web server and a second one a database, and since they 
  are intended to talk to each other, the appliance can instruct VirtualBox to set up a host-only 
  network for the two. 
  A second (bridged) network would then connect the web server to the outside world to serve data to, 
  but the outside world cannot connect to the database.

#### Shared folder
You must install VBox additions to use shared folders

shared folder permission denied
```
 sudo adduser your-user vboxsf
 sudo reboot now
```













