package ma.dev.springboot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableAutoConfiguration
@EnableConfigurationProperties
@EntityScan(basePackages = {"ma.dev.springboot.product"}) 
public class RestApplication {
	
	public static void main(String[] args) {
		SpringApplication.run(RestApplication.class, args);
	}

}
