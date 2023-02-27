# Getting Started
Create the project skeleton using [Spring Initializr](https://start.spring.io)

Add depencencies:

- Web
- JPA
- H2
- Lombok


**@SpringBootApplication** is a meta-annotation that pulls in component scanning, autoconfiguration, and property support. 
	

# Tricks
Use  package *jakarta.persistence* instead of *javax.persistence* to avoid error *Not a managed Bean*. 

### H2 Console
To activate H2 console, add to **application.properties**

	spring.h2.console.enabled=true
	spring.h2.console.path=/h2-ui

Url to access h2 console: <http://localhost:8080/h2-ui>
	
### Start the app using maven

	mvn spring-boot:run
	 
### lombok
Under Eclipse, you need to setup lombok plugin for Eclipse.

### POST Requests
To handle Post Request, install **Boomerang - SOAP & REST Client** extension under Chrome

- URL : <http://localhost:8080/api/product/add>
- Type: POST
- JSON to be sent
~~~json
{"name":"realme",
"category":"mobile",
"price":1938}
~~~

# Reference Docs
- [Building REST services with Spring](https://spring.io/guides/tutorials/rest/)
