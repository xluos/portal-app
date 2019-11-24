import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';
import * as serviceWorker from './serviceWorker';
import FrameWork from './lib/framework'
// import { Component } from './utils/loadable'
// import { Icon } from 'antd'
function getSubApp () {
  return new Promise(res => {
    setTimeout(() => {
      res({
        routes: [
          // {
          //   name: '菜单3-sub',
          //   path: '/cc-sub',
          //   icon: 'up-square',
          //   exact: true,
          //   // disableAsideMenu: true,
          //   // disableHeaderMenu: true,
          //   component: Component(() => import(/* webpackChunkName: "c" */ './pages/c')),
          // },
          // {
          //   name: 'Setting-sub',
          //   path: '/setting-sub',
          //   icon: (<Icon type="setting" />),
          //   component: Component(() => import(/* webpackChunkName: "c" */ './pages/setting')),
          // }
        ]
      })
    }, 300);
  })
}
FrameWork.render = async function () {
  const subAppConfig = await getSubApp()
  ReactDOM.render(<App subAppConfig={subAppConfig}/>, document.getElementById('root'));
}

FrameWork.start()

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
