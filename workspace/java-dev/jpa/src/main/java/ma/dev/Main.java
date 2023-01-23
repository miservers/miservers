package ma.dev;

import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityManager;
import javax.persistence.Persistence;

public class Main 
{
    public static void main( String[] args ) throws Exception
    {
       Product product = new Product("Lenovo 11.6", "Laptops", 165);
       EntityManagerFactory entityManagerFactory = Persistence.createEntityManagerFactory("manager1");
       EntityManager entityManager = entityManagerFactory.createEntityManager();
       ProductRepository userRepository = new ProductRepository(entityManager);
        
       userRepository.save(product);
    }
}
