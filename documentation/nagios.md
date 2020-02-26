##  Installating Nagios
OS: Ubuntu 18.04

Good doc: https://tecadmin.net/monitor-remote-linux-host-using-nagios/

### see Official QuickStart
https://assets.nagios.com/downloads/nagioscore/docs/nagioscore/4/en/quickstart.html

En résumé, you must
- On Nagios server,
  - install apache/php and dependancy packages
  - donwload and compile nagios core
  - Install this package
    > sudo apt install nagios-nrpe-plugin
- On monitored hosts, install NRPE and nagios plugins packages
  > sudo apt install nagios-nrpe-server nagios-plugins 

## Configure Nagios
See :
  https://assets.nagios.com/downloads/nagioscore/docs/nagioscore/4/en/toc.html

En résumé, to add a monitored host
- Edit **/usr/local/nagios/etc/nagios.cfg** with 

  > cfg_dir=/usr/local/nagios/etc/servers
  
- create config file **/usr/local/nagios/etc/servers/myHost001.cfg**

### How to monitor a Linux host
See: https://tecadmin.net/monitor-remote-linux-host-using-nagios/

#### Monitor a linux host
1. on monitored host
- Add nagios server to allowed hosts
  > nano /etc/nagios/nrpe.cfg
  > allowed_hosts=127.0.0.1, 192.168.43.80

2. on Nagios Server
- test nrpe connectivity
  > $ /usr/lib/nagios/plugins/check_nrpe -H 192.168.43.1
- Edit file **/usr/local/nagios/etc/nagios. cfg**
  > cfg_dir=/usr/local/nagios/etc/servers








