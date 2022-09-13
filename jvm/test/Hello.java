
public class Hello{
	protected int year;

	void sayHello(String name) {
	    System.out.println("Hello " + name + " " + year);
	}
	
	public static void main(String[] zArgs){
		Hello hello = new Hello();
		hello.year = 2022;
		hello.sayHello("Yahya");
	}
}
