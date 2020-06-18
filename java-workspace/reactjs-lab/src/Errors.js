
import React from 'react';

import ReactDOM from "react-dom";

import Alert from '@material-ui/lab/Alert';

export default function ServerError ({message}) {
    
    if (!message)
        return '';

    const showMessage = (mess) => {
        if (!mess.status)
            return;

        if (mess.status == 200)
            return  <Alert severity="success" 
                           variant="outlined">{mess.message}</Alert>
        else                
            return  <Alert severity="error" 
                            variant="outlined">{mess.message}</Alert>;
                    
    }

	return (
        <div>
            {showMessage(message)}
        </div>
	);
}
