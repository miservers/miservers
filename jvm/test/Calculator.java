
public class Calculator{
	
	public int add (int a, int b) {
		return a+b;
	}

	public static void main(String[] args){
		Calculator calc = new Calculator();

		int c;
		int a = 10;
		int b = 20;
		c = calc.add(a, b);

		System.out.println("Sum of a+b = " + c);
		
	}
}



