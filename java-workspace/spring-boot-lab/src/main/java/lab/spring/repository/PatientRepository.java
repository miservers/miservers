package lab.spring.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import lab.spring.model.Patient;

@Repository
public 
interface PatientRepository extends JpaRepository<Patient, Long>{
 
	@Query("SELECT p FROM Patient p "
			+ "WHERE p.firstName LIKE :criteria%  OR  "
			+ "p.lastName LIKE :criteria%")
	Page<Patient> search(@Param("criteria") String criteria, Pageable pageable);
	
	Page<Patient> findByLastNameContainingOrFirstNameContaining(String lastName, String firstName, Pageable pageable);
	
	/*
     * Loads an entity with lazy property loaded from a database
     */
	@EntityGraph(attributePaths={"picture"})
	Patient findWithPictureByPid (Long pid);
	
}