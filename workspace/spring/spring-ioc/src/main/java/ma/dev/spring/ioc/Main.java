package ma.dev.spring.ioc;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

/**
 *
 * @author AR 2023
 */
public class Main {

    public static void main(String[] args) {
        System.out.println("*** Test of String IOC ***");

        ApplicationContext ctx = new ClassPathXmlApplicationContext("classpath:/spring.xml");

        ProductService productSrv = ctx.getBean(ProductService.class);

        productSrv.add(new Product("S5 mini", "Mobile", 690));
        productSrv.add(new Product("RealMe 9", "Mobile", 1768));
        
    }
}
