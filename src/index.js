import React from 'react';
import "./index.less"
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'

/**
 * 演示redux、react-redux等
 */
import App from './App'
import store from './store/'
// import { Provider } from './kReactRedux/'

//demo示例
import Demo from './demo/index'
ReactDOM.render(
  <Provider store={store}>
    <Demo />
  </Provider>,
  document.getElementById('root')
);


/**
 * 演示react核心代码
 */
//手写react核心代码
// import {jsx} from './pages/reactPage/ReactPage'
// import ReactDOM from './kreact/react-dom'
// import ReactDOM from './kreact/react-dom-fiber'

// ReactDOM.render(jsx,document.getElementById("root"))