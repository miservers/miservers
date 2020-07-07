import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';
import grey from '@material-ui/core/colors/grey';

export const useStyles = makeStyles((theme) => ({
  form: {
    '& > *': {
      marginLeft: theme.spacing(1),
      marginTop: theme.spacing(1),
    },  
    
  },

  button: {
    marginRight: theme.spacing(1),
  },
  
}));


export const styles = {
  cellStyle: {
    backgroundColor: grey[50],
    width: 'auto',
  },

}