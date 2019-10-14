import React, { useEffect, useState, useRef } from 'react';
import { Switch, Route } from 'react-router-dom';
import { getLayoutRoute, getRanderRouteData } from '../../utils'
import NotFound from '../../components/NotFound';
import routerData from '../../router/routerConfig';

function MainRoutes () {
  const basicRoute = useRef([])
  const randerRouteData = useRef([])
  useEffect(() => {
    basicRoute.current = getLayoutRoute(routerData, 'basic')
    randerRouteData.current = getRanderRouteData(basicRoute.current)
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

      {/* 未匹配到的路由重定向到 <Guide> 组件，实际情况应该重定向到 404 */}
      <Route component={NotFound} />
    </Switch>
  )
}

export default MainRoutes;
