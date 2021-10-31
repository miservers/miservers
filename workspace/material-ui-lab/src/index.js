import React from 'react';

import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';


ReactDOM.render(

	<React.StrictMode>
  
  	<div>
  		<App />
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);


serviceWorker.unregister();
