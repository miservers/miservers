package ma.dev.spring.ioc;

import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import org.springframework.stereotype.Component;

@Component     // tell spring container to use this class through IOC
public class ProductDao {
    
    @PersistenceContext  // Inject the EM 
    EntityManager em;
    
    public void persist (Product product) {
        em.persist(product);
    }
    
    public List<Product> findAll () {
        return em.createQuery("SELECT p FROM Product p").getResultList();
    }
}
