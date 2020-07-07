package lab.spring.patient;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public 
interface PatientRepo extends JpaRepository<Patient, Long>{
 
	@Query("SELECT p FROM Patient p "
			+ "WHERE p.firstName LIKE :criteria%  OR  "
			+ "p.lastName LIKE :criteria%")
	Page<Patient> search(@Param("criteria") String criteria, Pageable pageable);
	
}