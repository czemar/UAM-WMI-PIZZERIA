import React from 'react';
import ReactDOM from 'react-dom';

// -- Components --
import App from './app/app';

// -- Styles --
import './styles/main.scss';

// -- Main rendering function --
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
