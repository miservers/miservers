### Maven : project structure creation

    mvn archetype:generate -DgroupId=org.mvc -DartifactId=spring-mvc-xml \
                           -DarchetypeGroupId=org.apache.maven.archetypes \
                           -DarchetypeArtifactId=maven-archetype-webapp \
                           -DarchetypeVersion=1.4 -DinteractiveMode=false


### Deployment on Tomcat, by war copy
**war:war** is the default goal invoked during the **package** phase  

    mvn package
    
Add maven-war-plugin to pom.xml.  

~~~
  <plugin>
      <artifactId>maven-war-plugin</artifactId>
      <version>3.2.2</version>
      <configuration>
          <outputDirectory>/opt/tomcat-9/webapps</outputDirectory>
      </configuration>
  </plugin>
~~~


### Hot deployment on tomcat 
add to server.xml  

~~~
<Host name="localhost-dev"  appBase="/path/to/java/spring-mvc-xml/target"
            unpackWARs="true" autoDeploy="true">
           ....
</Host>
~~~

add to /etc/hosts

    127.0.0.1   localhost-dev


### Spring MVC
![](../../images/java/spring-mvc.png)


### Install mySQL 
    install mysql-server
    install mysql-workbench


### Start mySQL      
    sudo systemctl start mysql

### Connect to MySQL console.    
    sudo mysql 


### create data base
    create DATABASE testdb CHARACTER SET 'utf8';
    
### create a user
    CREATE USER 'myuser1'@'localhost' IDENTIFIED BY 'pass123';
    GRANT ALL PRIVILEGES ON testdb.* TO 'myuser1'@'localhost';
    FLUSH PRIVILEGES;



