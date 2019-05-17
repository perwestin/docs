import React from 'react'
import Layout from '../components/Layout'
import { connect } from 'react-redux'
import "swagger-ui/dist/swagger-ui.css"

class Swagger extends React.Component {
    componentDidMount() {
      window.SwaggerUI({
          dom_id: '#swagger',
          url: this.props.spec
      });
    }
    render() {
      return <div id="swagger" />
    }
  }

function Template({pageContext}) {

    return (
        <Layout sidebarRoot="/docs" pathname={pageContext.pathname}>
            <Swagger spec={pageContext.spec} />
        </Layout>
    )
}

export default connect() (Template)
