### Maven : project structure creation

    mvn archetype:generate -DgroupId=org.mvc -DartifactId=spring-mvc-xml \
                           -DarchetypeGroupId=org.apache.maven.archetypes \
                           -DarchetypeArtifactId=maven-archetype-webapp -DarchetypeVersion=1.4 \
                           -DinteractiveMode=false


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
           
           <Valve className="org.apache.catalina.valves.AccessLogValve" directory="logs"
               prefix="localhost-dev_access_log" suffix=".txt"
               pattern="%h %l %u %t &quot;%r&quot; %s %b" />
</Host>
~~~

add to /etc/hosts

    127.0.0.1   localhost-dev


### Spring MVC
![](../../images/java/spring-mvc.png)
