
Start/stop NAmeServer
> $ sudo /etc/init.d/bind9 restart

check zone  
> $ named-checkzone safarit.com db.safarit.com

Nslookup
> $ nslookup -debug -port=2053 ub1.safarit.com
