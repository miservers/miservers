package ma.dev.spring.ioc;

import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component // Make this class a manageable spring bean.
public class ProductService {
    
    @Autowired  // Inject the Dao in our Service
    ProductDao productDao;
    
    @Transactional
    public void add (Product product) {
        // Do some validation stufs
        // ... before persisting to DB
        
        productDao.persist(product);
    }
    
}
