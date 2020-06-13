package lab.spring.product;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
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
@RequestMapping(value="/api/product", 
                produces = MediaType.APPLICATION_JSON_VALUE)
@CrossOrigin
public 
class ProductController {

  
    @Autowired
    private ProductRepo productRepo;

    @GetMapping()
    public List<Product> all() {
        return productRepo.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> one(@PathVariable Long id) {
        Product product = productRepo.findById(id).
                                   orElseThrow(()-> new DataNotFoundException("no product found with id "+id)); 
        
        return ResponseEntity.ok().body(product);
    }

    @PostMapping() 
    public ResponseEntity<?> create(@RequestBody Product product)  {
        Product created = productRepo.save(product);
        return ResponseEntity.ok().body(created);
    }

    @PutMapping()
    public ResponseEntity<?> update(@RequestBody Product product)  {
        productRepo.save(product);
        return ResponseEntity.ok("product updated");
    }

    @DeleteMapping("/{id}") 
    public ResponseEntity<?> delete(@PathVariable  Long id)  {
        productRepo.deleteById(id);
        return  ResponseEntity.ok("product deleted");
    }
}