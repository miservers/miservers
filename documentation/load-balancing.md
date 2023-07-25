**Table Of Contents**
- [Load Balancing](#load-balancing)

## Load Balancing
---------------------------------
### HAProxy
Install HAProxy

	apt install haproxy

/etc/haproxy/haproxy.conf 
```	
	frontend myfrontend
        bind *:81
        mode tcp
        default_backend my_backend
        option tcplog

	backend my_backend
        balance roundrobin
        mode tcp
        server server1 192.168.56.101:80 check
        server server2 192.168.56.102:80 check
```	

Start HAProxy:

	sudo systemctl start haproxy.service 

Access To the Site: http://www.safar.com:81/

### Mod Proxy

### Mod JK

### HeartBeat


### NGINX

