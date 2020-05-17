package ma.jpa;  

import javax.persistence.*;

@Entity
@Table(name="PERSON") // optional if table name match the bean
class Person {
  
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  int id;

  @Column(name="FIRSTNAME") //optional
  String firstName;

  String lastName;

  Person(String firstName, String lastName) {
    this.firstName = firstName;
    this.lastName  = lastName;
  }

  int getID() {
    return this.id;
  }
  void setId(int id) {
    this.id = id;
  }

  String getFirstName() {
    return this.firstName;
  }
  void setFirstName(String firstName) {
    this.firstName = firstName;
  }

  String getLastName() {
    return this.lastName;
  }
  void setLastName(String lastName) {
    this.lastName = lastName;
  }
}


