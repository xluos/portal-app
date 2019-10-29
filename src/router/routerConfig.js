import React from 'react'
import { Icon } from 'antd'
import { Component } from '../utils/loadable'
// import A from '../pages/a'
// 默认启用的请使用 disableXXX，默认禁用的请使用 enableXXX
// layout 默认 admin 无模板为 base

const route = [
  {
    name: '菜单1',
    path: '/a',
    icon: 'play-circle',
    children: [
      {
        name: '菜单1-1',
        path: '/aa',
        icon: 'pic-right',
        children: [
          {
            name: '菜单1-1-1',
            path: '/bbc',
            icon: 'fullscreen',
            linkTarget: '_blank',
            component: Component(() => import(/* webpackChunkName: "bb" */ '../pages/bb')),
          },
          {
            name: '菜单1-1-2',
            path: '/ab',
            icon: 'rollback',
            layout: 'base',
            component: Component(() => import(/* webpackChunkName: "ab" */ '../pages/ab')),
          },
        ]
      },
      {
        name: '菜单1-2',
        path: '/ab',
        icon: 'rollback',
        component: Component(() => import(/* webpackChunkName: "ab" */ '../pages/ab')),
      },
    ],
  },
  {
    name: '菜单2',
    path: '/b',
    icon: 'rollback',
    children: [
      {
        groupTitle: 'item1',
        items: [
          {
            name: '菜单2-1-1',
            path: '/bb',
            icon: 'rollback',
            component: Component(() => import(/* webpackChunkName: "bb" */ '../pages/bb')),
          },
          {
            name: '菜单2-2-2',
            path: '/bb',
            layout: 'base',
            component: Component(() => import(/* webpackChunkName: "bb" */ '../pages/bb')),
          },
        ]
      },
      {
        groupTitle: 'item2',
        items: [
          {
            name: '菜单2-2',
            path: '/c',
            icon: 'up-square',
            component: Component(() => import(/* webpackChunkName: "c" */ '../pages/c')),
          },
        ]
      }
      
    ],
  },
  {
    name: '菜单3',
    path: '/cc',
    icon: 'up-square',
    exact: true,
    disableAsideMenu: true,
    disableHeaderMenu: true,
    component: Component(() => import(/* webpackChunkName: "c" */ '../pages/c')),
  },
  {
    name: 'Setting',
    path: '/setting',
    icon: (<Icon type="setting" />),
    component: Component(() => import(/* webpackChunkName: "c" */ '../pages/setting')),
  },
  {
    name: 'Setting',
    layout: 'basic',
    path: '/base/setting',
    icon: (<Icon type="setting" />),
    component: Component(() => import(/* webpackChunkName: "c" */ '../pages/setting')),
  },
  {
    name: 'demo',
    layout: 'basic',
    path: '/base/demo',
    icon: (<Icon type="setting" />),
    component: Component(() => import(/* webpackChunkName: "c" */ '../pages/menu.demo')),
  },
];
export default route