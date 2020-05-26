package java8;

@FunctionalInterface  // optional but recommanded
interface IFunctional{

	void abstractFunc(int x);

	default void normalFunc (int a, int b) {
		System.out.println(a+b);
	}
}

public class LambdaTest {

	public static void main(String[] args) {
		IFunctional myObj = (x)->System.out.println(3*x);

		myObj.abstractFunc(10);
	}
}
