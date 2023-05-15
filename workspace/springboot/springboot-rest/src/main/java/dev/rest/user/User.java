package dev.rest.user;

import org.springframework.lang.NonNull;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter @Setter @NoArgsConstructor @ToString
@Entity
@Table(name = "users")
public class User {
	@Id @GeneratedValue
	private Long id;
	
	private String firstName;
	
	private String lastName;
	
	private String gender; // male, female
	
	private String email;
	
	private String phone;
	 
	@NonNull
	private String username;
	
	@NonNull
	private String password;
	
}
