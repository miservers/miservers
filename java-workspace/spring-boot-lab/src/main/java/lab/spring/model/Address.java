package lab.spring.model;

import java.io.Serializable;

import javax.persistence.Embedded;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;

import org.apache.commons.lang3.builder.ToStringBuilder;

public class Address implements Serializable{
	
	
	String 		address; 
	
	Integer 		streetNumber; // France ADDR Format 
	@Enumerated(EnumType.ORDINAL) StreetType 	streetType; 
	String 		street;
	
	String 		city;
	
	String 		zipCode;

	String 		country;

	public enum StreetType {BIS, TER, TIS};
	
	@Override
	public String toString() {
		return ToStringBuilder.reflectionToString(this);
	}

	
	private static final long serialVersionUID = -2752634733535063074L;


	public String getAddress() {
		return address;
	}


	public void setAddress(String address) {
		this.address = address;
	}


	public Integer getStreetNumber() {
		return streetNumber;
	}


	public void setStreetNumber(Integer streetNumber) {
		this.streetNumber = streetNumber;
	}


	public StreetType getStreetType() {
		return streetType;
	}


	public void setStreetType(StreetType streetType) {
		this.streetType = streetType;
	}


	public String getStreet() {
		return street;
	}


	public void setStreet(String street) {
		this.street = street;
	}


	public String getCity() {
		return city;
	}


	public void setCity(String city) {
		this.city = city;
	}


	public String getZipCode() {
		return zipCode;
	}


	public void setZipCode(String zipCode) {
		this.zipCode = zipCode;
	}


	public String getCountry() {
		return country;
	}


	public void setCountry(String country) {
		this.country = country;
	}
			
}
