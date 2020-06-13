### Install NodeJS on ubuntu 
~~~
wget -qO- https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt install -y nodejs
~~~

### Commandes
 
### Start/Stop node server

~~~
  node app.js
~~~

### Create a react Project

    npx create-react-app reactjs-demo

### start appli

    cd reactjs-demo
    npm start

### Install a module : NPM

    npm install --save react-router-dom
    
### Install all dependencies
defined in package.json

~~~
npm install
~~~

### create-react-app template

**advanced configuration**  
https://create-react-app.dev/docs/advanced-configuration

To define environment variables, create a file called **.env** in the root of your project.  
For example to change port from 3000 to 5000

~~~
//.env
PORT=5000

# other parameters
HOST=localhost

~~~
 


**Errors**   
unexpected end of json input while parsing near npx create-react-app   
--> solution : npm cache clear --force

### React ES6
#### Arrow functions
before 

~~~
sayHello = function() {
              return "Hello !";
}
~~~

with arrow

~~~
sayHello = () => {
            return "Hello ";
}
~~~
if parameter

~~~
sayHello = (name) => {
            return "Hello " + name;
}
~~~

#### this and Arrow functions
Arrow functions have no binding of **this**.  
With arrow functions, the **this**  represents the object that defined the arrow function.

### let var const
**let**: variable has a block scope, like Java.  
**var**: has a function scope. but not a block scope(visible outside a block).
**const** :  has a block scope. once created its value can never change.

### Components
Components are like JavaScript functions. They accept arbitrary inputs (called “props”) and return React elements describing what should appear on the screen.

~~~javascript
// Function components
function Welcome(props) {
  return <h1>Hello {props.name}</h1>;
}

// Class component
class Welcome extends React.Component {
  render() {
    return <h1>Hello {this.props.name}</h1>;
  }
}

// This component can bee used like
<Welcome   name="youssef"/> // display : Hello youssef
~~~

### Component lifecycle
 * **constructor(props)**
 * **render()**
 * **componentDidMount()**: invoked immediately after the component is insrted into the tree. If you need to load data from a remote endpoint, this is a good place to instantiate the network request. call **setState()** immediately in componentDidMount().
 * **componentDidUpdate()** . is invoked immediately after updating occurs. This is also a good place to do network requests

### Hooks
**useState** : create an new instance of **State** object.

~~~javascript
const MyFunctionCompenent = (props) => {
    let [name, setName] = useState('');
         
    return (
        <input type="text" onChange={(event) => setName(event.target.value)}></input>
        <h2>Hello {name}</h2>
    )
}
~~~

**useEffect** : like componentDidMount, this hook is called immediately after component creation. 
Syntax  

~~~
useEffect(sideEffectFunction, [stateToTrack]);
~~~

**Example with Class and Hook**:

**With Class**:

~~~javascript
class Users extends React.Component {
  
  constructor (props){
    super(props);
    this.state = {users: [], selectedRow: -1,};
  }
  
  componentDidMount () {
    fetch ('http://127.0.0.1:8080/api/user')
      .then (response => response.json())
      .then (data => this.setState(state => state.users = data));
  }

 render () {
    
    return (
     <div>
      <ul>
        {this.state.users.map (user => <li>{user.username}</li>)}
      </ul>
      </div>
    )
  }
} 

export default Users;
~~~

**with Hook**: 

~~~javascript
import React , {useState, useEffect} from 'react';

const API_URL = 'http://127.0.0.1:8080/api/user';
  
export default function Users (props) {
  const [users, setUsers]       = useState([]); //users=[] empty table
  const [selectedRow, setSelectedRow] = useState(-1); 

  
  useEffect(()=> {
        loadData();
        }, []);
  
  const loadData = async () => {
                 await fetch (API_URL)
                    .then (response => response.json())
                    .then (data => setUsers(data)); 
                }
                
  return (
    <div>
      <ul>
      {users.map (user => <li>{user.username}</li>)}
      </ul>
    </div>
  );
} 
~~~


### material ui
 * https://github.com/mui-org/material-ui
 * https://material-ui.com/getting-started/templates/dashboard/
 
 * Grid : Material Design’s responsive UI is based on a 12-column grid layout.
### React UI Layout Grids
https://blog.bitsrc.io/12-react-ui-layout-grid-components-and-libraries-for-2019-16e8aa5d0b08
 * Grommet 
   ** https://storybook.grommet.io

### css3 Flexbox
Example

~~~
// CSS
.flex-container {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row-reverse;
}
To use it
<div class="flex-container">
...
</div>
~~~
### React CSS 
**Inline styles** : use camelCased for two names properties.Ex: **backgroundColor** instead of **background-color**.

~~~
function App() {

  const myStyle = {
     padding: '10px',
     border: '1px solid green',
     backgroundColor: "DodgerBlue",
  }

 return (
     return (
    <div className="App" style={myStyle}>
      <h2 style={{backgroundColor: "lightblue", color: "red"}}>List of Users</h2>
    </div>
  );
}
~~~

**CSS file**: 

~~~
//App.css
.App-ListUsers {
  list-style-type: circle;
  color: aqua;
}
~~~
In App.js 

~~~
import './App.css';
...
function App() {
  return (
    <div className="App">
      <ul className="App-ListUsers">
        <ListUsers users={lusers} />
      </ul>
    </div> 
  );
~~~



### Props
Props are variables passed to component by its parent component.  
 * Props should never be changed in a child component. 
 * Props are equivalent to parameters of a pure javascript function.
 * Props are immutable.
 
~~~
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

<div className="App">
  <Welcome name="papa" />
</div>
~~~

### State
L’état local est réservé à l’interactivité, c’est-à-dire aux données qui évoluent dans le temps.
It is a object containing attributes of the class. use setState to update an attribute.   
[StateDemo.js](../java-workspace/reactjs-lab2/src/StateDemo.js)  

~~~javascript
 const styles = {margin: "10px"};

 class StateDemo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {product: '', price: 0, quantity: 0}
    }

    handleChange = (event) => {
        if (event.target.name == 'product')
            this.setState ({product: event.target.value})
        else if (event.target.name == 'price')
            this.setState ({price: event.target.value})
        
    } 

    render () {
        return (
            <div>
                <h2>State Demo</h2><hr/>
                Product:
                <input type="text" name="product" onChange={this.handleChange} style={styles}/>
                Price:
                <input type="text" name="price" onChange={this.handleChange} style={styles}/>
                <br/>
                <b>Added product: {this.state.product}, price: {this.state.price} DH</b>

            </div>
        );
    }
}
~~~

**Do Not Modify State Directly**  

~~~javascript
// Wrong
this.state.comment = 'Hello';

// Correct
this.setState({comment: 'Hello'});
~~~


**setState(function)**: a second form of setState() that accepts a function rather than an object.

~~~javascript
this.setState((state, props) => ({counter: state.counter + props.increment}));
~~~

### Lists
~~~
const lusers = [{id: 1, name: 'allal'}, 
                {id: 2, name: 'jilali'},
                {id: 3, name: 'boulam'}];
                
function ListUsers (props) {
      const listItems = props.users.map(user => <li key={user.id}>{user.name}</li>);
      return (
          {listItems}
  );
}

function App() {
  return (
    <div className="App">
        <ul className="App-ListUsers">
          <ListUsers users={lusers} />
        </ul>
        ...
~~~
     
### Forms

~~~
class SignupForm extends React.Component {

    handleSubmit = (event) => {
        event.preventDefault();

        const data = new FormData(event.target);

        const username = data.get('username').toLocaleLowerCase();        
        data.set ('username', username);

        fetch ('/services/signup', {
            method: 'POST',
            body: data,                                  
        }).then(response => console.log(response));
    }

    render () {
        return (
            <div>
            <form onSubmit={this.handleSubmit}>    
            <label> Username:
                <input type="text" name="username" id="username"></input>
            </label>
            <label> Email:
                <input type="email" name="email" id="email"></input>
            </label>
            <br />    
            <button type="submit" value="Submit" name="Submit" >Submit</button>
    
            </form>
            </div>

        );
    }
}
~~~

### Spaces
add {' '} to return block:

~~~javascript
      <Button variant="primary">primary</Button>{' '}
      <Button variant="success">success</Button>{' '}
~~~

### text Align
Text Center 

~~~javascript
  <h2 className="text-center">Aligned text</h2>
~~~

### Tricks
**Export, Import var/const**
Export var/const 

~~~javascript
export var users = [ {}, {}, ];
~~~
Import var/const

~~~javascript
import {users} from './User';
~~~

### JSX

[jsx in depth](https://fr.reactjs.org/docs/jsx-in-depth.html)

**JSX code**

~~~javascript
<MyButton color="blue" shadowSize={2}>
  Cliquez ici
</MyButton>
~~~
is compiled to  :

~~~javascript
React.createElement(
  MyButton,
  {color: 'blue', shadowSize: 2},
  'Cliquez ici'
)
~~~

**Composant must start with Majuscule**:

~~~javascript
// incorrect!. write Hello insteed
function hello(props) {
  return <div>bonjour {props.toWhat}</div>;
}
~~~

**Spread Attributes**(**...**)
App1 and App2 are equivalent

~~~javascript
function App1() {
  return <Greeting firstName="wld" lastName="bni" />;
}

function App2() {
  const props = {firstName: 'wld', lastName: 'bni'};
  return <Greeting {...props} />;
}
~~~

### React code style
https://github.com/airbnb/javascript/tree/master/react

### Tools 
 * **Visual Studio Code**
 
### json-server : API to develop a Prototype  
**Install json-server**

~~~ 
npm install -g json-server 
~~~

**Define your Data in db.json file**

~~~
{
    "Products": [
        {"category": "Sporting Goods", "price": "$49.99", "stocked": true, "name": "Football"},
        {"category": "Sporting Goods", "price": "$9.99", "stocked": true, "name": "Baseball"},
        {"category": "Sporting Goods", "price": "$29.99", "stocked": false, "name": "Basketball"},
        {"category": "Electronics", "price": "$99.99", "stocked": true, "name": "iPod Touch"},
        {"category": "Electronics", "price": "$399.99", "stocked": false, "name": "iPhone 5"},
        {"category": "Electronics", "price": "$199.99", "stocked": true, "name": "Nexus 7"}
    ],
    "users": [ 
        { "id": 1, "name": "Lorem ipsum"}, 
        { "id": 2, "name": "Taurex Aile"} 
     ] 
}  
~~~

**Start json-server**

~~~
json-server -p 2707 db.json
~~~

**Access to Resources**   
  * http://localhost:2707/Products  
  * http://localhost:2707/users  


### Best components
 * **material-ui** : it is compatible with React-bootstrap
 * **React-bootstrap** : React implementation of JQery Bootstrap
 * **React Router**

### React Bootstrap
Usage :

~~~javascript
import 'bootstrap/dist/css/bootstrap.min.css';

<TableContainer className="w-50 mx-auto">
   ...
~~~

### React Router
~~~
npm install react-router-dom
~~~

### Material UI
 * Tables : very good tables https://material-table.com/#/
 

### Test your front-end against a real API
 * https://github.com/public-apis/public-apis
 * https://reqres.in/api/users
 * https://reqres.in



### Important code/tags
 * lg : The number of columns on large devices (≥992px)
 * md, sm, xl, xs : colomns on medium (≥768px), small (≥576px) ,extra large(≥1200px), extra small  (<576px) devices  
 
### Hard Errors 
 * Has been blocked by CORS policy  No 'Access-Control-Allow-Origin' header is present  
   ==> Add **@CrossOrigin** on the spring controller class. 
   
 * Error when installing a module: Unexpected end of JSON input while parsing near  
   ==> npm cache clean --force

### References
 * https://fr.reactjs.org/docs/
 * https://create-react-app.dev
 * https://www.w3schools.com/bootstrap
 * [Best React Libraries](https://www.robinwieruch.de/react-libraries)
 * [code style](https://github.com/airbnb/javascript/tree/master/react)
 * [React+Ant example](https://medium.com/wesionary-team/how-to-implement-ant-design-with-react-7d21b6e261cc)
 * [jsx in depth](https://fr.reactjs.org/docs/jsx-in-depth.html)

















