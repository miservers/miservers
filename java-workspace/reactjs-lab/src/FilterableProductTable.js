import React from 'react';

import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper}  from '@material-ui/core';
import './FilterableProductTable.css';
import { withStyles, makeStyles } from '@material-ui/core/styles';

/* Start json-server 
       json-server -p 2707 db.json
  
  const listProducts = [
                    {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
                    {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
                    {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
                    ]; 
*/
 
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
  
  inStock = (stocked)  => (stocked)? <span style={{display: "table-cell", color: "green"}}>in stock</span>
                                   : <span style={{display: "table-cell", color: "red"}}>out of stock</span>
                                   ;
                                        
  listProducts = (products) => products.map(product => <TableRow key={product.name}>
      												   		<TableCell>{product.name}</TableCell>
      														<TableCell>{product.price}</TableCell>
      												      	<TableCell>{this.inStock(product.stocked)}</TableCell>
      													</TableRow>);	
  render () {
    
    return (
      <TableContainer className="mx-auto" component={Paper}>
      	<Table responsive striped bordered hover size="sm">
      		<TableHead>
      			<TableRow>
      				<TableCell> Product </TableCell>
      				<TableCell> Price </TableCell>
      				<TableCell> Stock </TableCell>
      			</TableRow>
      		</TableHead>
      		<TableBody>
      			{this.listProducts(this.props.products)}
      		</TableBody>
        </Table>
      </TableContainer>
    );
  }
}  


export default FilterableProductTable;
