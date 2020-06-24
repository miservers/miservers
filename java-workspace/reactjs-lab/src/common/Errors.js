
import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

import ReactDOM from "react-dom";

import Alert from '@material-ui/lab/Alert';

export default function ServerMessage ({status, message, onClose}) {
    
    const severity = () => (status==200)?'success':'error';
    
    return  (
        <Alert severity={severity()} 
                variant="outlined"
                onClose = {()=>onClose()}>
            {message}
        </Alert>
    )
}

PropTypes.ServerMessage = {
    status : PropTypes.number,
    message: PropTypes.string,
    open: PropTypes.bool  
};


