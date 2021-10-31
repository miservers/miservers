package lab.spring.controller;

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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lab.spring.exception.NotFoundException;
import lab.spring.exception.ServerMessage;
import lab.spring.model.Vaccine;
import lab.spring.repository.VaccineRepository;

@RestController
@RequestMapping(value="/api/vaccines", 
				consumes = MediaType.APPLICATION_JSON_VALUE,
                produces = MediaType.APPLICATION_JSON_VALUE)
@CrossOrigin
public 
class VaccineController {

  
    @Autowired
    private VaccineRepository vaccineRepository;

    @GetMapping()
    public ResponseEntity<List<Vaccine>>  all(@RequestParam Long pid,
											  @RequestParam(defaultValue = "id") String  sortBy,  
											  @RequestParam(defaultValue = "asc") String sortDirection) {
    	
    	
    	List<Vaccine> vaccines = vaccineRepository.findByPid(pid);
    	   	
    	return ResponseEntity.ok().body(vaccines);
    }

    @GetMapping("/{pid}")
    public ResponseEntity<Vaccine> one(@PathVariable Long id) {
        Vaccine vaccine = vaccineRepository.findById(id)
                             .orElseThrow(()-> new NotFoundException("no record found with id "+id)); 
        return ResponseEntity.ok().body(vaccine);
    }

    
    
    @PostMapping() 
    public ResponseEntity<?> create(@RequestBody Vaccine vaccine)  {
    	System.out.println("vaccine to create : "+vaccine);
        Vaccine result = vaccineRepository.save(vaccine);
        return ResponseEntity.ok().body(result);
    }

    @PutMapping()
    public ResponseEntity<?> update(@RequestBody Vaccine vaccine)  {
    	System.out.println("update :" + vaccine);
    	Vaccine result = vaccineRepository.save(vaccine);
        return ResponseEntity.ok().body(result);
    }

    /**
     * Delete an vaccine
     * @param id : vaccine id
     */
    @DeleteMapping("/{id}") 
    public ResponseEntity<?> delete(@PathVariable  Long id)  {
        vaccineRepository.deleteById(id);
        return  ResponseEntity.ok().body(ServerMessage.build("record deleted"));
    }

}

























