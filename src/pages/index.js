import React from 'react'
import Layout from '../components/Layout'
import Button from 'antd/lib/button'
import 'antd/lib/button/style/css'
import { Link } from "gatsby"

const IndexPage = () => {
  return (
    <Layout>
      <div>
        <div align="center">
        <br/>
          <p style={{color: "cornflowerblue", fontSize: 50, fontWeight: 'bold'}}>
            All the docs for Open Payments API
          </p>
          <h2>All you need to start developing with us at Open Payments</h2>
          <br/>
          <Link to="/docs/get-started/introduction">
            <Button type="primary" size="large" style={{marginRight: 10}}>Get Started</Button>
          </Link>
          <Button type="primary" size="large" href="https://github.com/openpayments/devportal">Github</Button>
        </div>
      </div>
    </Layout>
  )
}

export default IndexPage