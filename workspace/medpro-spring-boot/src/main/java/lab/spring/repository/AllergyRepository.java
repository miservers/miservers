package lab.spring.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import lab.spring.model.Allergy;

@Repository
public 
interface AllergyRepository extends JpaRepository<Allergy, Long>{
	
	List<Allergy> findByPid(Long pid);
	
}