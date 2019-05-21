import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout";
import { connect } from 'react-redux'
import { onSidebarContentExpand } from '../actions/layout'
import "katex/dist/katex.min.css"
import "./postTemplate.css"
import { getSidebarExpandedKey } from "../store/selectors";

function Template({
  data, // this prop will be injected by the GraphQL query below.
  onSidebarContentExpand,
  expandedKey,
}) {
  const { markdownRemark, site } = data // data.markdownRemark holds our post data
  const { frontmatter, html, id, fields } = markdownRemark

  const editUrl = site.siteMetadata.githubBase + fields.slug + ".md"

  if (expandedKey !== id) {
    onSidebarContentExpand(id)
  }

  return (
    <Layout sidebarRoot={frontmatter.root} pathname={fields.slug}>
      <div className="blog-post-container">
        <a className="editme" href={editUrl}>Edit me.... </a>
        <div className="blog-post">
          <div
            className="blog-post-content"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>
    </Layout>
  )
}

const mapStateToProps = (state) => {
  return {
    expandedKey : getSidebarExpandedKey(state)
  }
}

const mapDispatchToProps = {
  onSidebarContentExpand,
}

export default connect(mapStateToProps, mapDispatchToProps) (Template)

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(fields: { slug: { eq: $path} }) {
      fields {
        slug
      }
      id
      html
      frontmatter {
        title
        root
      }
    }
    site {
      siteMetadata {
        githubBase
      }
    }
  }
`
