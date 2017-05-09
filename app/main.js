import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider, } from 'react-redux';

import App from './App.jsx';

import reducer from './reducer.js';

const store = createStore(reducer, window.devToolsExtension && window.devToolsExtension());

ReactDOM.render(
  <Provider store={ store }>
    <App />
  </Provider>, document.getElementById('app')
);
