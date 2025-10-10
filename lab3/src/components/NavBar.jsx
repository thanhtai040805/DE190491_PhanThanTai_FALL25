import React from "react";
import { Navbar, Nav, Form, Button, Dropdown, InputGroup, Container } from "react-bootstrap";

export default function NavBar() {
  const scrollToAccount = () => {
    const accountSection = document.getElementById('account-section');
    if (accountSection) {
      accountSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container>
        {/* Brand */}
        <Navbar.Brand href="#home">
          <i className="bi bi-film me-2"></i>
          MovieHub
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {/* Navigation Links */}
          <Nav className="me-auto">
            <Nav.Link href="#home">
              <i className="bi bi-house me-1"></i>
              Home
            </Nav.Link>
            <Nav.Link href="#about">
              <i className="bi bi-info-circle me-1"></i>
              About
            </Nav.Link>
            <Nav.Link href="#contact">
              <i className="bi bi-telephone me-1"></i>
              Contact
            </Nav.Link>
          </Nav>

          {/* Quick Search Form */}
          <Form className="d-flex me-3">
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Quick search..."
                name="quickSearch"
                style={{ width: "200px" }}
              />
              <Button variant="outline-light" type="submit">
                <i className="bi bi-search"></i>
              </Button>
            </InputGroup>
          </Form>

          {/* Right Side Icons */}
          <Nav className="d-flex align-items-center gap-3">
            {/* Accounts Dropdown */}
            <Dropdown>
              <Dropdown.Toggle variant="outline-light" size="sm" id="accounts-dropdown">
                <i className="bi bi-person-circle me-1"></i>
                Accounts
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={scrollToAccount}>
                  <i className="bi bi-person-gear me-2"></i>
                  Manage Your Profiles
                </Dropdown.Item>
                <Dropdown.Item onClick={scrollToAccount}>
                  <i className="bi bi-person-plus me-2"></i>
                  Build your Account
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={scrollToAccount}>
                  <i className="bi bi-key me-2"></i>
                  Change Password
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            {/* Login */}
            <Button variant="outline-light" size="sm" href="#login">
              <i className="bi bi-box-arrow-in-right me-1"></i>
              Login
            </Button>

            {/* Favourites */}
            <Button variant="outline-warning" size="sm" href="#favourites">
              <i className="bi bi-heart me-1"></i>
              Favourites
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
