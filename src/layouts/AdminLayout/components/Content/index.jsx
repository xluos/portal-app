import React from 'react'
import './index.less'
export default function Content ({ children }) {
  return (
    <main className="admin-layout-content">{children}</main>
  )
}