package lab.spring.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import lab.spring.model.Biometric;

@Repository
public 
interface BiometricRepository extends JpaRepository<Biometric, Long>{
	
	List<Biometric> findByPid(Long pid);
	
	Optional<Biometric> findTopByPidAndMeasureNameOrderByDateDesc(Long pid, String measureName);
	
}