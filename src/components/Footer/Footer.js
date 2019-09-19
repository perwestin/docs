import React, { Component } from "react";
import './Footer.css'

class Footer extends Component {
    render() {
        return (
            <footer className='footer'>
                <div className='container'>
                    <small>© {new Date().getFullYear()}- <a href="https://openpayments.io" target="_blank" rel="noopener noreferrer">Open Payments Europe AB</a>  - <a href="https://auth.sandbox.openbankingplatform.com/client/privacy">Privacy</a> - <a href="https://auth.sandbox.openbankingplatform.com/client/cookies">About Cookies</a></small>
                </div>
            </footer>

        )
    }
}

export default Footer
