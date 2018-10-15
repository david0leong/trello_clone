import React from 'react'
import { Link } from 'react-router-dom'
import { Layout, Menu } from 'antd'

import './style.css'

const { Header } = Layout

const AppHeader = () => (
  <Header className="app-header">
    <div className="app-logo">
      <Link to="/">Home</Link>
    </div>

    <Menu theme="dark" mode="horizontal" style={{ lineHeight: '64px' }}>
      <Menu.Item key="boards">
        <Link to="/boards">Boards</Link>
      </Menu.Item>
    </Menu>
  </Header>
)

export default AppHeader
