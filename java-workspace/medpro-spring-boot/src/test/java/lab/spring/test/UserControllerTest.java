package lab.spring.test;

import static org.junit.jupiter.api.Assertions.assertEquals;

import javax.annotation.PostConstruct;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import lab.spring.user.User;

public class UserControllerTest extends LabApplicationTests {

	@Autowired
	TestRestTemplate restTemplate;
	
	UriComponentsBuilder baseUrl;
	
	UriComponents uri;
	
	@PostConstruct
	public void init() {
		System.out.println("INIT...");
		
		baseUrl = UriComponentsBuilder.newInstance().
								scheme("http").host("localhost").port(super.serverPort).
								path("/api/user");
		
		this.uri = this.baseUrl.encode().build();
		
	}
	
	@Test
	public
	void testGetAllUsers()  {
		ResponseEntity<String> response = restTemplate.getForEntity(uri.getPath(), String.class);
		
		assertEquals(200, response.getStatusCodeValue());
		System.out.println("All Users: "+response.getBody());
		
	}
	
	@Test
	public
	void testCreateUser() {
		User user = new User();
		user.setUsername("ibda");
		user.setEmail("ibda@lop.com");
		user.setPassword("ta0123");
		
		HttpHeaders headers = new HttpHeaders();
		HttpEntity<User> request = new HttpEntity<User>(user, headers);
		
		ResponseEntity<String> response = restTemplate.postForEntity(uri.getPath(), request, String.class);
		
		assertEquals(200, response.getStatusCodeValue());
		System.out.println("Created User: "+response.getBody());
		
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
