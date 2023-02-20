package ma.dev.jpa;

import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityManager;
import javax.persistence.Persistence;

public class Main 
{
    public static void main( String[] args ) throws Exception
    {
       Product product = new Product("Lenovo 11.6", "Laptops", 1650);
       EntityManagerFactory emFactory = Persistence.createEntityManagerFactory("myEM");
       EntityManager entityManager = emFactory.createEntityManager();
       ProductRepository userRepository = new ProductRepository(entityManager);
        
       userRepository.save(product);
       
       Product mobile = new Product(); //Lombok setters
       mobile.setName("Readme 11 Pro"); 
       mobile.setCategory("Mobiles");
       mobile.setPrice(3249); 
       userRepository.save(mobile);
       
    }
}
