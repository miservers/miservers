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

const useStyles = makeStyles({
	navBar : {
		height: 48,
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
		<Router>	
			<Grid container spacing={0}>
				<Grid item xs={12} className={classes.navBar}>
					Nav Bar 
				</Grid>
				<Grid item xs={3} className={classes.menu}>
					<ul>
						<li><Link to="/"> Home </Link></li>
						<li>
							<Link to="/users"> Users </Link>
						</li>
						<li>
							<Link to="/product"> Products </Link>
						</li>
					</ul>	
				</Grid>
				<Grid item xs={9}  className={classes.body}>
					<Switch>
						<Route path="/" exact>
							<Home />
						</Route>
						<Route path="/users">
							<Users />
						</Route>
						<Route path="/product">
							<FilterableProductTable />
						</Route>
					</Switch>
				</Grid>
			</Grid>
		</Router>
	);
};


export default  App;