import React, { useState, useEffect, useRef } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Menu, Icon } from 'antd';
import routerData from '../../../../router/routerConfig'
import stores from '../../../../stores';
import { getAsideMenu, getLayoutRoute } from '../../../../utils'
const { SubMenu, ItemGroup } = Menu;
const pathKeyMap = {}

function randerMenuTitle (menuData) {
  return (
    <span className="menu-title">
      {typeof menuData.icon === 'string' ? (<Icon type={menuData.icon} />) : menuData.icon}
      <span className="menu-name">{menuData.name}</span>
    </span>
  )
}

function randerMenuItem (menuData, index, tier = 0) {
  console.log('randerMenuItem')
  pathKeyMap[pathKeyMap[`menu-item-${tier}-${index}`] = menuData.path] = `menu-item-${tier}-${index}`
  return (
    <Menu.Item key={`path:${menuData.path}`}>
      <Link to={menuData.path} target={menuData.linkTarget || ""}>
        {randerMenuTitle(menuData)}
      </Link>
    </Menu.Item>
  )
}

function randerSubMenu (menuData, index, tier = 0) {
  if (menuData.items) {
    return (
      <ItemGroup key={`group-${tier}-${index}`} title={menuData.groupTitle}>
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
      <SubMenu key={`submenu-${tier}-${index}`} title={randerMenuTitle(menuData)}>
        {menuData.children.map((_, i) => randerSubMenu(_, `${index}_${i}`, tier))}
      </SubMenu>
    )
  } else {
    return randerMenuItem(menuData, index, tier)
  }
}


function AsideMenu ({location: {pathname}}) {
  const menuData = useRef([])
  const { collapsed } = stores.useStore('common')
  const [seleKeys, setSeleKeys] = useState(`path:${pathname}`)
  console.log('AsideMenu')
  useEffect(() => {
    menuData.current = getAsideMenu(getLayoutRoute(routerData))
    // (window.app || (window.app = {})).pushMenu = (menu) => {
    //   setMenuData([...menuData, menu])
    // }
    console.log('menuData', menuData)
  }, [])

  
  return (
    <Menu
      mode="inline"
      forceSubMenuRender={true}
      defaultSelectedKeys={[seleKeys]}
      // defaultOpenKeys={['submenu-0-0','submenu-1-0_0']}
      inlineCollapsed={collapsed}>
      {menuData.current.map((_, i) => randerMenu(_, i, 0))}
    </Menu>
  )
}

export default withRouter(AsideMenu)