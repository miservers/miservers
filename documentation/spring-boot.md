### RESTful with Jpa dependencies
 * spring-boot-starter-web
 * spring-boot-starter-data-jpa
 * spring-boot-starter-validation 

### Conventions
**Structure**

~~~
      +- lab
          |
          +- spring
               +- Application.java
               |
               +- user
                   +- User.java
                   +- UserController.java
                   +- UserRepo.java
               |
               +- product
                   +- Product.java
                   +- ProductController.java
                   +- ProductRepo.java
               
~~~

Application.java

~~~java
@SpringBootApplication
@ComponentScan
@EntityScan
@EnableJpaRepositories
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
...
~~~

**Scan** : if *Application.java* is not placed in the top, you must point out where to scan components

~~~java
@SpringBootApplication
@ComponentScan(basePackages = {"lab.spring.controller", "lab.spring.exception", })
@EntityScan("lab.spring.model")
@EnableJpaRepositories("lab.spring.repo")
public class Application {

	public static void main(String[] args) {
...
~~~


### Spring validation
pom.xml  

~~~xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-validation</artifactId>
</dependency>
~~~

For example  **@Email** annotation  throw exception if email is not valid.

~~~java
@Entity
public class User {

    @NotBlank          // validator
    String username;

    @Email(message = "email bad format")  //validator
    String email;

    ...
~~~



### Hot deployment/reload
Add this dependency to pom.xml

~~~ xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-devtools</artifactId>
    <optional>true</optional>
</dependency>
~~~

### Submit POST
2 ways. EITHER you use **application/json** request, in this case you get benefits from @RequestBody to map you model. OR use x-www-form... like below. In both case client must specify **Content-Type** in its header. 

~~~java   
    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE) 
    public ResponseEntity<?> create(@RequestBody User user)  {
        userDao.save(user);
        return ResponseEntity.ok("user created");
    }

    @PostMapping(value = "/creawithform", consumes = "application/x-www-form-urlencoded") 
    public ResponseEntity<?> create2(User user)  {
        userDao.save(user);
        return ResponseEntity.ok("user created");
    }
~~~


### Spring boot with H2 database
[spring-boot-h2-database](https://www.baeldung.com/spring-boot-h2-database)

### Logging with Lombok
 * **@Log4j2** – Creates the logger with following statement:

~~~java
private static final org.apache.logging.log4j.Logger log = 
    org.apache.logging.log4j.LogManager.getLogger(LogExample.class);
~~~

 * **@Slf4j** – Creates the logger with following statement:

~~~java
Creates private static final org.slf4j.Logger log = 
    org.slf4j.LoggerFactory.getLogger(LogExample.class);
~~~ 
Usage :

~~~java
@Slf4j
public class MyClass 
{
    public void myFunc() {
        log.info("Simple log statement with inputs {}, {} and {}", 1, 2, 3);
    }
}
~~~
**pom.xml**:

~~~xml
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
</dependency>
~~~

### Exception managmenent
Use **@ControllerAdvice** and **@ExceptionHandler**

Example: **spring-boot-lab**

### Junit of RestFul api
with **TestRestTemplate** 

**Annotations**: @RunWith, @SpringBootTest, @LocalServerPort, 

**Beans** : TestRestTemplate, UriComponentsBuilder, ResponseEntity, HttpEntity, HttpHeaders

Example:  **UserControllerTest.java** in **spring-boot-lab**

https://howtodoinjava.com/spring-boot2/testing/testresttemplate-post-example/

~~~java
@Test
public
void testGetAllUsers()  {
	ResponseEntity<String> response = restTemplate.getForEntity(uri.getPath(), String.class);
	
	assertEquals(200, response.getStatusCodeValue());
	System.out.println("All Users: " + response.getBody());
	
}
~~~
 
### References
 * https://howtodoinjava.com/spring-boot/


 



