package ma.dev.springboot.rest;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProductController {
	private final ProductRepository repository;
	
	public ProductController(ProductRepository repository) {
		this.repository = repository;
	}
	
	@GetMapping("/products")
	List<Product> all() {
		return repository.findAll();
	}
	
	@PostMapping("/products/add")
	Product add (@RequestBody Product product) {
		return repository.save(product);
	}
	
	
	
}
