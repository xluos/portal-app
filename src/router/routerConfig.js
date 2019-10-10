import { Component } from '../utils/loadable'
// import A from '../pages/a'

const routerConfig = [
  {
    path: '/a',
    component: Component(() => import(/* webpackChunkName: "a" */ '../pages/a'))
  },
  {
    path: '/aa',
    component: Component(() => import(/* webpackChunkName: "aa" */ '../pages/aa'))
  },
  {
    path: '/ab',
    component: Component(() => import(/* webpackChunkName: "ab" */ '../pages/ab'))
  },
  {
    path: '/b',
    component: Component(() => import(/* webpackChunkName: "b" */ '../pages/b'))
  },
  {
    path: '/bb',
    component: Component(() => import(/* webpackChunkName: "bb" */ '../pages/bb'))
  },
  {
    path: '/c',
    component: Component(() => import(/* webpackChunkName: "c" */ '../pages/c'))
  },
  {
    path: '/setting',
    component: Component(() => import(/* webpackChunkName: "c" */ '../pages/setting'))
  },
]

export default routerConfig