
const { replacePath, configurationOfType } = require('./utils')
const path = require("path")

module.exports = exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  const markdownTemplate = path.resolve(`src/templates/postTemplate.js`)
  const swaggerTemplate = path.resolve(`src/templates/swaggerTemplate.js`)

  return graphql(`
    {
      allMarkdownRemark(
        limit: 1000
      ) {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }

      allJson {
        edges {
          node {
            name
            link
            type
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }

    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: replacePath(node.fields.slug),
        component: markdownTemplate,
        context: {}, // additional data can be passed via context
      })
    })

    configurationOfType(result.data.allJson, "api").forEach((node) => {
      createPage({
        path: 'api/' + node.name.toLowerCase(),
        component: swaggerTemplate,
        context: {"spec": node.link, "pathname": 'api/' + node.name.toLowerCase()}
      })
    })
  })
}