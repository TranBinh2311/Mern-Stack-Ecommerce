import React from 'react'
import {Container, Col, Row} from 'react-bootstrap';


const Footer = () => {
    return (
        <footer>
            <Container>
                <Row>
                    <Col className='text-center py-3'>
                    Copyright &copy; By BinhTV7
                    </Col>
                    <div className='icon-row'>
                        <a style = {{color: 'white'}} href='https://www.facebook.com/profile.php?id=100015374085386'><i className='fab fa-facebook'></i></a>
                        <a style = {{color: 'white'}} href='https://www.facebook.com/profile.php?id=100015374085386'><i className='fab fa-twitter'></i></a>
                        <a style = {{color: 'white'}} href='https://www.facebook.com/profile.php?id=100015374085386'><i className='fab fa-instagram'></i></a>
                        <a style = {{color: 'white'}} href='https://www.facebook.com/profile.php?id=100015374085386'><i className='fab fa-youtube'></i></a>
                     </div>
                </Row>
            </Container>
            {/* <h2>About us</h2>
            <p>
                Welcome to X-Shop Chanel.
                Here you can buy everything with cheapest price.
            </p>
            <h3> Copyright &copy; By BinhTV7</h3>
            <div className='icon-row'>
                <a href='https://www.facebook.com/profile.php?id=100015374085386'><i className='fab fa-facebook'></i></a>
                <a href='https://www.facebook.com/profile.php?id=100015374085386'><i className='fab fa-twitter'></i></a>
                <a href='https://www.facebook.com/profile.php?id=100015374085386'><i className='fab fa-instagram'></i></a>
                <a href='https://www.facebook.com/profile.php?id=100015374085386'><i className='fab fa-youtube'></i></a>
            </div> */}
        </footer>
    )
}

export default Footer
