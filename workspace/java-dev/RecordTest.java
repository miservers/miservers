/**
 * Java 14 record keyword simplifies the creation of immutable beans.
 *   Getters, toString, equals and hashCode methods are automatiquly generated. A lot of 
 *   boilerplate code are avoided.
 * 
 * record Objects are immutable, so you can not define Setters for.
 */

public class RecordTest {
    public static void main(String[] args) {
        Student rec1 = new Student("Fati", 20);
        System.out.println(rec1.name()); // Fati

        System.out.println(rec1.toString()); // Student[name=Fati, age=20]

        Student rec2 = new Student("Ali", 22);
        Student rec3 = new Student("Fati", 20);
        
        System.out.println(rec1.equals(rec2)); // false
        System.out.println(rec1.equals(rec3)); // true
    }
 }

 /*
  * creation of the record class is very straightforward
  */
 record Student (String name, Integer age) {}



