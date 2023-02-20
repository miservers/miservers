package ma.dev.jpa;

import java.util.Optional;
import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;

public class ProductRepository {
    EntityManager entityManager;
    
    public ProductRepository(EntityManager entityManager) 
    {
        this.entityManager = entityManager;
    }
    
    Optional<Product> save (Product product)
    {
        EntityTransaction transaction = null;
        try
        {
            transaction = entityManager.getTransaction();
            transaction.begin();
            entityManager.persist(product);
            transaction.commit();
            return Optional.of(product);
            
        } catch (Exception e) {
            transaction.rollback();
            e.printStackTrace();
        }
        return Optional.empty();
    }
}
