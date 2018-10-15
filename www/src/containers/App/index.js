import React from 'react'
import { Layout } from 'antd'

import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Main from '../Main'

import './style.css'

const { Content } = Layout

const App = () => (
  <Layout className="app-layout">
    <Header />

    <Content className="app-content">
      <Main />
    </Content>

    <Footer />
  </Layout>
)

export default App
