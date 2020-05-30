import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import FilterableProductTable from './FilterableProductTable';
import MyFunctionCompenent from './HookDemo';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>

    <FilterableProductTable />

    <MyFunctionCompenent />
    
  </React.StrictMode>,
  document.getElementById('root')
);


serviceWorker.unregister();
