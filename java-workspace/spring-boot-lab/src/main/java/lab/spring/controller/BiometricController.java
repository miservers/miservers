package lab.spring.controller;

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
import lab.spring.model.Biometric;
import lab.spring.repository.BiometricRepository;

@RestController
@RequestMapping(value="/api/biometrics", 
				consumes = MediaType.APPLICATION_JSON_VALUE,
                produces = MediaType.APPLICATION_JSON_VALUE)
@CrossOrigin
public 
class BiometricController {

  
    @Autowired
    private BiometricRepository biometricRepository;

    @GetMapping()
    public ResponseEntity<List<Biometric>>  all(@RequestParam Long pid,
											  @RequestParam(defaultValue = "id") String  sortBy,  
											  @RequestParam(defaultValue = "asc") String sortDirection) {
    	
    	
    	List<Biometric> biometrics = biometricRepository.findByPid(pid);
    	   	
    	return ResponseEntity.ok().body(biometrics);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Biometric> one(@PathVariable Long id) {
        Biometric biometric = biometricRepository.findById(id)
                             .orElseThrow(()-> new NotFoundException("no record found with id "+id)); 
        return ResponseEntity.ok().body(biometric);
    }

  
    @GetMapping("/{pid}/last/{measureName}")
    public ResponseEntity<Biometric> lastMeasureByName(@PathVariable Long pid, 
    												   @PathVariable String measureName) {
        Biometric biometric = biometricRepository.findTopByPidAndMeasureNameOrderByDateDesc(pid, measureName)
        					 .orElseThrow(()-> new NotFoundException("no measure found with pid: "+pid+
        							 								 " and name:"+measureName));
        return ResponseEntity.ok().body(biometric);
    }

    
    
    @PostMapping() 
    public ResponseEntity<?> create(@RequestBody Biometric biometric)  {
    	System.out.println("biometric to create : "+biometric);
        Biometric result = biometricRepository.save(biometric);
        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }

    @PutMapping()
    public ResponseEntity<?> update(@RequestBody Biometric biometric)  {
    	System.out.println("update :" + biometric);
    	Biometric result = biometricRepository.save(biometric);
        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }

    @DeleteMapping("/{id}") 
    public ResponseEntity<?> delete(@PathVariable  Long id)  {
        biometricRepository.deleteById(id);
        return  ResponseEntity.ok().body(ServerMessage.build("record deleted"));
    }

}

























