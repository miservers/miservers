
public class Lambda {

	int calculate2Int(int a, int b , Calculator calc) {
		return calc.operation2(a,b);
	}

	public static void main(String... args) {
		Lambda lambda = new Lambda();
		Calculator add = (a,b) -> a+b;

		System.out.println("8+6= "+lambda.calculate2Int(8,6, add));

		System.out.println("8-6= "+lambda.calculate2Int(8,6, (a,b)->a-b));

		System.out.println("9*4= "+lambda.calculate2Int(9,4, (a,b)->a*b));


	}
}


interface Calculator{  // interface LAMBDA
	int operation2(int a, int b);
	
}
