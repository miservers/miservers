package lab.spring.user;

import java.util.List;
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

import lab.spring.exception.DataNotFoundException;

@RestController
@RequestMapping(value="/api/user", 
                produces = MediaType.APPLICATION_JSON_VALUE)
public 
class UserController {

  
    @Autowired
    private UserRepo userRepo;

    @GetMapping()
    public List<User> all() {
        return userRepo.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> one(@PathVariable Long id) {
        User user = userRepo.findById(id).
                                      orElseThrow(()-> new DataNotFoundException("no user found with id "+id)); 
        
        return ResponseEntity.ok().body(user);
    }

    @PostMapping() 
    public ResponseEntity<?> create(@RequestBody User user)  {
        User createdUser = userRepo.save(user);
        return ResponseEntity.ok().body(createdUser);
    }

    @PutMapping()
    public ResponseEntity<?> update(@RequestBody User user)  {
        userRepo.save(user);
        return ResponseEntity.ok("user updated");
    }

    @DeleteMapping("/{id}") 
    public ResponseEntity<?> delete(@PathVariable  Long id)  {
        userRepo.deleteById(id);
        return  ResponseEntity.ok("user deleted");
    }

    public UserRepo getUserRepo() {
        return userRepo;
    }

    public void setUserRepo(UserRepo userRepo) {
        this.userRepo = userRepo;
    }
}