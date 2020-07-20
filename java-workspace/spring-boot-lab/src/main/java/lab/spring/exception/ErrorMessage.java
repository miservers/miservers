package lab.spring.exception;

import java.io.Serializable;
import java.time.LocalDateTime;

public 
class ErrorMessage  implements Serializable{
	
	LocalDateTime    timestamp;	
	String  message;
	
	public static 
	ErrorMessage build (String msg) {
		return new ErrorMessage(LocalDateTime.now(), msg);
	}
	
	public ErrorMessage (String msg) {
		this.timestamp  = LocalDateTime.now();
		this.message    = msg;
	}
	
	public ErrorMessage (LocalDateTime t, String msg) {
		this.timestamp  = t;
		this.message    = msg;
	}
	
	public LocalDateTime getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(LocalDateTime timestamp) {
		this.timestamp = timestamp;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	private static final long serialVersionUID = 6858931239537480020L;
	
}
