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
import  LeftMenu from './LeftMenu';
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";
import Routes from './Routes';
import {useStyles} from '../styles/LayoutStyles';

export default function MedAppBar() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleToggleMenu = () => {
    setOpen(!open);
  };

  return (
    
    <div className={classes.root}>
      <CssBaseline />
      
      <Router>
          <Drawer
            variant="permanent"
            className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
            })}
            classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
            }}
          >
          <div className={classes.toolbar}>
            <IconButton onClick={handleToggleMenu}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </div>

          <LeftMenu />
        
        </Drawer>	
        
        <main className={classes.content}>
          <Routes />
        </main>
	    </Router>	

    </div>
  );
}
