import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Menu, Icon } from 'antd';
import { asideMenuConfig } from '../../../../router/menuConfig'

const { SubMenu } = Menu;

export default function AsideMenu({collapsed}) {
  let [menuData, setMenuData] = useState(asideMenuConfig)
  useEffect(() => {
    (window.app || (window.app = {})).pushMenu = (menu) => {
      setMenuData([...menuData, menu])
    }
  })
  return (
    <Menu
      mode="inline"
      inlineCollapsed={collapsed}>
      {menuData.map((item, index) => {
        if (item.children && item.children.length) {
          return (
            <SubMenu 
              key={index}
              title={
                <>
                  <Icon type="pie-chart" />
                  <span>{item.name}</span>
                </>
              }>
              {item.children.map((item2, j) => {
                return (
                  <Menu.Item key={index + '-' + j}><Link to={item2.path}><Icon type="pie-chart" />{item2.name}</Link></Menu.Item>
                )
              })}
            </SubMenu>
          )
        } else {
          return (
            <Menu.Item key={index}><Link to={item.path}><Icon type="pie-chart" /><span>{item.name}</span></Link></Menu.Item>
          )
        }
      })}
    </Menu>
  )
}