import React, { Component } from "react";
import './Footer.css'
import Container from '../Container';

class Footer extends Component {
    render() {
        return (
            <Container backgroundColor="rgb(29, 41, 55)">
                <footer className='footer'>
                    <div className='aboutus footer-box'>
                        <h2><span>About us</span></h2>
                        <p>
                            Open Payments Europe provides the groundbreaking market infrastructure required for successful Open Banking. 
                            The Open Payments Platform is a PSD2 compliant API aggregation platform that offers a single, 
                            open and secure point of access to the diverse bank API networks throughout Europe.
                        </p>
                    </div>
                    <div className='contact footer-box'>
                        <h2>Contact</h2>
                        <div className="one-contact-row">
                            <div className="contact-header">Email</div>
                            <div className="contact-body"><a href="mailto:support@openpayments.io">support@openpayments.io</a></div>
                        </div>
                        <div className="one-contact-row">
                            <div className="contact-header">Address</div>
                            <div className="contact-body">
                                Open Payments Europe<br/>
                                Mäster Samuelsgatan 36<br/>
                                111 57 Stockholm, Sweden
                            </div>
                        </div>
                    </div>
                </footer>
            </Container>
        )
    }
}

export default Footer
