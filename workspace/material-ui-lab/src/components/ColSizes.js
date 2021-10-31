import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    backgroundColor: 'green',
  },
}));



function MediaQueryWidth(width) {
  const matches = useMediaQuery(`(min-width:${width})`);

  return <span>{`(min-width:${width}) matches: ${matches}...`}</span>;
}
              
              
export default function ColSizes() {
  const classes = useStyles();


  const colSize = 1; // TO BE CHanged: 1..12

  const StyledGrid = (props) => 
              <Grid item {...props}>
                <Paper className={classes.paper}>xs={props.xs} sm={props.sm} lg={props.lg}</Paper>
              </Grid>;


  // dont change
  const colNb = 12;  
  const col = <Grid item xs={colSize} sm={colSize} lg={colSize}>
                <Paper className={classes.paper}>xs={colSize} sm={colSize} lg={colSize}</Paper>
              </Grid>;
             
  let cols=[], i;
  for (i = 0; i<colNb/colSize; i++)
    cols[i] = col;
             
  return (
    <div className={classes.root}>
      <Grid container 
            spacing={1}>
        {cols}
        
        <StyledGrid item xs={12} sm={12} lg={12} />
        <StyledGrid item xs={12} sm={6} lg={12} />
        <StyledGrid item xs={6} sm={12} lg={12} />
        <StyledGrid item xs={6} sm={6} lg={12} />
        <StyledGrid item xs={4} sm={6} lg={12} />
        <StyledGrid item xs={6} sm={8} lg={12} />
        <StyledGrid item xs={12} sm={12} lg={6} />

    
        {'sm:'} {MediaQueryWidth('600px')}
        {'md: '} {MediaQueryWidth('960px')}
        {'lg:'} {MediaQueryWidth('1280px')}
        {'xl:'} {MediaQueryWidth('1920px')}
        
      </Grid>
    </div>
  );
}
