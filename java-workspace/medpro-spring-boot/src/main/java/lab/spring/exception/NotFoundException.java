package lab.spring.exception;

public 
class NotFoundException  extends RuntimeException{

    private static final long serialVersionUID = -2534026505923999411L;

    public NotFoundException (Exception e) {super(e);}

    public NotFoundException (String msg) {super(msg);}
    
}