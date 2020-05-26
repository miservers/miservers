

### Install NodeJS on ubuntu 
~~~
wget -qO- https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt install -y nodejs
~~~

### Create an app and start 
my-app.js

~~~
var http = require('http');
var port = 3000;
http.createServer(function (req, res) {
res.writeHead(200, {'Content-Type': 'text/html'});
res.write('Welcome to NodeJS !');
res.end();
}).listen(port);
console.log("Server run on http://localhost:"+port);
~~~

start

    node my-app.js


### Create a react Project

    npx create-react-app reactjs-demo
    cd reactjs-demo
    npm start

**Errors**   
unexpected end of json input while parsing near npx create-react-app   
--> solution : npm cache clear --force

### Hooks

### material ui
 * https://github.com/mui-org/material-ui
 * https://material-ui.com/getting-started/templates/dashboard/
 
 * Grid : Material Design’s responsive UI is based on a 12-column grid layout.

### css3 Flexbox
Example
~~~
.flex-container {
  display: flex;
  flex-wrap: wrap;
  background-color: Blue;
  flex-direction: row-reverse;
}
.flex-container > div {
  background-color: #f1f1f1;
  margin: 10px;
  padding: 20px;
  font-size: 30px;
}
To use it
<div class="flex-container">
  <div>1</div>
  <div>2</div>
  <div>3</div>  
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
    this.state = {isToggled: true, nbclicks: 0};
    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick () {
    this.setState (state => ({isToggled: !state.isToggled, nbclicks: state.nbclicks+1}));
  }

  render () {
    return (
      <div>
      <button onClick={this.handleClick}>
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
 

















