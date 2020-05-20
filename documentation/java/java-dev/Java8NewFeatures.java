import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

class Java8NewFeatures {

	/* forEach */
	void forEachTest() {
		Map<Integer, String> myMap = new HashMap<Integer, String>();
		
		myMap.put(65, "A");
		myMap.put(66, "B");
		myMap.put(68, "C");
		myMap.put(69, "D");
		myMap.put(70, "E");

		/* Old way */
		for (Map.Entry<Integer, String>  item: myMap.entrySet())
			System.out.println(item.getKey()+":"+item.getValue());
		
		/* with Java 8 + lambda expression */ 
		myMap.forEach( (k,v)->System.out.println(k+":"+v) );
		
		myMap.forEach((k,v)-> {
								if (k == 68)
									System.out.println(v + " code="+ k);
							  });
	
		/* List iterating in Java 8*/
		Collection<String>  myList = myMap.values();
		myList.forEach(item -> System.out.println(item));
	}
	
	/* Java 8 lambda : comparator */
	
	
	public static void main(String[] args) {
		Java8NewFeatures java8 = new Java8NewFeatures();
		
		
		java8.forEachTest();

	}
}
