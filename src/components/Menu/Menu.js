import React from 'react'
import { Link, graphql, StaticQuery } from 'gatsby'
import { configurationOfType } from '../../../gatsby/utils'

const Menu = () => {
  return (
    <StaticQuery
      query={graphql`
        query {
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
      `}
      render={data => {
        const menuItems = configurationOfType(data.allJson, 'menu')

        return (
          <div>
            {menuItems.map(item => {
              return (
                <div 
                  style={{ marginLeft: "2em", float: "right" }}
                  key={menuItems.indexOf(item)}
                >
                  <p style={{ margin:0, fontSize: "1rem" }}>
                    <Link
                      to={item.link}
                      style={{ color: 'white', textDecoration: 'none' }}
                    >
                      {item.name}
                    </Link>
                  </p>
                </div>
              )
            })}
          </div>
        )
      }}
    />
  )
}

export default Menu