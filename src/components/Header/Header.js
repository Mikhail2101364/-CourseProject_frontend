import React, { useState } from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import LogInForm from './LogInForm';
import RegForm from './RegForm';
import { useAuthData } from '../../hooks/useAuthData'

function Header() {


    const [showLogIn, setShowLogIn] = useState(false);
    const [showReg, setShowReg] = useState(false);

    const handleShowLogIn = () => setShowLogIn(true);
    const handleShowReg = () => setShowReg(true);
    const handleLogOut = () => {
        console.log('hangleLogOut')
        authLogOut(()=>{})
    }
    
    const { isAuth, authLogOut } = useAuthData(); 

    return (
        <div>
        <Navbar bg="dark" variant="dark" expand="lg" style={{ height: "15vh" }}>
            <Container>
                <Navbar.Brand href="/">My Collections</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav className="mr-auto">
                        <LinkContainer to="/">
                            <Nav.Link className='me-4'>Home</Nav.Link>
                        </LinkContainer>
                        {isAuth ? (
                            <>
                            <LinkContainer to="/user">
                                <Nav.Link className='me-4'>My Page</Nav.Link>
                            </LinkContainer>
                            <Button variant="outline-secondary" className='me-4' onClick={handleLogOut}>Log Out</Button>
                            </>
                        ) : (
                            <>
                            <Button variant="outline-secondary" className='me-4' onClick={handleShowLogIn}>Log In</Button>
                            <Button variant="outline-secondary" className='me-4' onClick={handleShowReg}>Create User</Button>

                            <LogInForm show={showLogIn} onHide={() => setShowLogIn(false)}/>
                            <RegForm show={showReg} onHide={() => setShowReg(false)}/>  
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

        
        </div>
  );
};

export default Header;