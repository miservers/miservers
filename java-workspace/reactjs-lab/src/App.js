import React from 'react';



import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

import {Container, Grid, Paper}  from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";
import FilterableProductTable from './FilterableProductTable';
import Home from './Home';
import Users from './Users';
import MedAppBar from './MedAppBar';
import LeftMenu from './LeftMenu';

const useStyles = makeStyles({
	navBar : {
		height: 80,
		backgroundColor: 'orange',
	},
	menu : {
		height: '100%',
		backgroundColor: 'lightgreen',
		height: 'auto',
	},
	body : {
		height: '100%',
		height: 'auto',
	},
});

function App() {
	const classes = useStyles();
	
	return (
		<MedAppBar /> 
	);
};


export default  App;