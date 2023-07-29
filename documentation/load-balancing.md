**Table Of Contents**
- [Load Balancing](#load-balancing)
- [HAProxy](#haproxy)
- [NGINX](#nginx)

### Load Balancing


### HAProxy
Install HAProxy

	apt install haproxy

/etc/haproxy/haproxy.conf 
```	
	frontend myfrontend
        bind *:80
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

### NGINX
Object: use Nginx as a reverse proxy in front of Tomcat

1. Install nginx

		apt install nginx

2. Get the conf template : tomcat-basic.conf

		cd /etc/nginx/conf.d
		curl https://www.nginx.com/resource/conf/tomcat-basic.conf > tomcat-basic.conf

3. Edit tomcat-basic.conf:

	```	
	upstream tomcat {
	    # Use IP Hash for session persistence
	    ip_hash;

	    # List of Tomcat application servers
	    server 192.168.56.101:8080;
	    server ub2:8080;
	}

	server {
	    listen 80;
	    server_name www.safar.com;

	    # Redirect all HTTP requests to HTTPS
	    location / {
	        return 301 https://$server_name$request_uri;
	    }
	}
	 
	server {
	    listen 443 ssl http2;
	    server_name www.safar.com;

	    ssl_certificate     /etc/nginx/ssl/my-certificate.pem;
	    ssl_certificate_key /etc/nginx/ssl/my-privatekey.pem;

	    ssl_session_cache   shared:SSL:1m;
	    ssl_prefer_server_ciphers on;

	    # Load balance requests for /examples/ across Tomcat application servers
	    location /examples/ {
	        proxy_pass http://tomcat;
	        proxy_cache backcache;
	    }

	    # Return a temporary redirect to the /examples/ directory 
	    # when user requests '/'
	    location = / {
	        return 302 /examples/;
	    }
	}
	```

3. Generate a self signed certificate under /etc/nginx/ssl
	
		openssl req -newkey rsa:4096  -x509  -sha512  -days 365 -nodes -out my-certificate.pem -keyout my-privatekey.pem

4. Start Nginx

		systemctl restart nginx

5. Test https://www.safar.com/ 


### Mod Proxy

### Mod JK

### HeartBeat



