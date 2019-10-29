import React, { useEffect, useState, useRef } from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
import { getLayoutRoute, getRedirectData, getRanderRouteData } from '../../utils'
import NotFound from '../../components/NotFound';
import routerData from '../../router/routerConfig';

function MainRoutes () {
  const adminRoute = useRef([])
  const redirectData = useRef([])
  const randerRouteData = useRef([])
  useEffect(() => {
    adminRoute.current = getLayoutRoute(routerData, 'admin')
    redirectData.current = getRedirectData(adminRoute.current)
    randerRouteData.current = getRanderRouteData(adminRoute.current)
    console.log(randerRouteData)
  }, [])

  let [appRoute, setAppRoute] = useState(routerData)
  /**
   * 渲染路由组件
   */
  const renderNormalRoute = (item, index) => {
    return item.component ? (
      <Route
        key={`route-${index}`}
        path={item.path}
        component={item.component}
        exact={item.exact}
      />
    ) : null;
  };
  useEffect (() => {
    (window.app || (window.app = {})).pushRoute = (route) => {
      setAppRoute([...appRoute, route])
    }
  })
  return (
    <Switch>
      {/* 渲染路由表 */}
      {randerRouteData.current.map(renderNormalRoute)}

      {/* 路由重定向，嵌套路由默认重定向到当前菜单的第一个路由 */}
      {redirectData.current.map((item, index) => {
        return <Redirect key={index} exact from={item.from} to={item.to} />;
      })}

      {/* 首页默认重定向到 /dashboard */}
      {/* <Redirect exact from="/admin" to="/admin/dashboard/monitor" /> */}

      {/* 未匹配到的路由重定向到 <Guide> 组件，实际情况应该重定向到 404 */}
      <Route component={NotFound} />
    </Switch>
  )
}

export default MainRoutes;
