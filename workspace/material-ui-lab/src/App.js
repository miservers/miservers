import React from 'react';



import ReactDOM from 'react-dom';
import './index.css';

import { makeStyles } from '@material-ui/core/styles';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from './layout/Layout';

import { MuiPickersUtilsProvider } from '@material-ui/pickers';
// pick a date util library
import DateFnsUtils from '@date-io/date-fns';

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
		<MuiPickersUtilsProvider utils={DateFnsUtils}>
			<Layout /> 
		</MuiPickersUtilsProvider>
	);
};


export default  App;