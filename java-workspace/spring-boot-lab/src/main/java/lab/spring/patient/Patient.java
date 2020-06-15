package lab.spring.patient;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

import org.apache.commons.lang3.builder.ToStringBuilder;

@Entity
@Table(name = "patient")
public 
class Patient {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	long id;

	@Column(nullable = false)
	@NotBlank
	String firstName;

	@Column(nullable = false)
	@NotBlank
	String lastName;

	String surname;
	
	String cin;  
	
	@Enumerated(EnumType.STRING) Gender gender;
	
	Date   birthDate;
	
	@Embedded Address address;
	
	String cellPhone;
	String homePhone;
	
	@Email(message = "email bad format")
	String email;

	String profession;
	
	Date   deathDate;
	
	public Patient() {  // default constructor
	} 
	
	public enum Gender {FEMME, HOMME};
	
	@Override
	public String toString() {
		return ToStringBuilder.reflectionToString(this);
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}
	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public Date getDeathDate() {
		return deathDate;
	}

	public void setDeathDate(Date deathDate) {
		this.deathDate = deathDate;
	}

	public String getProfession() {
		return profession;
	}

	public void setProfession(String profession) {
		this.profession = profession;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getSurname() {
		return surname;
	}

	public void setSurname(String surname) {
		this.surname = surname;
	}

	public Gender getGender() {
		return gender;
	}

	public void setGender(Gender gender) {
		this.gender = gender;
	}

	public Date getBirthDate() {
		return birthDate;
	}

	public void setBirthDate(Date birthDate) {
		this.birthDate = birthDate;
	}

	public Address getAddress() {
		return address;
	}

	public void setAddress(Address address) {
		this.address = address;
	}

	public String getCellPhone() {
		return cellPhone;
	}

	public String getCin() {
		return cin;
	}

	public void setCin(String cin) {
		this.cin = cin;
	}

	public void setCellPhone(String cellPhone) {
		this.cellPhone = cellPhone;
	}

	public String getHomePhone() {
		return homePhone;
	}

	public void setHomePhone(String homePhone) {
		this.homePhone = homePhone;
	}

    
}