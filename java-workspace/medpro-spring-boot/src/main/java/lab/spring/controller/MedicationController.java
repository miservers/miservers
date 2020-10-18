package lab.spring.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
import lab.spring.model.Medication;
import lab.spring.repository.MedicationRepository;

@RestController
@RequestMapping(value="/api/medications", 
				consumes = MediaType.APPLICATION_JSON_VALUE,
                produces = MediaType.APPLICATION_JSON_VALUE)
@CrossOrigin
public 
class MedicationController {

  
    @Autowired
    private MedicationRepository medicationRepository;

    @GetMapping()
    public ResponseEntity<List<Medication>>  all(@RequestParam Long pid,
											  @RequestParam(defaultValue = "id") String  sortBy,  
											  @RequestParam(defaultValue = "asc") String sortDirection) {
    	
    	
    	List<Medication> medications = medicationRepository.findByPid(pid);
    	   	
    	return ResponseEntity.ok().body(medications);
    }

    @GetMapping("/{pid}")
    public ResponseEntity<Medication> one(@PathVariable Long id) {
        Medication medication = medicationRepository.findById(id)
                             .orElseThrow(()-> new NotFoundException("no record with id "+id)); 
        return ResponseEntity.ok().body(medication);
    } 

    
    
    @PostMapping() 
    public ResponseEntity<?> create(@RequestBody Medication medication)  {
    	LocalDateTime now = LocalDateTime.now();
    	medication.setPrescribed(now);
        Medication result = medicationRepository.save(medication);
        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }

    @PutMapping()
    public ResponseEntity<?> update(@RequestBody Medication medication)  {
    	Medication result = medicationRepository.save(medication);
        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }

    /**
     * Delete an medication
     * @param id : medication id
     */
    @DeleteMapping("/{id}") 
    public ResponseEntity<?> delete(@PathVariable  Long id)  {
        medicationRepository.deleteById(id);
        return  ResponseEntity.ok().body(ServerMessage.build("record deleted"));
    }

}

























