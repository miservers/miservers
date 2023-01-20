package ma.dev;

import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityManager;
import javax.persistence.Persistence;

public class Main 
{
    public static void main( String[] args ) throws Exception
    {
       User user = new User("Ali Khaled", "ali123", "ali@oin.com");
        EntityManagerFactory entityManagerFactory = Persistence.createEntityManagerFactory("manager1");
        EntityManager entityManager = entityManagerFactory.createEntityManager();
        UserRepository userRepository = new UserRepository(entityManager);
        
        userRepository.save(user);
    }
}
