package ma.dev;

import java.util.Optional;
import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;

public class UserRepository {
    EntityManager entityManager;
    
    public UserRepository(EntityManager entityManager) 
    {
        this.entityManager = entityManager;
    }
    
    Optional<User> save (User user)
    {
        EntityTransaction transaction = null;
        try
        {
            transaction = entityManager.getTransaction();
            transaction.begin();
            entityManager.persist(user);
            transaction.commit();
            return Optional.of(user);
            
        } catch (Exception e) {
            transaction.rollback();
            e.printStackTrace();
        }
        return Optional.empty();
    }
}
