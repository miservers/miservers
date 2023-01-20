package ma.dev;

import java.io.Serializable;
import lombok.Getter;
import lombok.Setter;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Column;

@Getter
@Setter
@Entity
@Table(name="User")
public class User implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;

    String name;

    @Column(name="user_name")
    String username;
    
    String email;
    
    public User(String name, String username, String email)
    {
        this.name = name;
        this.username = username;
        this.email = email;
    }
}