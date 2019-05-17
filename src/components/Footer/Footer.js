import React, { Component } from "react";
import './Footer.css'
import Container from '../Container';

class Footer extends Component {
    render() {
        return (
            <footer className='footer'>
                <div className='container'>
                    <div className='content-container'>
                        <div className='aboutus footer-box'>
                            <h2>About us</h2>
                            <p>
                                Open Payments Europe provides the groundbreaking market infrastructure required for successful Open Banking.
                                The Open Payments Platform is a PSD2 compliant API aggregation platform that offers a single,
                                open and secure point of access to the diverse bank API networks throughout Europe.
                        </p>
                        </div>
                        <div className='contact footer-box'>
                            <h2>Contact</h2>
                            <i className='mat-list-icon mat-icon mat-accent material-icons'>email</i>
                            <div className='contact-row'>                                
                                <h5>Email</h5>
                                <p><a href="mailto:support@openpayments.io">support@openpayments.io</a></p>
                            </div>
                            <i className='mat-list-icon mat-icon mat-accent material-icons'>location_on</i>
                            <div className='contact-row'>                                
                                <h5>Address</h5>
                                <p>
                                    Open Payments Europe<br />
                                    Mäster Samuelsgatan 36<br />
                                    111 57 Stockholm, Sweden
                                </p>
                            </div>
                        </div>
                        <div className='disclaimer footer-box'>
                            <h2>Disclaimer</h2>
                            <p>
                                As <a href="https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32015L2366" target="_blank">PSD2</a> is still in transition for banks to adhere to the <a href="https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32018R0389" target="_blank">RTS</a>, this sandbox version is using banks beta APIs.
                            </p>
                            <a className="social-icon linkedin" href="https://www.linkedin.com/company/openpayments" target="_blank"></a>
                            <a className="social-icon twitter" href="http://twitter.com/openpaymentseu" target="_blank"></a>
                            <a className="social-icon facebook" href="https://www.facebook.com/openpayments" target="_blank"></a>
                        </div>
                    </div>
                </div>
                <div className='footer-box-bottom'>
                    <small> © {new Date().getFullYear()} Open Payments Europe AB</small>
                </div>

            </footer>

        )
    }
}

export default Footer
