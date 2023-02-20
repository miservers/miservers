package ma.dev.springboot.rest;

import org.junit.jupiter.api.Test;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
@EntityScan("ma.dev.*")   
class RestApplicationTests {

	@Test
	void contextLoads() {
	}

}
