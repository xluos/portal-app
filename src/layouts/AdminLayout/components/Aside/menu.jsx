import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Menu, Icon } from 'antd';
import routerData from '../../../../router/routerConfig'
import stores from '../../../../stores';
import { getAsideMenu, getLayoutRoute } from '../../../../utils'
const { SubMenu, ItemGroup } = Menu;

function randerMenuTitle (menuData) {
  return (
    <span className="menu-title">
      {typeof menuData.icon === 'string' ? (<Icon type={menuData.icon} />) : menuData.icon}
      <span className="menu-name">{menuData.name}</span>
    </span>
  )
}

function randerMenuItem (menuData, index, tier = 0) {
  return (
    <Menu.Item key={`menu-item-${tier}-${index}`}>
      <Link to={menuData.path}>
        {randerMenuTitle(menuData)}
      </Link>
    </Menu.Item>
  )
}

function randerSubMenu (menuData, index, tier = 0) {
  if (menuData.items) {
    return (
      <ItemGroup key={`group-${tier}-${index}`} title={menuData.groupTitle}>
        {menuData.items.map((v, i) => randerMenu(v, i, tier + 1))}
      </ItemGroup>
    )
  } else if (menuData.children) {
    return menuData.children.map((v, i) => randerMenu(v, i, tier + 1))
  }
  return randerMenuItem(menuData)
}


function randerMenu (menuData, index, tier = 0) {
  if (menuData.children && menuData.children.length) {
    return (
      <SubMenu key={`submenu-${tier}-${index}`} title={randerMenuTitle(menuData)}>
        {menuData.children.map(randerSubMenu)}
      </SubMenu>
    )
  } else {
    return randerMenuItem(menuData, index, tier)
  }
}


export default function AsideMenu () {
  const menuData = useRef([])
  const { collapsed } = stores.useStore('common')
  useEffect(() => {
    menuData.current = getAsideMenu(getLayoutRoute(routerData))
    // (window.app || (window.app = {})).pushMenu = (menu) => {
    //   setMenuData([...menuData, menu])
    // }
    console.log('menuData', menuData)
    console.log(menuData.current.map(randerMenu).join('\n'))
  }, [])
  return (
    <Menu
      mode="inline"
      inlineCollapsed={collapsed}>
      {menuData.current.map(randerMenu)}
    </Menu>
  )
}