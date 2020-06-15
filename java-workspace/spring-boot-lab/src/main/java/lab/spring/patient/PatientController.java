package lab.spring.patient;

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
@RequestMapping(value="/api/patient", 
                produces = MediaType.APPLICATION_JSON_VALUE)
@CrossOrigin
public 
class PatientController {

  
    @Autowired
    private PatientRepo patientRepo;

    @GetMapping()
    public List<Patient> all() {
        return patientRepo.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Patient> one(@PathVariable Long id) {
        Patient patient = patientRepo.findById(id).
                                      orElseThrow(()-> new DataNotFoundException("no record found with id "+id)); 
        
        return ResponseEntity.ok().body(patient);
    }

    @PostMapping() 
    public ResponseEntity<?> create(@RequestBody Patient patient)  {
        Patient createdUser = patientRepo.save(patient);
        return ResponseEntity.ok().body(createdUser);
    }

    @PutMapping()
    public ResponseEntity<?> update(@RequestBody Patient patient)  {
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