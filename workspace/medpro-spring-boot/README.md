### Url tests
 * http://localhost:8080/user   : All users
 * http://localhost:8080/user/2 : one user


### Spring boot with h2 database
**pom.xml**

~~~xml
        <dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-data-jpa</artifactId>
		</dependency>
		<dependency>
			<groupId>com.h2database</groupId>
			<artifactId>h2</artifactId>
			<scope>runtime</scope>
		</dependency>
~~~

**resources/application.properties**

~~~
spring.datasource.url=jdbc:h2:file:~/h2demo
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=h2admin
spring.datasource.password=walo
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
#for a volatile in memory database
#spring.datasource.url=jdbc:h2:mem:testdb

#turn off/on database schema creation
spring.jpa.hibernate.ddl-auto=none

# Enable H2 console: http://localhost:8080/h2-console
spring.h2.console.enabled=true
spring.h2.console.path=/h2-console
spring.h2.console.settings.trace=false
spring.h2.console.settings.web-allow-others=false
~~~

**resources/data.sql**

~~~sql
INSERT INTO user (id, username, email, password) VALUES
  (1, 'Aliko', 'aliko2@gm.com', 'pass123'),
  (2, 'Bill', 'bill3@gm.com', 'pass345'),
  (3, 'Folrunsho', 'runsho@gm.com', 'pass567');
~~~

**turn off/on database schema creation**

~~~
spring.jpa.hibernate.ddl-auto=none
~~~


