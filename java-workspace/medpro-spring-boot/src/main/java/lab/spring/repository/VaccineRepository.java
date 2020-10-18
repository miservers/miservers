package lab.spring.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import lab.spring.model.Vaccine;

@Repository
public 
interface VaccineRepository extends JpaRepository<Vaccine, Long>{
	
	List<Vaccine> findByPid(Long pid);
	
}