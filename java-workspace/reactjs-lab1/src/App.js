import React from 'react';
import logo from './logo.svg';
import './App.css';

/* JSON API send data like:
[
  {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
  {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
  {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
  {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
  {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
  {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
]; 
*/
class FilterableProductTable extends React.Component {
  
  render () {
    return (
      <div className="App-FilterableProductTable">
        <SearchBar />
        <ProductTable />
      </div>
    );
  }
}

class SearchBar extends React.Component {
  
  render () {
    return (
      <div>
        <input type="text" name="searchbar" id="searchbar"></input>
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
  
  render () {
    return (
      <div>
        <ProductTableHeader />
        <ProductCategoryRow name="Sporting Goods"/>
        <table>
          <ProductRow />
        </table>
      </div>
    );
  }
}

class ProductTableHeader extends React.Component {
  
  render () {
    return (
      <div>
        <table>
          <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
          </thead>
        </table>
      </div>
    );
  }
}

class ProductCategoryRow extends React.Component {
  constructor (props) {
    super (props);
  }

  render () {
    return (
      <div>
        <label>{this.props.name}</label>
      </div>
    );
  }
}

class ProductRow extends React.Component {

  render () {
    return (
      <div>
          <tr>
            <td>Football</td>
            <td>49.99DH</td>
          </tr>
          <tr>
            <td>Baseball</td>
            <td>9.99DH</td>
          </tr>
          <tr>
            <td>Basketball</td>
            <td>100.99DH</td>
          </tr>
      </div>
    );
  }
}

function App() {
  return (
    <div className="App">
      <FilterableProductTable />
    </div>

    
  );
}

export default App;
