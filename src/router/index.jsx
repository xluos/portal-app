/**
 * 定义应用路由
 */
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import BasicLayout from '../layouts/BasicLayout';
// import { useSubAppConfigContext } from '../stores'

// 按照 Layout 归类分组可以按照如下方式组织路由

export default function RouterContainer () {
  // const config = useSubAppConfigContext()
  // console.log('subAppConfig', config)
  return  (
    <Switch>
      <Route path="/base/" component={BasicLayout} />
      <Route path="/" component={AdminLayout} />
    </Switch>
  )
}
