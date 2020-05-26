import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;



enum Level {MINOR, NORMAL, URGENT}; 

/* Annotation creation 
 * Note that retention policy is runtime
 */
@Retention(RetentionPolicy.RUNTIME)
@interface ToDo {
  String value();
  Level level();
}


/* Annotation Usage */
@ToDo(value="must be coded", 
      level=Level.URGENT)
class MyClass {
  void myfunc () {}
}


/* Main : annotations introspection */
class AnnotationsTest {
  public static void main(String args[]) {
    
    Class<MyClass> clazz =  MyClass.class;
    ToDo todo = clazz.getAnnotation(ToDo.class);

    System.out.println("Annotation TODO :");

    System.out.println("\t value=" + todo.value() + ", Level=" + todo.level());

  }
}
