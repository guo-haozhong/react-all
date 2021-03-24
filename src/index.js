import React from 'react';
import ReactDOM from 'react-dom';
// import './pages/demo/index.css';
// import reportWebVitals from './reportWebVitals';
import App from './App'
import store from './pages/store/'
import { Provider } from './pages/kReactRedux'
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

