import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  toolBar: {
    backgroundColor: '#FFA500',
  },
}));

export default function MedAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar>
        <Toolbar className={classes.toolBar}>
          <IconButton>
            <MenuIcon/>
          </IconButton>
          <IconButton>
            <AccountCircleIcon/>
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}
