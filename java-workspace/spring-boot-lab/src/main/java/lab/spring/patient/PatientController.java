package lab.spring.patient;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import ch.qos.logback.core.status.Status;
import lab.spring.exception.DataNotFoundException;

@RestController
@RequestMapping(value="/api/patient", 
                produces = MediaType.APPLICATION_JSON_VALUE)
@CrossOrigin
public 
class PatientController {

  
    @Autowired
    private PatientRepo patientRepo;

    @GetMapping()
    public ResponseEntity<Map<String, Object>>  all(@RequestParam Integer pageNo,
    												@RequestParam Integer pageSize,
    												@RequestParam(defaultValue = "id") String  sortBy,  
    												@RequestParam(defaultValue = "asc") String sortDirection,
    												@RequestParam(defaultValue = "", required = false ) String search ) {
    	
    	Sort.Direction direction = sortDirection.equals("asc")?Sort.Direction.ASC:Sort.Direction.DESC;
    	Pageable pageable = PageRequest.of(pageNo, pageSize, Sort.by(direction ,sortBy));
    	
    	Page<Patient> pageableResult = patientRepo.findAll(pageable);
    	
    	Map<String, Object> response = new HashMap<String, Object>();
    	response.put("currentPage", pageableResult.getNumber());
    	response.put("totalPatients", pageableResult.getTotalElements());
    	response.put("totalPages", pageableResult.getTotalPages());
    	response.put("patients", pageableResult.getContent());

    	return ResponseEntity.ok().body(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Patient> one(@PathVariable Long id) {
        Patient patient = patientRepo.findById(id).
                                      orElseThrow(()-> new DataNotFoundException("no record found with id "+id)); 
        
        return ResponseEntity.ok().body(patient);
    }

    @GetMapping("/serach")
    public ResponseEntity<Map<String, Object>>  search(@RequestParam Integer pageNo,
    												   @RequestParam Integer pageSize,
    											       @RequestParam(defaultValue = "id") String  sortBy,  
    												   @RequestParam(defaultValue = "asc") String sortDirection,
    												   @RequestParam(defaultValue = "", required = false ) String criteria ) {
    	
    	Sort.Direction direction = sortDirection.equals("asc")?Sort.Direction.ASC:Sort.Direction.DESC;
    	Pageable pageable = PageRequest.of(pageNo, pageSize, Sort.by(direction ,sortBy));
    	
    	Page<Patient> pageableResult = patientRepo.search(criteria, pageable);
    	
    	Map<String, Object> response = new HashMap<String, Object>();
    	response.put("currentPage", pageableResult.getNumber());
    	response.put("totalPatients", pageableResult.getTotalElements());
    	response.put("totalPages", pageableResult.getTotalPages());
    	response.put("patients", pageableResult.getContent());

    	return ResponseEntity.ok().body(response);
    }

    
    @PostMapping() 
    public ResponseEntity<?> create(@ModelAttribute Patient patient)  {
    	System.out.println("patient to create : "+patient);
        Patient createdUser = patientRepo.save(patient);
        return ResponseEntity.ok().body(createdUser);
    }

    @PutMapping()
    public ResponseEntity<?> update(@ModelAttribute Patient patient)  {
        patientRepo.save(patient);
        return ResponseEntity.ok("patient updated");
    }

    @DeleteMapping("/{id}") 
    public ResponseEntity<?> delete(@PathVariable  Long id)  {
        patientRepo.deleteById(id);
        return  ResponseEntity.ok("patient deleted");
    }

	public PatientRepo getPatientRepo() {
		return patientRepo;
	}

	public void setPatientRepo(PatientRepo patientRepo) {
		this.patientRepo = patientRepo;
	}

}