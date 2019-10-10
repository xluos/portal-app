import React, { useState } from 'react'
import { Layout, Menu, Icon } from 'antd';
import { useMedia } from '../../utils/hook'
import MainRoutes from './MainRoutes'
import AsideMenu from './components/Aside'
import './index.css'
const { Header, Sider, Content } = Layout;

export default function AdminLayout() {
  let MEDIA = useMedia()
  let [collapsed, setCollapsed] = useState(MEDIA !== 'isDesktop')
  const toggle = function () {
    setCollapsed(!collapsed)
  }
  return (
    <Layout>
      <Sider 
        collapsible 
        theme="light"
        trigger={null}
        collapsed={collapsed} 
        collapsedWidth={80}>
        <div className="logo" />
        <AsideMenu collapsed={collapsed} />
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }}>
          <Icon
            className="trigger"
            type={collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={toggle}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            background: '#fff',
            minHeight: 280,
          }}
        >
          <MainRoutes/>
        </Content>
      </Layout>
    </Layout>
  )
}