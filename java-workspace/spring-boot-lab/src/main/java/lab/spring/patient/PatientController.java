package lab.spring.patient;

import java.time.LocalDate;
import java.util.Date;
import java.util.HashMap;
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
import lab.spring.utils.AgeCalculator;

@RestController
@RequestMapping(value="/api/patients", 
				consumes = MediaType.APPLICATION_JSON_VALUE,
                produces = MediaType.APPLICATION_JSON_VALUE)
@CrossOrigin
public 
class PatientController {

  
    @Autowired
    private PatientRepository patientRepository;

    @GetMapping()
    public ResponseEntity<Map<String, Object>>  all(@RequestParam Integer pageNo,
    												@RequestParam Integer pageSize,
    												@RequestParam(defaultValue = "id") String  sortBy,  
    												@RequestParam(defaultValue = "asc") String sortDirection,
    												@RequestParam(defaultValue = "", required = false ) String search ) {
    	
    	Sort.Direction direction = sortDirection.equals("asc")?Sort.Direction.ASC:Sort.Direction.DESC;
    	Pageable pageable = PageRequest.of(pageNo, pageSize, Sort.by(direction ,sortBy));
    	
    	Page<Patient> pageableResult = patientRepository.findAll(pageable);
    	
    	Map<String, Object> response = new HashMap<String, Object>();
    	response.put("currentPage", pageableResult.getNumber());
    	response.put("totalCount", pageableResult.getTotalElements());
    	response.put("totalPages", pageableResult.getTotalPages());
    	response.put("patients", pageableResult.getContent());

    	return ResponseEntity.ok().body(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Patient> one(@PathVariable Long id) {
        Patient patient = patientRepository.findWithPictureById(id);
                                      //orElseThrow(()-> new DataNotFoundException("no record found with id "+id)); 
        
        patient.setAge(AgeCalculator.calculateAge(patient.getBirthDate(), LocalDate.now()));
        return ResponseEntity.ok().body(patient);
    }

    @GetMapping("/search")
    public ResponseEntity<Map<String, Object>>  search(@RequestParam Integer pageNo,
    												   @RequestParam Integer pageSize,
    											       @RequestParam(defaultValue = "id") String  sortBy,  
    												   @RequestParam(defaultValue = "asc") String sortDirection,
    												   @RequestParam  String name ) {
    	
    	Sort.Direction direction = sortDirection.equals("asc")?Sort.Direction.ASC:Sort.Direction.DESC;
    	Pageable pageable = PageRequest.of(pageNo, pageSize, Sort.by(direction ,sortBy));
    	
    	Page<Patient> pageableResult = patientRepository.findByLastNameContainingOrFirstNameContaining(name, name, pageable);
    	
    	Map<String, Object> response = new HashMap<String, Object>();
    	response.put("currentPage", pageableResult.getNumber());
    	response.put("totalCount", pageableResult.getTotalElements());
    	response.put("totalPages", pageableResult.getTotalPages());
    	response.put("patients", pageableResult.getContent());

    	
    	return ResponseEntity.ok().body(response);
    }

    
    @PostMapping() 
    public ResponseEntity<?> create(@RequestBody Patient patient)  {
    	System.out.println("patient to create : "+patient);
    	LocalDate now = LocalDate.now();
    	patient.setCreationDate(now);
    	patient.setModificationDate(now);
        Patient createdUser = patientRepository.save(patient);
        return ResponseEntity.ok().body(createdUser);
    }

    @PutMapping()
    public ResponseEntity<?> update(@ModelAttribute Patient patient)  {
    	patient.setModificationDate(LocalDate.now());
        patientRepository.save(patient);
        return ResponseEntity.ok("patient updated");
    }

    @DeleteMapping("/{id}") 
    public ResponseEntity<?> delete(@PathVariable  Long id)  {
        patientRepository.deleteById(id);
        return  ResponseEntity.ok("patient deleted");
    }

	public PatientRepository getPatientRepo() {
		return patientRepository;
	}

	public void setPatientRepo(PatientRepository patientRepo) {
		this.patientRepository = patientRepo;
	}

}