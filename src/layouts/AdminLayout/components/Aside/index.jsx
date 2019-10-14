import React from 'react'
import Menu from './menu.jsx'
import stores from '../../../../stores';
import { MAX_WIDTH } from '../../../../stores/common';
import './index.less'

export default function Aside ({ logo }) { 
  const { asideWidth, media } = stores.useStore('common')
  const isMobile = media === 'isMobile'
  return (
    <nav 
      className="admin-layout-aside fixed"
      style={{
        width: !isMobile ? asideWidth : MAX_WIDTH
      }}>
      <div 
        className="logo-box"
        style={isMobile ? {boxShadow: `0 1px 0 0 #e8e8e8`} : {}}>
        { logo || <div className="logo"></div>}
      </div>
      <Menu className="admin-layout-aside__menu"></Menu>
    </nav>
  )
}