import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
// import 'antd-mobile/dist/antd-mobile.css'; // (已经在package中设置了按需加载)
import 'font-awesome/css/font-awesome.min.css'
// 路由使用 history模式, build出来后访问的会是空白 （https://blog.csdn.net/bbsyi/article/details/78781826）
// import { BrowserRouter } from 'react-router-dom';
// 路由采用 hash模式
import { HashRouter } from 'react-router-dom'  // 此处若用HashRouter，App组件里就不用<Router>包括,<HashRouter>包括的都可以使用路由功能 

ReactDOM.render(
  // <React.StrictMode>   // 严格模式
  <HashRouter>
    <App />
  </HashRouter>,
  // </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
