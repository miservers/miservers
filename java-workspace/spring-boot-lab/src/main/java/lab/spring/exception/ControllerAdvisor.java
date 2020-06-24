package lab.spring.exception;

import java.util.Date;
import java.util.Set;

import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public 
class ControllerAdvisor  {
 
    private static final Logger log = LoggerFactory.getLogger(ControllerAdvisor.class);

	@ExceptionHandler(DataNotFoundException.class)
    public final 
    ResponseEntity<ErrorMessage> handleException(DataNotFoundException e) {
		log.error("Exception Message : "+ e.getMessage());
    	log.error("Exception Class : "+ e.getClass(), e);
        ErrorMessage err = new ErrorMessage(new Date(), e.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(err);
    }
	
	@ExceptionHandler(DataAccessException.class)
    public final 
    ResponseEntity<ErrorMessage> handleException(DataAccessException e) {
    	log.error("Exception Message : "+ e.getMessage());
    	log.error("Exception Class : "+ e.getClass(), e);
        ErrorMessage err = new ErrorMessage(new Date(), e.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(err);
    }
	
	@ExceptionHandler(ConstraintViolationException.class)
    public final 
    ResponseEntity<ErrorMessage> handleException(ConstraintViolationException e) {
		log.error("Exception Message : "+ e.getMessage());
    	log.error("Exception Class : "+ e.getClass(), e);
    	var wrapper = new Object(){ String msg = "";};
        Set<ConstraintViolation<?>> constraints = e.getConstraintViolations();
        constraints.forEach((constraint) -> {
        						wrapper.msg += constraint.getPropertyPath() 
        										+" "+ constraint.getMessage() + ". ";
        					});
        
        ErrorMessage err = new ErrorMessage(new Date(), wrapper.msg);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(err);
    }
	
		
	@ExceptionHandler(Exception.class)
    public final 
    ResponseEntity<ErrorMessage> handleException(Exception e) {
		log.error("Exception Message : "+ e.getMessage());
    	log.error("Exception Class : "+ e.getClass(), e);
        ErrorMessage err = new ErrorMessage(new Date(), e.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(err);
    }
		
		
	
	                      
}