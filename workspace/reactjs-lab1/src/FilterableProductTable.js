import React from 'react';
import logo from './logo.svg';
import './FilterableProductTable.css';

/* Implementation of https://fr.reactjs.org/docs/thinking-in-react.html
 * Start json-server 
       json-server -p 2707 db.json
  
  // JSON API send this data
  const listProducts = [
                    {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
                    {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
                    {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
                    {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
                    {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
                    {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
                    ]; 
/**/
 
class FilterableProductTable extends React.Component {
  constructor (props) {
    super(props);
    this.state = {listProducts:[]
                 }
  }

  componentDidMount () {
	//backend : json server http://localhost:2707/Products
	//backend : spring-boot-lab ttp://127.0.0.1:8080/api/product
    fetch ('http://127.0.0.1:8080/api/product')
    .then (response => response.json())
    .then (data => this.setState(state => state.listProducts=data));

    console.log(this.state);
    
  }

  render () {
    return (
      <div className="FilterableProductTable">
        <SearchBar />
        <ProductTable products={this.state.listProducts}/>
      </div>
    );
  }
}

class SearchBar extends React.Component {
  
  render () {
    return (
      <div>
        <label> Product:
          <input type="text" name="searchbar" id="searchbar"></input>
        </label>
        <br/>
        <label>
          <input type="checkbox" name="onlyInStock" id="onlyInStock" ></input>
           Show only products in stock
        </label>
      </div>
    );
  }
}

class ProductTable extends React.Component {
  constructor (props){
    super(props);
  }
  
  render () {
    const listProducts = this.props.products.map(product => <ProductRow key={product.name} product={product}/>);
      
    return (
      <div className="ProductTable">
        <ProductTableHeader/>
        {listProducts}
      </div>
    );
  }
}  

class ProductTableHeader extends React.Component {
      
    render () {
      return (
        <div style={{display: "table-header-group", backgroundColor: "gray"}}>
          <div style={{display: "table-cell"}}>Name</div>
          <div style={{display: "table-cell"}}>Price</div>
          <div style={{display: "table-cell"}}>Stocked</div>
        </div>
    );
  }
}

class ProductRow extends React.Component {
  constructor (props){
    super(props);
  }

  render () {
    let inStock = <div style={{display: "table-cell", color: "green"}}>in stock</div>; 
    if (!this.props.product.stocked) 
      inStock = <div style={{display: "table-cell", color: "red"}}>out of stock</div>; 
    
    return (
      <div style={{display: "table-row"}}>
        <div style={{display: "table-cell"}}>{this.props.product.name}</div>
        <div style={{display: "table-cell"}}>{this.props.product.price}</div>
        <div style={{display: "table-cell"}}>{inStock}</div>
      </div>
    );
  }
}


export default FilterableProductTable;
