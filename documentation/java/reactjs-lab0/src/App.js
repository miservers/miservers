import React from 'react';
import logo from './logo.svg';
import './App.css';

function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

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
      <button onClick={this.handleClick} nbclicks='10'>
          Toggle: {this.state.isToggled?'ON':'OFF'}
      </button><br/>
      Clicks: {this.state.nbclicks}
      </div>
    );
  }
}


function ListUsers (props) {
  let users = props.users;
  return (
    users.map(user => <li key={ListUsers.id}>{user.name}</li>)
  );
}

const lusers = [{id: 1, name: 'allal'}, 
               {id: 2, name: 'jilali'},
               {id: 3, name: 'boulam'}];

function App() {
  return (
    <div className="App">
        <Welcome name="mama" />
        <Welcome name="papa" />

        <Toggle />
 
      <h2 style={{backgroundColor: "lightblue", color: "red"}}>List of Users</h2>
      <ul style={{listStyleType: "circle"}}>
        <ListUsers users={lusers} />
      </ul>

    </div>

    
  );
}

export default App;
