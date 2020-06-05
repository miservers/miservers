package lab.spring.rest;

import java.util.concurrent.atomic.AtomicLong;

public class User {
    long id;
    String username;
    String email;

    private final AtomicLong couter = new AtomicLong(); 

    public User (String username, String email) {
        this.id       = couter.incrementAndGet();
        this.username = username;
        this.email    = email;
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

    
}