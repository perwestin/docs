import React, { Component } from 'react'
import { graphql, StaticQuery, Link } from "gatsby"
import { connect } from "react-redux"
import { getSidebarState } from '../../store/selectors';
import { onSetSidebarOpen } from '../../actions/layout'
import Menu from 'antd/lib/menu'
import './SidebarContents.css'
import { pathPrefix } from '../../../gatsby-config'
import { configurationOfType } from '../../../gatsby/utils'

const SubMenu = Menu.SubMenu

const convertToTree = (markdownData, apiData) => {
  const markdownItems = markdownData.map(edge => {
      return ({
        path: edge.node.fields.slug,
        key: edge.node.id,
        title: edge.node.frontmatter.title,
        prio: edge.node.frontmatter.prio,
        parents: edge.node.frontmatter.parents
      })
    })
  const apiMenuItems = apiData.map(oneApi => {
      return ({
        path: "/api/" + oneApi.name.toLowerCase(),
        key: oneApi.name,
        title: oneApi.name,
        prio: oneApi.prio,
        parents: ["API"]
      })
    })
  apiMenuItems.push(...markdownItems)
  return constructTree(apiMenuItems)
}

const constructTree = (list) => {
  let tree = []
  let dir = []
  list.forEach(item => {
    if (item.parents === [] || item.parents === null) tree.push(item)
    else {
      let subtree = tree
      for (let i = 0; i < item.parents.length; i++) {
        if (subtree
          .filter(node => node.title === item.parents[i] && node.children)
          .length === 0) {
            const title = item.parents[i]
          const newNode = {
            key: "tree/" + title,
            title: title,
            children: [],
            prio: title === "API" ? 1 : 0
          }
          subtree.push(newNode)
          dir.push(newNode)
        }
        subtree = subtree.find(node => node.title === item.parents[i] && node.children).children
      }
      subtree.push(item)
    }
  })
  return [tree, dir]
}

const sortTree = tree => {
  tree.sort((a,b)=> {
    if (((a.children && b.children) || (!a.children && !b.children))) {
      if (a.prio === b.prio ) {
        return a.title < b.title
      }
      else return a.prio > b.prio
    } else if (a.children) {
      return -1
    }
    return -1
  })
}

class SidebarContents extends Component {
  onSetSidebarOpen = () => {
    this.props.onSetSidebarOpen(false)
  }

  render() {
    const { expandedKey } = this.props.sidebar
    const { root, pathname } = this.props
    return (
      <StaticQuery
        query={graphql`
          query sidebarContentQuery {
            allMarkdownRemark(sort: { order: ASC, fields: [fields___slug] }) {
              edges {
                node {
                  fields {
                    slug
                  }
                  id
                  frontmatter {
                    title
                    prio
                    parents
                  }
                }
              }
            }

            allApispecsJson {
              edges {
                node {
                  name
                  link
                  type
                  prio
                }
              }
            }      
          }
        `}
        render={data => {
          const markdownDocNodes = data.allMarkdownRemark.edges
            .filter(node => node.node.fields.slug.startsWith(root))
            .filter(node => node.node.frontmatter.parents[0] !== 'Orphaned')
          const apiNodes = configurationOfType(data.allApispecsJson, 'api')
          const [tree, dir] = convertToTree(markdownDocNodes, apiNodes)
          sortTree(tree)
          const loop = data => data.map((item) => {
            if (item.children) {
              sortTree(item.children)
              return (
                <SubMenu key={item.key} title={<span style={{fontWeight:900}}>{item.title}</span>}>
                  {loop(item.children)}
                </SubMenu>
              )
            }
            if (typeof pathname !== 'undefined' && pathname.includes(item.path)) {
              return (
                <Menu.Item key={item.key}>
                  {item.title}
                </Menu.Item>
              )
            }
            return (
              <Menu.Item key={item.key}>
                <Link to={item.path} onClick={this.onSetSidebarOpen}>{item.title}</Link>
              </Menu.Item>
            )
          })
          const path = typeof pathname !== 'undefined' ? pathname.replace(pathPrefix.slice(0,-1),"") : '';
          const selectedKeys = data.allMarkdownRemark.edges
            .filter(item => path === item.node.fields.slug ||
              (path.slice(0,-1) === item.node.fields.slug && path.slice(-1) === '/'))
            .length > 0 ? [expandedKey] : []
          const defaultOpenKeys = dir.map(item => item.key)
          return (
              <Menu 
                mode="inline"
                defaultOpenKeys={defaultOpenKeys}
                selectedKeys={selectedKeys}
                inlineIndent={12}
              >
                {loop(tree)}
              </Menu>
          )
        }}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    sidebar: getSidebarState(state)
  }
}

const mapDispatchToProps = {
  onSetSidebarOpen
}

export default connect(mapStateToProps, mapDispatchToProps) (SidebarContents)