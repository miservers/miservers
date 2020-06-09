package lab.spring.exception;

import java.io.Serializable;
import java.util.Date;

public 
class ErrorMessage  implements Serializable{
	
	Date    timestamp;	
	String  message;
	
	public ErrorMessage (Date t, String msg) {
		this.timestamp  = t;
		this.message    = msg;
	}
	
	public Date getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(Date timestamp) {
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
