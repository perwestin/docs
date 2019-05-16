import React, { Component } from 'react'
import { Link } from 'gatsby';
import sizeMe from 'react-sizeme';
import { connect } from "react-redux";
import { updateHeaderHeight } from '../../actions/layout';
import Logo from './Logo.js';

class Header extends Component {
  componentDidUpdate = () => {
    this.props.updateHeaderHeight(this.props.size.height)
  }

  setLink() {
    if (window.location.pathname === '/') {
      return (
        <div className='header'>
          <Logo />
        </div>)
    } else {

      return (
        <div className='header'>
          <Link to= '/'>
            <Logo />
          </Link>
        </div>
      )
    }
  }

  render() {
    // const { siteTitle } = this.props

    return this.setLink()
  }
}

const mapDispatchToProps = {
  updateHeaderHeight
}

export default connect(() => ({}), mapDispatchToProps)(sizeMe({ monitorHeight: true })(Header))
