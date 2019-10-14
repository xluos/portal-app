import React, { useState, useCallback } from 'react'
import { Drawer } from 'antd';
import stores from '../../stores';
import MainRoutes from './MainRoutes'
import Aside from './components/Aside'
import Header from './components/Header'
import Content from './components/Content'
import Footer from './components/Footer'
import './index.less'

export default function AdminLayout() {
  const { asideWidth, media, collapsed, toggleCollapsed } = stores.useStore('common')
  // eslint-disable-next-line
  const onClose = useCallback(() => toggleCollapsed(true), [])
  return (
    <div>
      {media === 'isMobile' ? (
        <Drawer
          placement="left"
          closable={false}
          onClose={onClose}
          visible={!collapsed}
        >
          <Aside />
        </Drawer>) : (<Aside />)}
      <section 
        className="admin-layout-main" 
        style={{
          paddingLeft: media === 'isMobile' ? 0 : asideWidth
        }}>
        <Header />
        <Content>
          <MainRoutes/>
        </Content>
        <Footer />
      </section>
    </div>
  )
}