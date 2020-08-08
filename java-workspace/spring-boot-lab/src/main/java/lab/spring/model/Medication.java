package lab.spring.model;

import java.time.LocalDateTime;
import java.time.LocalTime;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import org.apache.commons.lang3.builder.ToStringBuilder;

import lab.spring.constants.Status;

@Entity
public class Medication {
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	Long id;
	
	Long pid;
	
	@ManyToOne
	Drug drug;

	String dose; // 2 puffs, 80mg
	
	String frequency; // 1 daily
	
	Integer quantity;
	
	Integer refills;

	String condition; //asthma, diabete
	
	@Enumerated(EnumType.STRING)
	Status status;

	LocalDateTime prescribed; // datetime prescribed
	
	LocalDateTime startedTaking;
	
	LocalDateTime endTaking;
	
	LocalDateTime renewby;
	
	String notes;

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

	public Drug getDrug() {
		return drug;
	}

	public void setDrug(Drug drug) {
		this.drug = drug;
	}

	public String getDose() {
		return dose;
	}


	public Long getPid() {
		return pid;
	}


	public void setPid(Long pid) {
		this.pid = pid;
	}


	public String getFrequency() {
		return frequency;
	}


	public void setFrequency(String frequency) {
		this.frequency = frequency;
	}


	public String getNotes() {
		return notes;
	}


	public void setNotes(String notes) {
		this.notes = notes;
	}


	public Integer getQuantity() {
		return quantity;
	}


	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}


	public Integer getRefills() {
		return refills;
	}


	public void setRefills(Integer refills) {
		this.refills = refills;
	}


	public String getCondition() {
		return condition;
	}


	public void setCondition(String condition) {
		this.condition = condition;
	}


	public LocalDateTime getPrescribed() {
		return prescribed;
	}


	public void setPrescribed(LocalDateTime prescribed) {
		this.prescribed = prescribed;
	}


	public LocalDateTime getStartedTaking() {
		return startedTaking;
	}


	public void setStartedTaking(LocalDateTime startedTaking) {
		this.startedTaking = startedTaking;
	}


	public LocalDateTime getEndTaking() {
		return endTaking;
	}


	public void setEndTaking(LocalDateTime endTaking) {
		this.endTaking = endTaking;
	}


	public LocalDateTime getRenewby() {
		return renewby;
	}


	public void setRenewby(LocalDateTime renewby) {
		this.renewby = renewby;
	}


	public Status getStatus() {
		return status;
	}


	public void setStatus(Status status) {
		this.status = status;
	}


	public void setDose(String dose) {
		this.dose = dose;
	}
		
}
