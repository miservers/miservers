package org.safarit;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;


@Entity
class User {
  
  @Id
  @GeneratedValue(strategy=GenerationType.IDENTITY)
  int id;

  String username;

  String password;

  User () {}
  
  User (String username, String password) {
    this.username = username;
    this.password = password;
  }

    public int getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }

  
  
}