import React from 'react';
import ReactDOM from 'react-dom/client';
import { Root } from './Root';
import 'bulma/css/bulma.css';
import './global.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);

