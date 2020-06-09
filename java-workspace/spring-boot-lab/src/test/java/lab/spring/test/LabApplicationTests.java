package lab.spring.test;

import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import lab.spring.LabApplication;


@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes = LabApplication.class, webEnvironment = WebEnvironment.RANDOM_PORT)
abstract
class LabApplicationTests {
	
	@LocalServerPort
	protected
	int serverPort;


}
