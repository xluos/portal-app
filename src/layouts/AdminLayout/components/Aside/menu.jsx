import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
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
    <Menu.Item key={menuData.key}>
      <Link to={menuData.path} target={menuData.linkTarget || ""}>
        {randerMenuTitle(menuData)}
      </Link>
    </Menu.Item>
  )
}

function randerSubMenu (menuData, index, tier = 0) {
  if (menuData.items) {
    return (
      <ItemGroup key={menuData.key} title={menuData.groupTitle}>
        {menuData.items.map((v, i) => randerMenu(v, `${index}_${i}`, tier + 1))}
      </ItemGroup>
    )
  } else if (menuData.children) {
    // return menuData.children.map((v, i) => randerMenu(v, i, tier + 1))
    return randerMenu(menuData, index, tier + 1)
  }
  return randerMenuItem(menuData, index, tier + 1)
}


function randerMenu (menuData, index, tier = 0) {
  if (menuData.children && menuData.children.length) {
    return (
      <SubMenu key={menuData.key} title={randerMenuTitle(menuData)}>
        {menuData.children.map((_, i) => randerSubMenu(_, `${index}_${i}`, tier))}
      </SubMenu>
    )
  } else {
    return randerMenuItem(menuData, index, tier)
  }
}


function AsideMenu () {
  const menuData = useRef([])
  const routeKeyHashMap = useRef({})
  const location = useLocation()
  let path = location.pathname
  let getAsideMenuData = getAsideMenu(getLayoutRoute(routerData))
  menuData.current = getAsideMenuData.data
  routeKeyHashMap.current = getAsideMenuData.hashMap
  let selectedKeys = [routeKeyHashMap.current[path].key]
  let openKeys = routeKeyHashMap.current[path].menu
  const { collapsed } = stores.useStore('common')
  return (
    <Menu
      mode="inline"
      forceSubMenuRender={true}
      defaultSelectedKeys={selectedKeys}
      defaultOpenKeys={openKeys}
      inlineCollapsed={collapsed}>
      {menuData.current.map((_, i) => randerMenu(_, i, 0))}
    </Menu>
  )
}

export default AsideMenu