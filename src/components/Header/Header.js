import React, { Component } from 'react'
import { Link } from 'gatsby';
import sizeMe from 'react-sizeme';
import { connect } from "react-redux";
import { updateHeaderHeight } from '../../actions/layout';
import Logo from './Logo.js';
import CookieConsent from './CookieConsent';

class Header extends Component {
  componentDidUpdate = () => {
    this.props.updateHeaderHeight(this.props.size.height)
  }

  render() {
    const logo = window.location.pathname === '/' ? <Logo/> : <Link to= '/'><Logo /></Link>

    return (
      <div className='header'>
        <CookieConsent />
        {logo}
        <a className = "register" href="/obp.postman_collection.json" target="_blank" rel="noopener noreferrer">
          Download Postman Collection
        </a>
        <a className="register" href="https://developer.openpayments.io" target="_blank" rel="noopener noreferrer">
          Create a developer account
        </a>
      </div>
    )
  }
}

const mapDispatchToProps = {
  updateHeaderHeight
}

export default connect(() => ({}), mapDispatchToProps)(sizeMe({ monitorHeight: true })(Header))
