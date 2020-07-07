import React from 'react';
import {withStyles } from '@material-ui/core/styles';
import MuiTab from '@material-ui/core/Tab';

export  const Tab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    minWidth: '100px',
    marginRight: theme.spacing(0),
    '&:hover': {
      color: '#40a9ff',
      opacity: 1,
    },
    '&$selected': {
      color: '#1890ff',
    },
    '&:focus': {
      color: '#40a9ff',
    },
  },
  selected: {},
}))((props) => <MuiTab disableRipple {...props} />);


