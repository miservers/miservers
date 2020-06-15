package lab.spring.patient;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public 
interface PatientRepo extends JpaRepository<Patient, Long>{
    
}