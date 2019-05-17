import React, { Component } from "react";
import './Footer.css'
import Container from '../Container';

class Footer extends Component {
    render() {
        return (
            <footer className='footer'>
                <div className='container'>
                    <small>© {new Date().getFullYear()}- <a href="" target="_blank">Open Payments Europe AB</a>  - <a href="https://auth.sandbox.openbankingplatform.com/client/privacy">Privacy</a> - <a href="https://auth.sandbox.openbankingplatform.com/client/cookies">About Cookies</a></small>
                </div>
            </footer>

        )
    }
}

export default Footer
