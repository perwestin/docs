import React from 'react'
import Layout from '../components/Layout'
import Button from 'antd/lib/button'
import 'antd/lib/button/style/css'
import { Link } from "gatsby"

const IndexPage = ({data}) => {
  console.log("-------------------------" + JSON.stringify(data.file))
  return (
    <Layout>
      <section id="intro-section" style={{
        background: "url('" + data.file.childImageSharp.fluid.src + "') no-repeat center center",
        backgroundSize: 'cover',
        height: '648px',
        margin: '0 auto'
      }}>
      <div>
          <div align="center" style={{
            paddingTop: '100px'
          }}>
              <h2 style={{color: 'white'}}>Developer portal</h2>
              <h1 style={{color: "white", fontWeight: 'bold'}}>
                All the docs for Open Payments API
              </h1>
              <p className="largerwhitetext">
                Open Payments Platform is a PSD2 compliant API aggregation platform that offers a single, open and secure point of access
                to the diverse bank API networks throughout Europe.
              </p>
              <p className="largerwhitetext">
                Open Payments Platform simplifies integration of third party application providers, e-commerce platforms and B2B systems.
              </p>
              <br/>
              <Link to="/docs/get-started/introduction">
                <Button type="primary" size="large" style={{marginRight: 10}}>Get Started</Button>
              </Link>
              <Button type="primary" size="large" href="https://github.com/openpayments/devportal">Fork me over at Github</Button>
          </div>
      </div>
      </section>
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    file(name: { eq: "home-bg" }) {
      childImageSharp {
        fluid(maxHeight: 648) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

export default IndexPage