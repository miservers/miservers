package lab.spring.user;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

import org.apache.commons.lang3.builder.ToStringBuilder;

@Entity
@Table(name = "user")
public 
class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	long id;

	@Column(nullable = false)
	@NotBlank
	String username;

	@Column(nullable = false)
	@Email(message = "email bad format")
	String email;

	String password;

	public User() {  // default constructor
	} 
	
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

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}


    
}