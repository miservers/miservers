
import java.util.List;
import java.util.ArrayList;

public class HeapLeak {

    static List<char[]> list = new ArrayList<char[]>();

    public static void main (String[] args){
        while(true) {
            list.add(new char[1024]); // 1KB
        }
    }
}