import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import  Menu from './Menu';
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";
import Routes from './Routes';
import {useStyles} from '../styles/LayoutStyles';

export default function Layout() {
  const classes = useStyles();
  
  return (
    
    <div className={classes.root}>
      <CssBaseline />
      
      <Router>

        <Menu />

        <main className={classes.content}>
          <Routes />
        </main>
	    
      </Router>	

    </div>
  );
}
