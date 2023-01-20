/**
 * Anonymous classes enable you to declare and instanciate classes at the same time.
 * Anonymous inner classes car be created by two ways: class(abstract or concrete) or interface 
 */
 
 public class AnonymousClass {
    public static void main(String... args) {
        
        // declaration and instanciation of the ananymous inner class @Greeting
        var spanishGreeting = new Greating() {
            public void sayHello() {
                System.out.println("Hola Mundo!");
            }
        };     
        

        spanishGreeting.sayHello();
    }
}


interface Greating {
    public void sayHello();
 }
