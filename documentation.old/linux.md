## Linux Admin

Shortcuts:
```
  ctrl+]                  : Quit telnet
  ctrl+r                  : search in bach history
```
Commands:

| Command                                            | Description                               | 
| -------------------------------------------------- | ----------------------------------------- |
| dd if=/dev/zero of=disk.img bs=512 count=2000      | create a virtual disk of 1MB              |
| xxd -s 1024 -l 512 disk.img                        | read 512 bytes starting at 1024 byte      |
| sed -i 's/foo/bar/g' devices.h                     | replace in same file (-i option)          |
| find . -name "*.h" \| xargs sed -i 's/foo/bar/g';  |                                           |
| find . -name "*.h" -exec sed -i 's/foo/bar/g' {} \;|                                           |
| find . -type f -size +10000k -mtime +60            | files>10Mo, modif date>60 days            |
| grep -nr semaphore --include=*.c .                 |                                           |
| grep error \*\*/\*.log                             | search word in current and sub dirs       | 
| du -d 1 -m .                                       | maxdepth=1, practical                     |
| du -sh *                                           | disk usage grouped by directory           |
| du  -ak . \|sort -nr \| head -10                   | list of 10 biggest files                  |
| du -h / \| sort -hr \| head -n 10                  | list of 10 biggest Directories            |
| df -m                                              | FS disk usage                             |
| zmore                                              | more of a zipped file                     |
| dos2unix                                           | convert file from dos to unix format      |
| uptime                                             | Last boot                                 |
| mkdir -p roles/apache/{files,templates,tasks}      | create multiple sudir                     |
| tree roles                                         | tree of a directory                       |
| ls -lrt                                            | sort by time modif                        |
| ls -lrS                                            | sort by size                              |
| vimdiff fic1.txt fic2.txt                          |                                           |
| diff fic1.txt fic2.txt                             | 16c16(line first fic+c:change+second fic) |
| stat  test.txt                                     | date creation/modif of a file             |
| $?                                                 | Status de la derniere commande            |
| which cmd_alias                                    | command behind alias                      |
|cmd  2>/dev/null                                    | suppress error message in bash            |


**Max open file descriptors** 

    # lsof -u <username> | wc -l
    
	# su - <username>
    # ulimit -Hn
    
    # cat /etc/security/limits.conf
	tomcat            soft    nofile          65535
	tomcat            hard    nofile          65535
	tomcat            soft    nproc           65535
	tomcat            hard    nproc           65535

    # cat /etc/security/limits.d/90-nproc.conf
	*          soft    nproc     10000
	root       soft    nproc     unlimited

**Stress tests(ab)**  
Run 100000 requests, 100 ones at time:    

    ab -n 100000 -c 100 http://localhost:8080/
	

**Run command in backgroud**

    nohup command > /dev/null 2>&1 &
	nohup sh -c standalone.sh -c clustered.xml > /dev/null 2>&1 &

**Crontab**
> Cron search jobs in:  /var/spool/cron/crontabs, /etc/cron.d, /etc/crontab

For a user:

    crontab -u username -l

For root:

	crontab  -l

**Recover deleted file(currently used by a process)**
 
    nohup tail -c +0 -f /proc/8827/fd/120 > catalina.out&
	

**Genarate a random password**

    openssl rand -base64 32
	
	
	

## Hardware Infos

  lscpu : report CPU infos
  lshw  : report all hardwares
  lspci : all hardware connected to the PCI bus.


## Services
Liste of all enabled services(sysV, level 4)  
    $ ll /etc/rc4.d

Enable/Disable a service (System V)  
    $ update-rc.d mysql enable|disable
  
Enable will create a symlink in /etc/rc4.d/S02mysql -> ../init.d/mysql


## Perfoemances

### SAR

```sh
apt install sysstat
vi /etc/default/sysstat

Cron:  /etc/cron.d/sysstat
Logs :  /var/log/sa/

/etc/init.d/sysstat restart

sar -u   ; CPU
sar -b   ; disque IO
sar -r   ; memory
sar -W   ; swap
sar -d   ; IO par dique 
sar -A   ; All

sar -f /var/log/sa/sa15

```

### net-tools 
this package contains utilities like arp, ifconfig, netstat, rarp, nameif and route.


## SSH

- Install on CentOS
```
  # yum -y install openssh-server openssh-clients
  # service sshd start
  # vi /etc/sysconfig/iptables 
     -A RH-Firewall-1-INPUT -m state --state NEW -m tcp -p tcp --dport 22 -j ACCEPT
     If you want to restict access to 192.168.1.0/24:
     -A RH-Firewall-1-INPUT -s 192.168.1.0/24 -m state --state NEW -p tcp --dport 22 -j ACCEPT
  # service iptables restart
  # vi /etc/ssh/sshd_config 
  # service sshd restart
```

- SSH by root: Permission denied
```
  # edit /etc/ssh/sshd_config
  FROM:
  PermitRootLogin prohibit-password
  TO:
  PermitRootLogin yes
   
  # sudo sed -i 's/prohibit-password/yes/' /etc/ssh/sshd_config
  # sudo systemctl restart sshd
```

## VI

Remplace String:

   :%s/TOMCAT/JBOSS/g


Change Color:

    create file ~/.vimrc with content:
	  syntax on
	  colorscheme desert

Execute edited script from vi:

	:! ./% arg1 
	:! sh -x % arg1
	% Repalace the current open file
	
    :w !sh -x
	:w !bash

Execute a commande from vi

    :! ls -l

vi: Terminal too wide

	# stty columns 160

	
## Miscs

APT with Proxy

    vi /etc/apt/apt.conf.d/proxy
    Acquire::http::Proxy "http://proxy-ip:8080";


Enable Root to connect via ssh

    sed -i 's/prohibit-password/yes/' /etc/ssh/sshd_config


rm: cannot remove 'MQServer7': Operation not permitted

    chmod ugo+w -R MQServer7
    chattr -i -a  MQServer7
    lsattr -a  MQServer7   


## Refs

- IEEE std utilities : https://en.m.wikipedia.org/wiki/List_of_Unix_commands
- Bash tuto:
  https://linuxconfig.org/bash-scripting-tutorial  
- References Linux
  https://linuxconfig.org
  kernel.org
- Forum/Question
  http://stackoverflow.com
  
