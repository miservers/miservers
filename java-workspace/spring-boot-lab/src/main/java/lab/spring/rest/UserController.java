package lab.spring.rest;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lab.spring.jpa.User;
import lab.spring.jpa.UserDao;

@RestController
@RequestMapping(value="/user-management", produces = {MediaType.APPLICATION_JSON_VALUE})
public class UserController {

  
    @Autowired
    private UserDao userDao;

    @GetMapping("/users")
    public List<User> listUsers() {
        return userDao.findAll();
    }

    @GetMapping("/user")
    public User getUser(@RequestParam(value = "id") Long id) {
        return userDao.findById(id).get();
    }

    @GetMapping("/adduser")
    public ResponseEntity<?> addUser(@ModelAttribute("User") User user)  {
        System.out.println("New User: "+user);
        userDao.save(user);
        return ResponseEntity.ok("user added");
    }

    @GetMapping("/deleteUser")
    public ResponseEntity<?> deleteUser(@RequestParam(value = "id") Long id)  {
        userDao.deleteById(id);
        return  ResponseEntity.ok("user deleted");
    }

    public UserDao getUserDao() {
        return userDao;
    }

    public void setUserDao(UserDao userDao) {
        this.userDao = userDao;
    }
}