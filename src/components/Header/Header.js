import React, { Component } from 'react'
import { Link } from 'gatsby';
import sizeMe  from 'react-sizeme';
import { connect } from "react-redux";
import { updateHeaderHeight } from '../../actions/layout';
import Menu from '../Menu';

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

        <img src="http://openpayments.io/wp-content/uploads/2017/11/Open-Payments_Logotype_Gold.png" style={{float: 'left'}}/>
        <div
          style={{
            margin: '0 auto',
            maxWidth: 1360,
            padding: '0.8rem 1.0875rem',
          }}
        >
          <div style={{
          //  float: 'left',
            marginBottom: '0.8em',
          }}>
            <h1 style={{ margin: 0, fontSize: "3.25rem", marginLeft: '4.25em'}}>
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
          <Menu />
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = {
  updateHeaderHeight
}

export default connect(()=>({}), mapDispatchToProps) (sizeMe({monitorHeight: true})(Header))
