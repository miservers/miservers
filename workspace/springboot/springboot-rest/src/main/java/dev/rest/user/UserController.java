package dev.rest.user;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/medpro/api/user")
public class UserController {
	private final UserRepository userRepository;
	
	UserController(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	@GetMapping("/list")
	List<User> all() {
		User user = new User();
		user.setUsername("bouy");
		user.setPassword("pass");
		
		List<User> users = new ArrayList<User>();
		users.add(user);
		return users;
	}
}

