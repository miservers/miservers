import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import FilterableProductTable from './FilterableProductTable';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <FilterableProductTable />
  </React.StrictMode>,
  document.getElementById('root')
);


serviceWorker.unregister();
