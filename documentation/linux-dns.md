Bind is used on the most majority of name servers existing in the world(root dns servers included).

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

NOTA BENE
FQDN must end with a dot, "ns1.safarit.com." , mandatory on the dns server side, implied on the client side.
