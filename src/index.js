import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './router/ClientRoutes';
import { Provider } from 'react-redux';
import store from './redux/reduxConfig/store'

import './style/styles.scss';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Routes />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
