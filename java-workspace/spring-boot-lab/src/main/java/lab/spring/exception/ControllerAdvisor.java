package lab.spring.exception;

import java.util.Date;

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
    public 
    final 
    ResponseEntity<ErrorMessage> handleException(DataNotFoundException e) {
    	log.error(e.getMessage(), e);
        ErrorMessage err = new ErrorMessage(new Date(), e.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(err);
    }
	
	@ExceptionHandler(DataAccessException.class)
    public 
    final 
    ResponseEntity<ErrorMessage> handleException(DataAccessException e) {
    	log.error(e.getMessage(), e);
        ErrorMessage err = new ErrorMessage(new Date(), e.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(err);
    }
	
	
	
	                      
}