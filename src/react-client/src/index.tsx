import 'bootstrap/dist/css/bootstrap.css';
// import 'bootswatch/dist/flatly/bootstrap.css';
import 'normalize.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Application from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Application />
    </BrowserRouter>
  </React.StrictMode>
);
