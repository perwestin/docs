import React from 'react'
import { graphql, StaticQuery } from "gatsby"
import Img from "gatsby-image"

export default () => (
    <StaticQuery
        query= {graphql`
        query {
          file(name: { eq: "logo" }) {
            childImageSharp {
              fixed(width: 200, height: 115) {
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
