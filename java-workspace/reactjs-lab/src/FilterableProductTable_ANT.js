import React from 'react';

import './FilterableProductTable.css';
import { Table, Tag, Space, Divider } from 'antd';
import 'antd/dist/antd.css';


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

    const data = this.props.products;
    
    const columns = [
    	  {
    	    title: 'Name',
    	    dataIndex: 'name',
    	    key: 'name',
    	    render: text => <a>{text}</a>,
    	  },
    	  {
    	    title: 'Price',
    	    dataIndex: 'price',
    	    key: 'price',
    	  },
    	  {
    	    title: 'Category',
    	    dataIndex: 'category',
    	    key: 'category',
    	  },
    	  {
    	    title: 'Stocked',
    	    key: 'stocked',
    	    dataIndex: 'stocked',
    	    render: stocked => 
    	    		(stocked)?(<span style={{color: "green"}}>in stock</span>)
    	    				 :(<span style={{color: "red"}}>out of stock</span>)
    	    				  
    	  },
    	];

    return (
    	<Table columns={columns} dataSource={data} />
    );
  }
}  

export default FilterableProductTable;
