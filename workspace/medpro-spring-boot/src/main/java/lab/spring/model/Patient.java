package lab.spring.model;

import java.time.LocalDate;
import java.util.Set;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

import org.apache.commons.lang3.builder.ToStringBuilder;

import lab.spring.constants.Gender;

@Entity
@Table(name = "patient")
public 
class Patient {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	long pid; // Patient ID

	@Column(nullable = false)
	@NotBlank
	String firstName;

	@Column(nullable = false)
	@NotBlank
	String lastName;

	String surname;
	
	String cin;  
	
	@Enumerated(EnumType.STRING) 
	Gender gender;
	
	@Column(columnDefinition = "DATE")
	LocalDate   birthDate;
	
	@Transient
	int   age;
	
	@Embedded Address address;
	
	String cellPhone;
	String homePhone;
	
	@Email(message = "email bad format")
	String email;

	String profession;
	
	
	@Column(columnDefinition = "DATE")
	LocalDate  deathDate;   // Sad :-(
	
	Integer deathAge;   
	
	@Column(columnDefinition = "TIMESTAMP")
	LocalDate      creationDate;			 // in database :-)
	
	@Column(columnDefinition = "TIMESTAMP")  
	LocalDate      modificationDate;		  

	@OneToOne
	@Basic(fetch = FetchType.LAZY)
	Picture picture; 

	@OneToMany(mappedBy = "pid") @Basic(fetch = FetchType.LAZY)
	Set<Allergy> allergies;
	
	@OneToMany(mappedBy = "pid") @Basic(fetch = FetchType.LAZY)
	Set<Medication> medications;

	@OneToMany(mappedBy = "pid") @Basic(fetch = FetchType.LAZY)
	Set<Biometric> biometrics;

	public Patient() {  // default constructor
	} 
	
	
	@Override
	public String toString() {
		return ToStringBuilder.reflectionToString(this);
	}

	//-----------------------------------------------------------------------------
	// Getters and Setters
	//-----------------------------------------------------------------------------
	
	
	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	

	public Set<Medication> getMedications() {
		return medications;
	}


	public void setMedications(Set<Medication> medications) {
		this.medications = medications;
	}


	public Set<Biometric> getBiometrics() {
		return biometrics;
	}


	public void setBiometrics(Set<Biometric> biometrics) {
		this.biometrics = biometrics;
	}


	public long getPid() {
		return pid;
	}

	public void setPid(long pid) {
		this.pid = pid;
	}

	public Picture getPicture() {
		return picture;
	}

	public void setPicture(Picture picture) {
		this.picture = picture;
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

	public String getCin() {
		return cin;
	}

	public void setCin(String cin) {
		this.cin = cin;
	}

	public Gender getGender() {
		return gender;
	}

	public void setGender(Gender gender) {
		this.gender = gender;
	}

	public LocalDate getBirthDate() {
		return birthDate;
	}

	public void setBirthDate(LocalDate birthDate) {
		this.birthDate = birthDate;
	}

	public int getAge() {
		return age;
	}

	public void setAge(int age) {
		this.age = age;
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

	public void setCellPhone(String cellPhone) {
		this.cellPhone = cellPhone;
	}

	public String getHomePhone() {
		return homePhone;
	}

	public void setHomePhone(String homePhone) {
		this.homePhone = homePhone;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getProfession() {
		return profession;
	}

	public void setProfession(String profession) {
		this.profession = profession;
	}

	public LocalDate getDeathDate() {
		return deathDate;
	}

	public void setDeathDate(LocalDate deathDate) {
		this.deathDate = deathDate;
	}

	public LocalDate getCreationDate() {
		return creationDate;
	}

	public void setCreationDate(LocalDate creationDate) {
		this.creationDate = creationDate;
	}

	public LocalDate getModificationDate() {
		return modificationDate;
	}

	public void setModificationDate(LocalDate modificationDate) {
		this.modificationDate = modificationDate;
	}
   
}