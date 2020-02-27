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
  https://tecadmin.net/monitor-remote-linux-host-using-nagios
  
### How to monitor a Linux host
1. on monitored host(Ubuntu 18.04)
- Add nagios server to allowed hosts
  > nano /etc/nagios/nrpe.cfg
  >
  > allowed_hosts=127.0.0.1, 192.168.43.80
- Restart nrpe server
  > sudo /etc/init.d/nagios-nrpe-server restart
  
2. on Nagios Server
- test nrpe connectivity
  > $ /usr/lib/nagios/plugins/check_nrpe -H 192.168.43.1
- Edit file **/usr/local/nagios/etc/nagios. cfg**
  > cfg_dir=/usr/local/nagios/etc/servers
- create config file to monitor the host
  > nano /usr/local/nagios/etc/servers/redmi-ubuntu.cfg
  >
  ```
  define host {                                                                             
        use linux-server                                                                  
        host_name redmi-ubuntu                                                            
        address 192.168.43.1                                                              
        register 1                                                                        
  }        
  
  define service{                                                                           
      host_name redmi-ubuntu                                                              
      service_description PING                                                            
      check_command check_ping!100,20%!500,60%                                        
      max_check_attempts 2                                                                
      check_interval 2                                                                    
      retry_interval 2                                                                    
      check_period 24x7                                                                   
      check_freshness 1                                                                   
      contact_groups admins                                                               
      notification_interval 2                                                             
      notification_period 24x7                                                            
      notifications_enabled 1                                                             
      register 1                                                                          
  }
  ```
- restart nagios
  > sudo service nagios restart
- verify on nagios console
  http://localhost:8000/nagios/





