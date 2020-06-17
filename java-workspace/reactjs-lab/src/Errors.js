
import React from 'react';
import ReactDOM from "react-dom";

import Alert from '@material-ui/lab/Alert';

export default function ServerError ({error}) {
    if (!error)
        return null;

    console.log('vvvvvvvvv '+error);

	return (
    <div>
    
        {error instanceof window.Response ? (
            <Alert severity="error" 
            variant="outlined">
                Backend Server error <b>{error.status}</b>: {error.text}
                <br />
          <small>{error.statusText}</small>
            </Alert>
       
          ) : (<Alert severity="error" 
                variant="outlined">{error}</Alert>)
        }                

    </div>
	);
}
