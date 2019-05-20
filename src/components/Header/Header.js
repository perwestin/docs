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

  render() {
    const logo = window.location.pathname === '/' ? <Logo/> : <Link to= '/'><Logo /></Link>

    return (
      <div className='header'>
        {logo}
        <a className = "register" href="/obp.postman_collection.json" target="_blank">Download Postman Collection</a>
        <a className="register" href="https://auth.sandbox.openbankingplatform.com/client/register" target="_blank">Register a client</a>
      </div>
    )
  }
}

const mapDispatchToProps = {
  updateHeaderHeight
}

export default connect(() => ({}), mapDispatchToProps)(sizeMe({ monitorHeight: true })(Header))
