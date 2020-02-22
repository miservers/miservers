##  Installating Nagios
### see Official QuickStart
https://assets.nagios.com/downloads/nagioscore/docs/nagioscore/4/en/quickstart.html

En résumé, you must
- On principal host,
-- install apache/php and dependancy packages
-- donwload and compile nagios core
- On monitored hosts, install NRPE and nagios plugins packages

## Configure Nagios
See :
  https://assets.nagios.com/downloads/nagioscore/docs/nagioscore/4/en/toc.html

En résumé to add a monitored hosts
- Edit **usr/local/nagios/etc/nagios.cfg** with 
  cfg_dir=/usr/local/nagios/etc/servers
- create config file /usr/local/nagios/etc/servers/myHost001.cfg
