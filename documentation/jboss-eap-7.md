These notes are based on Jboss EAP 7.4 and Wildfly 23

**Table Of Contents**

### Jboss EAP, Wildfly and JBoss AS Versions

| JBoss EAP  | Wildfly | JBoss AS (Old)|
|------------|---------|---------------|
| 8.0 Beta   | 27      | -             |
| 7.4        | 23      | -             |
| 7.3        | 18      | -             |
| 7.0        | 10      | -             |
| 6.4        | -       | 7.5           |
| 6.0        | -       | 7.1           |
| 5.x        | -       | 5.y           |
| 4.x        | -       | 4.y           |



## Structure and Architecture
---------------------------------
- Directory and File Structure
- JBoss Modules
- Server Architecture and Configuration

## JBoss EAP Administration
----------------------------------
### Standalone Mode

### Domaine Mode

### Start/Stop
Start
>./standalone.sh -b 192.168.56.103 -bmanagement 192.168.56.103
 
Stop
> ./jboss-cli.sh --user=jbossadmin --password=Changeit2! 
                 --connect --controller=$HOST:9990  command=:shutdown

### Console, users	
User management
> ./add-user.sh

Console

 > http://HOST:9990/console

### JVM Tuning 
- JAVA Options : 
  - standalone in bin/standalone.conf
- Remote JMX with JConsole
  - $JBOSS_HOME/bin/jconsole.sh 
  - and use this url: *service:http:remote+jmx://localhost:9990*
  - this note did not work for me: https://developer.jboss.org/wiki/UsingJconsoleToConnectToJMXOnAS7
     
## Configuration
------------------------
### Standalone
- configuration/standalone.xml 
  - ports: http/8080, management/9990.
  - port-offset: default 0. for example, port-offset=100 gives http port 8180 et console 10090. 
- configuration/standalone-ha.xml: use this configuration to have clustering.
	
Run the standalone with a specefic config file
 >./standalone.sh -c standalone-ha.xml

###  Logging
Configured in **standalone.xml**. the file configuration/logging.properties is only used during JBoss startup. 


## CLI
-----------------------------
Intéractive mode
 > ./jboss-cli.sh -u=jboss -p=pass123  -c --controller=localhost:9990
 
non-interactive mode  
one command:
 > ./jboss-cli.sh -u=jboss -p=pass123  -c --controller=localhost:9990 --command=ls
 
multiple commands: comma separator
> ./jboss-cli.sh -u=jboss -p=pass123  -c --controller=localhost:9990 --commands="cd /core-service,ls"




