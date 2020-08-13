package lab.spring.model;

import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.apache.commons.lang3.builder.ToStringBuilder;

@Entity
public class Vaccine {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	long id;

	long pid;  //Patient ID

	LocalDate  actDate;
	
	String name;
	
	String category;
	
	String lot;
	
	LocalDate  reminder;
	
	String referredBy; // source physician name
	
	String comments;

		
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


	public long getPid() {
		return pid;
	}


	public void setPid(long pid) {
		this.pid = pid;
	}


	public LocalDate getActDate() {
		return actDate;
	}


	public void setActDate(LocalDate actDate) {
		this.actDate = actDate;
	}


	public String getName() {
		return name;
	}


	public void setName(String name) {
		this.name = name;
	}


	public String getCategory() {
		return category;
	}


	public void setCategory(String category) {
		this.category = category;
	}


	public String getLot() {
		return lot;
	}


	public void setLot(String lot) {
		this.lot = lot;
	}


	public LocalDate getReminder() {
		return reminder;
	}


	public void setReminder(LocalDate reminder) {
		this.reminder = reminder;
	}


	public String getReferredBy() {
		return referredBy;
	}


	public void setReferredBy(String referredBy) {
		this.referredBy = referredBy;
	}


	public String getComments() {
		return comments;
	}


	public void setComments(String comments) {
		this.comments = comments;
	}
		
}
