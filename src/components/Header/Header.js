import React, { Component } from 'react'
import { Link } from 'gatsby';
import sizeMe  from 'react-sizeme';
import { connect } from "react-redux";
import { updateHeaderHeight } from '../../actions/layout';
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
      </div>
    )
  }
}

const mapDispatchToProps = {
  updateHeaderHeight
}

export default connect(()=>({}), mapDispatchToProps) (sizeMe({monitorHeight: true})(Header))
