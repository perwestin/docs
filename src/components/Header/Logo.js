import React from 'react'
import { graphql, StaticQuery } from "gatsby"
import Img from "gatsby-image"

export default () => (
    <StaticQuery
        query= {graphql`
        query {
          file(name: { eq: "logo-small" }) {
            childImageSharp {
              fixed(width: 40, height: 40) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      `}
      render={data =>
        <Img fixed={data.file.childImageSharp.fixed} alt="logo" />
      }
    />
)
