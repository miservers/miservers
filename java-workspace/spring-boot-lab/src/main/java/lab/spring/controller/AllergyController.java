package lab.spring.controller;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lab.spring.exception.DataNotFoundException;
import lab.spring.model.Allergy;
import lab.spring.repository.AllergyRepository;

@RestController
@RequestMapping(value="/api/allergies", 
				consumes = MediaType.APPLICATION_JSON_VALUE,
                produces = MediaType.APPLICATION_JSON_VALUE)
@CrossOrigin
public 
class AllergyController {

  
    @Autowired
    private AllergyRepository allergyRepository;

    @GetMapping()
    public ResponseEntity<List<Allergy>>  all(@RequestParam Integer pid,
											  @RequestParam(defaultValue = "id") String  sortBy,  
											  @RequestParam(defaultValue = "asc") String sortDirection) {
    	
    	
    	List<Allergy> allergies = allergyRepository.findAll();
    	   	
    	return ResponseEntity.ok().body(allergies);
    }

    @GetMapping("/{pid}")
    public ResponseEntity<Allergy> one(@PathVariable Long id) {
        Allergy allergy = allergyRepository.findById(id)
                             .orElseThrow(()-> new DataNotFoundException("no record found with id "+id)); 
        return ResponseEntity.ok().body(allergy);
    }

    
    
    @PostMapping() 
    public ResponseEntity<?> create(@RequestBody Allergy allergy)  {
    	System.out.println("allergy to create : "+allergy);
    	LocalDateTime now = LocalDateTime.now();
    	allergy.setCreationDate(now);
        Allergy result = allergyRepository.save(allergy);
        return ResponseEntity.ok().body(result);
    }

    @PutMapping()
    public ResponseEntity<?> update(@ModelAttribute Allergy allergy)  {
        allergyRepository.save(allergy);
        return ResponseEntity.ok("allergy updated");
    }

    /**
     * Delete an allergy
     * @param id : allergy id
     */
    @DeleteMapping("/{id}") 
    public ResponseEntity<?> delete(@PathVariable  Long id)  {
        allergyRepository.deleteById(id);
        return  ResponseEntity.ok().body("allergy deleted");
    }

}

























