Install Bind
> sudo apt install bind9 dnsutils

Start/stop NameServer
> $ sudo /etc/init.d/bind9 restart

check zone  
> $ named-checkzone safarit.com db.safarit.com

Nslookup
> $ nslookup -debug -port=2053 ub1.safarit.com

Bind options  
/etc/bind/named.conf.options

Config zones  
/etc/bind/named.conf.local
