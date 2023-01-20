/**
 * Heapdump generation:
 *  -XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=~/heapdump.hprof
 */
import java.util.List;
import java.util.ArrayList;

public class HeapLeak {

    
    public static void main (String[] args){
        List<Product> list = new ArrayList<Product>();
        while(true) {
            list.add(new Product("Spagetti")); // 1KB
        }
    }
}

record Product(String name){}