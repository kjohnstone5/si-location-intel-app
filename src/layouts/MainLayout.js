import React from "react";
import { useHistory } from 'react-router-dom';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "./MainLayout.css";
import { LinkContainer } from "react-router-bootstrap";
import { useAppContext } from "../libs/contextLib";

function MainLayout({ children }) {
  const { isAuthenticated } = useAppContext();
  const { userHasAuthenticated } = useAppContext();
  const history = useHistory();

  function handleLogout() {
    userHasAuthenticated(false);
    console.log("log out");
    history.push("/login");
  }
  return (
    <>
      <div className="MainLayout container py-3">
        <Navbar collapseOnSelect expand="md" className="mb-3 login-nav">
          <LinkContainer to="/">
            <Navbar.Brand href="/" className="font-weight-bold text-muted">
              Location INTEL
          </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Nav activeKey={window.location.pathname}>
              <LinkContainer to="/">
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/locations">
                <Nav.Link>Locations</Nav.Link>
              </LinkContainer>
              {isAuthenticated ? (
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              ) : (<div></div>)}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <div className="Main-Layout-Body">
          {children}
        </div>
      </div>
    </>
  );
}
export default MainLayout;