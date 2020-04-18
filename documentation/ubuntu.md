## Tools

**Sublime Text**
   - MarkDown Preview: https://facelessuser.github.io/MarkdownPreview/    
     Alt-m : to preview
   - Open a file quickly : **Ctrl-p**

**Terminology** : very good terminal emulator, with split.

**vnstat** : to monitor network usage   
     
     vnstat -i wlp3s0

**Shutter**:  screen capture

**LibreOffice Draw** : excellent to draw diagrams.


## Installation and configuration of ubuntu 16.04

Create a bootable USB from windows
    
    Use "rawrite32" to .

Upgrade
    
    sudo apt update & apt upgrade

Firewall: NetFilter/iptables

    sudo iptables -L 

Runlevel

    $ systemctl get-default
       graphical.target
    $ systemctl list-units --type=target
    $ systemctl set-default multi-user.target  : is runlevel3


Desktop

    package: gnome-shell


Activate root

    sudo passwd root
    ; To disable root
    sudo passwd -d root 


Disable ipv6

    # add to /etc/sysctl.conf
    net.ipv6.conf.all.disable_ipv6 = 1
    net.ipv6.conf.default.disable_ipv6 = 1
    net.ipv6.conf.lo.disable_ipv6 = 1

Create an icon in Dash panel

    ; create file ~/.local/share/applications/android-studio.desktop
    [Desktop Entry]
    Name=the name you want shown
    Comment=
    Exec=/opt/android-studio/bin/studio.sh
    Icon=icon name
    Terminal=false
    Type=Application
    StartupNotify=true

compiz: high cpu

    apt install compizconfig-settings-manager
	On OpenGL, uncheck the option "Sync to VBlank"

## Services 
Three tools: systemd, upstart, SystemV

- Systemd: replaces upstart and systemV(old)
```
   - List services started on boot
     systemd-analyze blame
   - Disable/Enable a service
     systemctl disable|enable <Nom_du_service>.service
   - start/stop a service 
     systemctl stop|start <Nom_du_service>.service
```

- SystemV
```
  - Scripts in: /etc/init.d/
  - stop/start
    service start apache2
```
  
## Apache PHP MySQL
Installation
```
  sudo apt-get install apache2 php mysql-server
```
- securing Apache
  http://xianshield.org/guides/apache2.0guide.html


## Packages
- Terminator : the best terminal 
- Konsole: mieux que Gnome Terminal






Remove netplan on ubuntu 18.04
============================================
On ubuntu 18.04, **ifconfig** is deprecated and replaced by **netplan**. file **/etc/network/interfaces** is no longer used. instead **/etc/netplan/xyz.yml** is used.

https://www.allerstorfer.at/remove-netplan-on-ubuntu-18-04/

Update grub, uninstall netplan, install ifupdown
~~~
$ nano /etc/default/grub
    GRUB_CMDLINE_LINUX="netcfg/do_not_use_netplan=true"

$ update-grub

$ apt purge netplan.io
$ rm -rf /usr/share/netplan
$ rm -rf /etc/netplan

$ apt install ifupdown
~~~

To configure interface, edit file **/etc/network/interfaces**  

The loopback network interface
~~~
$ nano /etc/network/interfaces
   source /etc/network/interfaces.d/*
   
   auto lo
   iface lo inet loopback
~~~

Dynamic IP (DHCP)
~~~
auto eth0
iface eth0 inet dhcp
~~~

Static IP
~~~
auto eth0
iface eth0 inet static
address 192.168.0.10
netmask 255.255.255.0
gateway 192.168.0.1
broadcst 192.168.0.255
dns-nameservers 192.168.0.2 192.168.0.3
dns-search lan
~~~













