package ma.jpa;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;


class PersonDaoTest {
  public static void main(String args[]) {

    /* create an Entity Manager */
    EntityManagerFactory emFactory = Persistence.createEntityManagerFactory("TestDB");
    EntityManager em = emFactory.createEntityManager();
 
    em.getTransaction().begin();

    /* create a Person Bean */
    Person person = new Person("omar", "omrani");
    
    em.persist(person);

    /* commit */
    em.getTransaction().commit();
    em.close();
    emFactory.close();
  }

}