package lab.spring.rest;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lab.spring.jpa.User;
import lab.spring.jpa.UserDao;

@RestController
@RequestMapping(value="/api/user", 
                produces = MediaType.APPLICATION_JSON_VALUE,
                consumes = MediaType.APPLICATION_JSON_VALUE)
public 
class UserController {

  
    @Autowired
    private UserDao userDao;

    @GetMapping()
    public List<User> all() {
        return userDao.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> one(@PathVariable Long id) {
        Optional<User> user = userDao.findById(id);
        if (!user.isPresent())
            return ResponseEntity.notFound().build();
        return ResponseEntity.ok().body(user.get());
    }

    @PostMapping() 
    public ResponseEntity<?> create(@RequestBody User user)  {
        userDao.save(user);
        return ResponseEntity.ok("user created");
    }

    @PutMapping()
    public ResponseEntity<?> update(@RequestBody User user)  {
        userDao.save(user);
        return ResponseEntity.ok("user updated");
    }

    @DeleteMapping("/{id}") 
    public ResponseEntity<?> delete(@PathVariable  Long id)  {
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