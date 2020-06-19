import React , {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';

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
