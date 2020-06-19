import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import BootstrapDemo from './BootstrapDemo';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import RouterDemo from './RouterDemo'
import StateDemo from './StateDemo';
import Parent from './ChildParentState';

ReactDOM.render(
  <React.StrictMode>

  <StateDemo />
  <hr/><hr/>
  
  <RouterDemo />

  <hr/><hr/>
  <BootstrapDemo />

  <hr/><hr/>
  <Parent />

  </React.StrictMode>,
  document.getElementById('root')
);


serviceWorker.unregister();
