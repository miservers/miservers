import React from 'react';
import ReactDOM from 'react-dom';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import './css/index.css';
import Header from './Header';
import Footer from './Footer';
import MedAppBar from './MedAppBar';
import MedMenu from './MedMenu';
import Body from './Body';
import ListUsers from './ListUsers';
import * as serviceWorker from './serviceWorker';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function CenteredGrid() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={1}>
          <Paper className={classes.paper}>xs=1</Paper>
        </Grid>
        <Grid item xs={11}>
          <Paper className={classes.paper}><MedAppBar/></Paper>
        </Grid>
        <Grid item xs={2}>
          <Paper className={classes.paper}><MedMenu/></Paper>
        </Grid>
        <Grid item xs={10}>
          <Paper className={classes.paper}><ListUsers/></Paper>
        </Grid>
        <Grid item xs={1}>
          <Paper className={classes.paper}>xs=1</Paper>
        </Grid>
        <Grid item xs={11}>
          <Paper className={classes.paper}>Footer</Paper>
        </Grid>
        </Grid>
    </div>
    );
  }

  ReactDOM.render(
    <React.StrictMode>
      <CenteredGrid />
      </React.StrictMode>,
    document.getElementById('root')
  );
  
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
