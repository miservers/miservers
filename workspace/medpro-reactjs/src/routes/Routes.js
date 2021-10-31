import React from 'react';

import {Switch,Route} from "react-router-dom";

import Home from '../Home';
import Accounting from '../Accounting';
import Patients from '../patients/Patients';
import PatientRecord from '../patients/PatientRecord';
import Appointment from '../Appointment';
import WaitingRoom from '../WaitingRoom';
import Drugs from '../Drugs';
 
export default function Routes() {

return (
    <Switch>
        <Route path="/" exact>
            <Home />
        </Route>
        <Route path="/patients" exact>
            <Patients />
        </Route>
        <Route path="/patients/record/:pid">
            <PatientRecord />
        </Route>
        <Route path="/waitingroom">
            <WaitingRoom />
        </Route>
        <Route path="/appointment">
            <Appointment />
        </Route>
        <Route path="/drugs">
            <Drugs />
        </Route>
        <Route path="/accounting">
            <Accounting />
        </Route>
        
    </Switch>
);
}

