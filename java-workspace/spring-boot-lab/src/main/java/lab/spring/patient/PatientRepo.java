package lab.spring.patient;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public 
interface PatientRepo extends JpaRepository<Patient, Long>{
 
	@Query("select p from Patient p where p.firstName=:criteria or  p.lastName=:criteria")
	Page<Patient> search(String criteria, Pageable pageable);
	
}