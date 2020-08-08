package lab.spring.model;

import java.time.LocalTime;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.apache.commons.lang3.builder.ToStringBuilder;

import lab.spring.constants.MeasureNames;

public class Measure {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Long id;
	
	@Enumerated(EnumType.STRING)
	MeasureNames name; // Tall, weight
	
	String value;
	
	String unit; //cm, mmHg
	
	LocalTime date; // when mesure is taken
	
	@Override
	public String toString() {
		return ToStringBuilder.reflectionToString(this);
	}
	
	
}
