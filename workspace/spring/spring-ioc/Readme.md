## Ioc Container
Ioc container is represented by interfaces  **ApplicationContext** and **BeanFactory**.

## Configuration Metadata
### XML Configuration
XML is the traditional configartion

### Annotation-based Config
from String 2.5 : @Autowired, @Component, @Scope("singleton"), @Required.

To activate Annotation Config, add to **spring.xml**
~~~xml
<context:annotation-config />
~~

### Java Based Config   
Introduced in Spring 3.0: @Configuration, @Bean, @Import and @DependsOn annotations.

## Documentation

Spring Reference:

   https://docs.spring.io/spring-framework/docs/current/reference/html
  
Base article : 

   https://www.digitalocean.com/community/tutorials/spring-orm-example-jpa-hibernate-transaction

