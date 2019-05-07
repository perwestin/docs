import React from 'react'
import Layout from '../components/Layout'
import 'antd/lib/button/style/css'
import { connect } from 'react-redux'
import "swagger-ui/dist/swagger-ui.css"

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
