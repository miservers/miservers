package lab.spring.model;

import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import org.apache.commons.lang3.builder.ToStringBuilder;

@Entity
public class Biometric {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Long id;
	
	long pid;  //Patient ID

	@ManyToOne
	Measure measure;
	
	Integer value;
	
	LocalDateTime date; // when mesure is taken
	
	@Override
	public String toString() {
		return ToStringBuilder.reflectionToString(this);
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Measure getMeasure() {
		return measure;
	}

	public void setMeasure(Measure measure) {
		this.measure = measure;
	}

	public Integer getValue() {
		return value;
	}

	public LocalDateTime getDate() {
		return date;
	}

	public void setDate(LocalDateTime date) {
		this.date = date;
	}

	public void setValue(Integer value) {
		this.value = value;
	}

	
	
}
