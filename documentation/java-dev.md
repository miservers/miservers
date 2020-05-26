
## Java 8 new features
### Lambda expressions
Lambda expressions express instances of **Functinal interfaces**(inteface with a single abstract function). Lambda expression implemente the only abstract function, and so implemente the interface. 

Lambda syntax

~~~
  (parameters) -> expression;
  or
  (parameters) -> {statments;}
~~~
It may have zero or more parameters. parameters are separated by a coma.

**Example** :  
.1. Create a functional interface: 

~~~java
@FunctionalInterface
interface IFunctional{
	
	void abstractFunc(int x);
	
	default void normalFunc (int a, int b) {
		System.out.println(a+b);
	}
}  
~~~
.2. Then Interface can be instanciated with lamda expression:  

~~~
IFunctional myObj = (x)->System.out.println(3*x);

myObj.abstractFunc(10);
~~~


### forEach
Imagine we have a Map like this :

~~~java
	Map<Integer, String> myMap = new HashMap<Integer, String>();		
	myMap.put(65, "A");
	myMap.put(66, "B");
	myMap.put(68, "C");
~~~

Old way to parse this Map:

~~~java
	for (Map.Entry<Integer, String>  item: myMap.entrySet())
		System.out.println(item.getKey()+":"+item.getValue());
~~~

New way to parse it in Java 8 + Lamba expressions

~~~java		
	myMap.forEach( (k,v)->System.out.println(k+":"+v) );
	
	myMap.forEach((k,v)-> {
							if (k == 68)
								System.out.println(v + " code="+ k);
						  });
~~~


For a List simply write

~~~java 
	myList.forEach(item -> System.out.println(item));
~~~
