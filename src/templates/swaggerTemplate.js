import React from 'react'
import Layout from '../components/Layout'
import Button from 'antd/lib/button'
import 'antd/lib/button/style/css'
import { Link } from "gatsby"
import { connect } from 'react-redux'

class Swagger extends React.Component {
    componentDidMount() {
      window.SwaggerUI({
          dom_id: '#swagger',
          url: this.props.spec
          //url: 'https://api.swaggerhub.com/apis/openpayments/ASPSPInformationService/v1'
      });
    }
    render() {
      return <div id="swagger" />
    }
  }

function Template({pageContext}) {
    return (
        <Layout>
            <Swagger spec={pageContext.spec} />
        </Layout>
    )
}


export default connect() (Template)
