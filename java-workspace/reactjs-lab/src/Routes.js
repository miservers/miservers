import React from 'react';

import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";

import FilterableProductTable from './FilterableProductTable';
import Home from './Home';
import Users from './Users';
import Accounting from './Accounting';
import Patient from './Patient';
import Appointment from './Appointment';
import WaitingRoom from './WaitingRoom';

 
export default function Routes() {

return (
    <Switch>
        <Route path="/" exact>
            <Home />
        </Route>
        <Route path="/patient">
            <Patient />
        </Route>
        <Route path="/waitingroom">
            <WaitingRoom />
        </Route>
        <Route path="/appointment">
            <Appointment />
        </Route>
        <Route path="/accounting">
            <Accounting />
        </Route>
        <Route path="/users">
            <Users />
        </Route>
        <Route path="/products">
            <FilterableProductTable />
        </Route>
    </Switch>
);
}

