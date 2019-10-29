import React, { useCallback } from 'react'
import { Icon } from 'antd'
import stores from '../../../../stores';
import './index.less'
export default function Header () {
  const { toggleCollapsed, collapsed } = stores.useStore('common')
  // eslint-disable-next-line
  const toggle = useCallback(() => { console.log('usecb'); toggleCollapsed() }, [])
  return (
    <header className="admin-layout-header">
      <div className="trigger">
        <Icon
          className="trigger-btn"
          type={collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={toggle}
        />
      </div>
      <div className="content">
        <span>header</span>
      </div>
    </header>
  )
}