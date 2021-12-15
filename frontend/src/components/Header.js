import React from 'react'
import {Navbar, Nav, Container} from 'react-bootstrap'
import {LinkContainer} from "react-router-bootstrap"

const Header = () => {
    return (
        <header>
            <Navbar bg="transparent"  expand="lg" collapseOnSelect style={{background: 'none' , borderBottom: '1px solid #fff'  }}>
                <Container>
                    <LinkContainer to ="/">
                         <Navbar.Brand ><span className='header-text'>X-Shop </span></Navbar.Brand>
                    </LinkContainer>
                    
                    <Navbar.Toggle aria-controls="basic-navbar-nav" style= {{background: 'white'}}/>
                    <Navbar.Collapse id="basic-navbar-nav">

                    <Nav className="ms-auto">
                    <LinkContainer to ="/cart">
                        <Nav.Link><i className='fas fa-shopping-cart header-text'></i><span className='header-text'>Cart</span></Nav.Link>
                    </LinkContainer>
                    <LinkContainer to ="/login">
                        <Nav.Link><i className='fas fa-user header-text'></i><span className='header-text'>Sign In</span></Nav.Link>
                    </LinkContainer>
                    <LinkContainer to ="/About">
                        <Nav.Link><i className='fas fa-globe header-text'></i><span className='header-text'>About</span></Nav.Link>
                    </LinkContainer>
                        
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
