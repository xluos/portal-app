/**
 * 定义应用路由
 */
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
// import BasicLayout from './layouts/BasicLayout';
// import FedLayout from './layouts/FedLayout';

// 按照 Layout 归类分组可以按照如下方式组织路由

export default function RouterContainer () {
  return  (
    <Switch>
      <Route path="/" component={AdminLayout} />
      {/* <Route path="/base/" component={BasicLayout} />
      <Route path="/" component={FedLayout} /> */}
    </Switch>
  )
}
