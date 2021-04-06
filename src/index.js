// import React from 'react';
// import ReactDOM from 'react-dom';
/**
 * 演示redux、react-redux等
 */
// import App from './App'
// import store from './store/'
// import { Provider } from './kReactRedux/'
// ReactDOM.render(
//   <Provider store={store}>
//     <App />
//   </Provider>,
//   document.getElementById('root')
// );


/**
 * 演示react核心代码
 */
//手写react核心代码
import {jsx} from './pages/reactPage/ReactPage'
// import ReactDOM from './kreact/react-dom'
import ReactDOM from './kreact/react-dom-fiber'

ReactDOM.render(jsx,document.getElementById("root"))