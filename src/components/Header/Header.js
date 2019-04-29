import React, { Component } from 'react'
import { Link } from 'gatsby';
import sizeMe  from 'react-sizeme';
import { connect } from "react-redux";
import { updateHeaderHeight } from '../../actions/layout';
import Menu from '../Menu';
import Logo from './Logo.js';

class Header extends Component {
  componentDidUpdate = () => {
    this.props.updateHeaderHeight(this.props.size.height)
  }

  render() {
    const { siteTitle } = this.props

    return(
      <div
        style={{
          position: "fixed",
          top: 0,
          width: "100%",
          zIndex: 1000,
          background: '#1d2937',
          color: '#f8b83f',
          marginBottom: '1.45rem',
        }}
      >

        <Logo/>
        <div
          style={{
            margin: '0 auto',
            maxWidth: 1360,
            padding: '0.8rem 1.0875rem',
          }}
        >
          <div style={{
            marginBottom: '0.8em',
          }}>
            <h1 style={{ margin: 0, fontSize: "3.25rem", fontFamily: "BookAntiquaBold", marginLeft: '4.25em'}}>
              <Link
                to="/"
                style={{
                  color: '#f8b83f',
                  textDecoration: 'none'
                }}
              >
                {siteTitle}
              </Link>
            </h1>
          </div>
          { /* <Menu /> */ }
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = {
  updateHeaderHeight
}

export default connect(()=>({}), mapDispatchToProps) (sizeMe({monitorHeight: true})(Header))
