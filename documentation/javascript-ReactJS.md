

### Install NodeJS on ubuntu 
~~~
wget -qO- https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt install -y nodejs
~~~


### Create a react Project

    npx create-react-app reactjs-demo

### start appli

    cd reactjs-demo
    npm start

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
~~~
class Toggle extends React.Component {
  
  constructor (props) {
    super(props);
    this.state = {isToggled: true, 
                  nbclicks: 0
                 };
  }

  handleClick = (event) => {
    this.setState (state => ({isToggled: !state.isToggled, nbclicks: state.nbclicks+1}));
  }

  render () {
    return (
      <div>
      <button onClick={this.handleClick} nbclicks='10'>
          Toggle: {this.state.isToggled?'ON':'OFF'}
      </button><br/>
      Clicks: {this.state.nbclicks}
      </div>
    );
  }
}
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

### Tools 
 * Visual Studio Code
 
### Best components
 * https://github.com/mui-org/material-ui
 * https://material-ui.com/getting-started/templates/dashboard/
 

### Test your front-end against a real API
 * https://github.com/public-apis/public-apis
 * https://reqres.in/api/users
 * https://reqres.in



### Important code/tags
 * lg : The number of columns on large devices (≥992px)
 * md, sm, xl, xs : colomns on medium (≥768px), small (≥576px) ,extra large(≥1200px), extra small  (<576px) devices  
 
### References
 * https://fr.reactjs.org/docs/

















