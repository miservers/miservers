package lab.spring.exception;

public 
class DataNotFoundException  extends RuntimeException{

    private static final long serialVersionUID = -2534026505923999411L;

    public DataNotFoundException (Exception e) {super(e);}

    public DataNotFoundException (String msg) {super(msg);}
    
}