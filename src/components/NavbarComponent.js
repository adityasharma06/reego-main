import React, { useState } from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import logo from '../logo.png';
import './NavbarComponent.css';

const NavbarComponent = () => {
  const [expanded, setExpanded] = useState(false);

  const handleNavCollapse = () => setExpanded(false);

  return (
    <Navbar expanded={expanded} onToggle={setExpanded} expand="lg" className="navbar-custom">
      <Container>
        <Navbar.Brand href="/">
          <img src={logo} alt="Logo" className="navbar-logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto custom-nav-links">
            <Nav.Link href="/" onClick={handleNavCollapse}>Home</Nav.Link>
            <Nav.Link href="/about" onClick={handleNavCollapse}>About</Nav.Link>
            <NavDropdown
              title="Product"
              id="product-dropdown"
              className="custom-dropdown"
            >
              <NavDropdown.Item href="/Chairs" onClick={handleNavCollapse}>
                Chairs
              </NavDropdown.Item>
              <NavDropdown.Item href="/Tables" onClick={handleNavCollapse}>
                Tables
              </NavDropdown.Item>
              <NavDropdown.Item href="/Sets" onClick={handleNavCollapse}>
                Table and Chair Sets
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/contact" onClick={handleNavCollapse}>Contact</Nav.Link>
            <Nav.Link href="/login" onClick={handleNavCollapse}>Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
