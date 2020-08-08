package lab.spring.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import lab.spring.model.Allergy;
import lab.spring.model.Medication;

@Repository
public 
interface MedicationRepository extends JpaRepository<Medication, Long>{
	
	List<Medication> findByPid(Long pid);
	
}