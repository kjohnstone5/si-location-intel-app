import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "./AuthLayout.css";
import { LinkContainer } from "react-router-bootstrap";
import { ReactComponent as OmnitracsLogo } from '../images/Omnitracs Logo CMYK.svg';

function AuthLayout({children}) {    
    return (
        <>
            <div className="AuthLayout container py-3">
                <Navbar collapseOnSelect expand="md" className="mb-3 login-nav">
                    <LinkContainer to="/welcome">
                        <Navbar.Brand href="/welcome" className="font-weight-bold text-muted">
                            <OmnitracsLogo />
                        </Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Nav activeKey={window.location.pathname}>
                            <LinkContainer to="/welcome">
                                <Nav.Link>Home</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/login">
                                <Nav.Link>Log In</Nav.Link>
                            </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <div className="Auth-Layout-Body">
                    {children}
                </div>
            </div>
        </>
    );
}
export default AuthLayout;