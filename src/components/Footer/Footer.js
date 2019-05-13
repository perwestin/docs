import React, { Component } from "react";
import './Footer.css'
import Container from '../Container';

class Footer extends Component {
    render() {
        return (
            <Container backgroundColor="rgb(29, 41, 55)">
                <footer className='footer'>
                    <div className='aboutus'>
                        <h2>About us</h2>
                    </div>
                    <div className='contact'>
                        <h2>Contact</h2>
                    </div>
                </footer>
            </Container>
        )
    }
}

export default Footer
