import React from 'react';  
import ReactDOM from 'react-dom';  
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'  
import About from './About';
import User from './User';
import {users} from './User';
import Home from './Home';
import NotFound from './NotFound';


export default function RouterDemo () {
    const userItems = users.map (user => <li><Link to={"/user/"+user.id}>User {user.id}</Link></li>);

    return (
        <Router>
            <h2 className="text-center">React Router Demo</h2><hr/>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
                {userItems}
            </ul>
            <Switch>
                <Route exact path="/" component={Home}></Route>
                <Route path="/about" component={About}></Route>
                <Route path="/user/:id" component={User}></Route>
                <Route component={NotFound} />
            </Switch>
        </Router>
        
    );
}