
## Java 8 new features
### Lambda expressions
Lambda expression allow instancing **Functinal interfaces**(inteface with a single abstract function). It implemente the only abstract function, and so implemente the interface. 

Lambda syntax

~~~
  (parameters) -> expression;
  or
  (parameters) -> {statments;}
~~~
It may have zero or more parameters. parameters are separated by a coma.

**Example** :  
.1. Create a Functional Interface: 

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

### json-server : API to develop a Prototype  
**Install json-server**

~~~ 
npm install -g json-server 
~~~

**Define your Data in db.json file**

~~~
{
    "Products": [
        {"category": "Sporting Goods", "price": "$49.99", "stocked": true, "name": "Football"},
        {"category": "Sporting Goods", "price": "$9.99", "stocked": true, "name": "Baseball"},
        {"category": "Sporting Goods", "price": "$29.99", "stocked": false, "name": "Basketball"},
        {"category": "Electronics", "price": "$99.99", "stocked": true, "name": "iPod Touch"},
        {"category": "Electronics", "price": "$399.99", "stocked": false, "name": "iPhone 5"},
        {"category": "Electronics", "price": "$199.99", "stocked": true, "name": "Nexus 7"}
    ],
    "users": [ 
        { "id": 1, "name": "Lorem ipsum"}, 
        { "id": 2, "name": "Taurex Aile"} 
     ] 
}  
~~~

**Start json-server**

~~~
json-server -p 2707 db.json
~~~

**Access to Resources**   
  * http://localhost:2707/Products  
  * http://localhost:2707/users  

### ToStringBuilder
very useful utility from **apache-commons** package 

~~~java
    @Override
	public String toString() {
		return ToStringBuilder.reflectionToString(this);
	}
~~~

### Optional class(java 8)
Optional is an alternative to **null**. very useful for code **lisibility**.  

~~~java
	String name = "something";
    Optional<String> opt = Optional.of(name);
	opt.get();			 // return name value, otherwise throw NoSuchElementException.
	if (opt.isPresent()) //true if there is a value present, otherwise false.
~~~


### RESTful web service
Conventions:
 * **GET**: Read.   
   **GET /product** get all products. **GET /product/{id}** read product identified  by id. return **HTTP 200(OK)** status.  if resource identified by ID cannot be found, an **HTTP 404** status is returned. 
 * **POST**: Create.  
   **POST  /product** create the product transmitted. And return created Id in response, and **HTTP 201 (Created)** status .
 * **PUT**: Update.  
   **PUT /product/{id}** update product identified by id with that transmitted. If resource not found , an **HTTP 404** status is returned. if found return **HTTP 200(OK)** in response
 * **DELETE**: Delete.   
   **DELETE /product/{id}**. If it doesn't exist, an **HTTP 404** status is returned. If it exists, it is deleted, and an **HTTP 204** (No Content) status is returned.
Les web services Rest are resources. a resource is identified by its domain name: product, bill, order, etc. 


### Eclipse
##### Eclipse optimisation
 [7-tips-to-speed-up-eclipse](http://www.nicolasbize.com/blog/7-tips-to-speed-up-eclipse/)  

#### Run Eclipse/JVM on RamDisk
On ubuntu  

~~~
  $ sudo mkdir /media/ramdisk
  $ sudo mount -t tmpfs tmpfs /media/ramdisk
  $ nano /etc/fstab
  tmpfs					 /media/ramdisk	  tmpfs   rw,size=512m,defaults,mode=1777  0   0
  $ df -h
  $ sudo apt install squashfs-tools
  $ mksquashfs /usr/lib/jvm/java-11-openjdk-amd64 jdk11.sqsh
  /!\ dont use symbolic link
  $ sudo mount /home/jadmin/jdk11.sqsh /media/ramdisk -t squashfs -o loop
  $ nano /etc/fstab
  /home/jadmin/jdk11.sqsh                  /media/ramdisk   squashfs  ro,defaults,loop   0  0
  $ sudo update-alternatives --install "/usr/bin/java" "java" "/media/ramdisk/bin/java" 1
  $ sudo update-alternatives --config java
~~~
  
### Entity 
[Entity requirements](https://www.objectdb.com/java/jpa/entity):  
 * The class must be annotated with the javax.persistence.Entity 
 * The class must have a public or protected, no-argument constructor.
 * Fiels must be:
   ** Java primitive types, char[], User-defined serializable types, etc
   ** Enumerated types
   ** Other entities and/or collections of entities

**Embedded**

~~~java
@Entity
public class Person {
    @Embedded Address address;
}
~~~


### Tools
  * **RestMan** : opera extension to build http request
  * **Postman**: HTTP requests builder. To test your API
  * **JSON server**: create a server to mock the backend 


   
   
 



