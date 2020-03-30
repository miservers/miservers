**DHCP** : Dynamic Host Configuration Protocol  
![DHCP handshake](images/DHCPHandshake.png)  
Client send a broadcast packet(DISCOVER) to request an IP. DHCP server propose(OFFER) an IP. Client confirm(Request) this IP. DHCP server send back an ACK, signaling that all is ok.


**Environment**  
Ubuntu 18.04, netplan removed, ifupdown installed

**DHCP server configuration**  

dhcp server interface must have **Static IP**
~~~
$ lshw -short 

$ nano /etc/network/interfaces
   source /etc/network/interfaces.d/*
   
   auto lo
   iface lo inet loopback

   auto enp0s3
   iface enp0s3 inet static
   address 192.168.2.4
   netmask 255.255.255.0
   gateway 192.168.2.4
   broadcst 192.168.2.255
   dns-nameservers 192.168.2.2 192.168.2.3
   dns-search lan
~~~

Restart Interface

    $ /etc/init.d/networking restart
    $ ifdown enp0s3
    $ ifup enp0s3
    
Check
 
    $ ifconfig
    
    

**Client Side configuration**  
Dynamic IP (DHCP)
~~~
auto eth0
iface eth0 inet dhcp
~~~





