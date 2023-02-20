package ma.dev.jpa;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "Product")
@Getter
@Setter 
public class Product{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;

    private String name;

    @Column(name = "category")
    String category;

    int price;

    public Product() {}
    
    public Product(String name, String category, int price) {
        this.name = name;
        this.category = category;
        this.price = price;
    }

}
