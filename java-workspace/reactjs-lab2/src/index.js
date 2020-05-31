import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SampleBootStrap from './SampleBootStrap';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <React.StrictMode>

  <SampleBootStrap />

  </React.StrictMode>,
  document.getElementById('root')
);


serviceWorker.unregister();
