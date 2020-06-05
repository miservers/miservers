package lab.spring.rest;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @GetMapping("/users")
    public User listUsers() {
        User user1 = new User("haki", "haki@lop.com");
        return user1;
    }

    @GetMapping("/user")
    public User getUser(@RequestParam(value = "id") String id) {
        User user = new User("haki", "haki@lop.com");
        return user;
    }
}