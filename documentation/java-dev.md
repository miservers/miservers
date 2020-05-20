

## Java 8 new features
### Lambda
Lambda syntax

~~~
  (parameters) -> expression;
  or
  (parameters) -> {more than one instructions;}
~~~
It may have zero or more parameters. parameters are separated by a coma.


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
