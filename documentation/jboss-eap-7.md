These notes are based on Jboss EAP 7.4 and Wildfly 23

**Table Of Contents**
- [Jboss EAP, Wildfly and JBoss AS Versions](#jboss-eap-wildfly-and-jboss-as-versions)
- [Structure and Architecture](#structure-and-architecture)
- [JBoss EAP Administration]
- [Configuration](#configuration)
- [CLI](#cli)
- [Performance Tuning](#performance-tuning)
	- [JVM Tuning](#jvm-tuning)

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

Console:
> http://HOST:9990/console

### Users	
Add Management/Application Users

	./add-user.sh

Change Console Password: Enter the username you want to change the password
	
	./add-user.sh

     
## Configuration
------------------------
### Standalone
- configuration/standalone.xml 
  - ports: http/8080, management/9990.
  - port-offset: default 0. for example, port-offset=100 gives http port 8180 et console 10090. 
- configuration/standalone-ha.xml: use this configuration to have clustering.
	
Run the standalone with a specefic config file
 >./standalone.sh -c standalone-ha.xml

### Modules
Add a Module with CLI

	./jboss-cli.sh --controller=centos1:9990 --connect

	module add --name=org.postgresql --resources=/root/postgresql-42.6.0.jar --dependencies=javax.api,javax.transaction.api

Remove a Module

	module remove --name=org.postgresql

### Driver JDBC
Add a JDBC Driver as a Module(Recommended) using CLI:

	 	module add --name=org.postgresql --resources=/root/postgresql-42.6.0.jar --dependencies=javax.api,javax.transaction.api

		 /subsystem=datasources/jdbc-driver=postgres:add(driver-name=postgres, driver-module-name=org.postgresql, driver-class-name=org.postgresql.Driver)


### Data Sources	 
Using Console, Easy. You can Test It!

Using CLI

	data-source add --name=PostgresDS --jndi-name=java:/PostgresDS --driver-name=postgres --connection-url=jdbc:postgresql://localhost:5432/postgresdb --user-name=admin --password=admin

	reload

Test a DataSource

	/subsystem=datasources/data-source=PostgresDS:test-connection-in-pool

Remove a Data source

	data-source remove --name=PostgresDS

	reload

###  Logging
Configured in **standalone.xml**. the file configuration/logging.properties is only used during JBoss startup. 

		/subsystem=datasources/jdbc-driver=h2_2.2:add(driver-name="h2_2.2", driver-module-name="h2_2.2", driver-class-name=org.h2.Driver)


## CLI
---------------------
Intéractive mode
 > ./jboss-cli.sh -u=jboss -p=pass123  -c --controller=localhost:9990
 
non-interactive mode  
one command:
 > ./jboss-cli.sh -u=jboss -p=pass123  -c --controller=localhost:9990 --command=ls
 
multiple commands: comma separator
> ./jboss-cli.sh -u=jboss -p=pass123  -c --controller=localhost:9990 --commands="cd /core-service,ls"

## Performance Tuning
-----------------------
### JVM Tuning 
Standalone : standalone.conf

	 JAVA_OPTS="-Xms1024m -Xmx1024m -XX:MetaspaceSize=96M -XX:MaxMetaspaceSize=256m

Domain: TODO


### JConsole
/!\ Don't use JDK Jconsole, use EAP_HOME/bin/jconsole.sh

Standalone:

1. Enable JMX Remoting connector:

	> Console : Configuration ⇒ Subsystems/Subsystem ⇒ JMX  ⇒  remoting-connector: jmx

2. EAP_HOME/bin/jconsole.sh
	> service:jmx:http-remoting-jmx://192.168.56.103:9990


### VisualVM