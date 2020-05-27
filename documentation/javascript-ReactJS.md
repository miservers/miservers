

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

### Hooks

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
  return (
    <div className="App">
      <h2 style={{backgroundColor: "lightblue", color: "red"}}>List of Users</h2>
    </div>
  );
}
~~~

**CSS file**: new style class must be prefixed with parent name ("App-")
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
Props are arguments passed to composants:
~~~
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

<div className="App">
  <Welcome name="papa" />
</div>
~~~

### State
State is a object containing attributes of the class. use setState to update a class attribute.
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
function ListItems (props) {
  let items = props.items;
  return (
    items.map(item => <li>{item}</li>)
  );
}
~~~

You can use this function to display a list of todos
~~~
const users = [{id: 1}, 'item2', 'item3'];
...
<ul>
    <ListItems items={todo} />
</ul>
~~~

### Forms
~~~
class SignupForm extends React.Component {

    handleSubmit = (event) => {
        event.preventDefault();

        const data = new FormData(event.target);
        
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
 * https://reqres.in/api/users
 * https://reqres.in/api/ 



### Important code/tags
 * lg : The number of columns on large devices (≥992px)
 * md, sm, xl, xs : colomns on medium (≥768px), small (≥576px) ,extra large(≥1200px), extra small  (<576px) devices  
 

















