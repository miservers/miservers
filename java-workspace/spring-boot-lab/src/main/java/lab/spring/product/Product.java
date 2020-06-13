package lab.spring.product;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.apache.commons.lang3.builder.ToStringBuilder;

@Entity
@Table(name = "product")
public 
class Product {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	long    id;
	
	String  name;
	int     price;
	String  category;
	boolean stocked;
	
	public Product() {  // default constructor
	} 
	
	@Override
	public String toString() {
		return ToStringBuilder.reflectionToString(this);
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getPrice() {
		return price;
	}

	public void setPrice(int price) {
		this.price = price;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public boolean isStocked() {
		return stocked;
	}

	public void setStocked(boolean stocked) {
		this.stocked = stocked;
	}
    
}