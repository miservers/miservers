package ma.dev.springboot.product;

import java.util.List;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/product")
public class ProductController {
	private final ProductRepository repository;
	
	public ProductController(ProductRepository repository) {
		this.repository = repository;
	}
	
	@GetMapping("/")
	List<Product> all() {
		System.out.println("ALL PRODUCTS");
		return repository.findAll();
	}
	
	@PostMapping("/add")
	Product add (@RequestBody Product product) {
		return repository.save(product);
	}
	
	
	
}
