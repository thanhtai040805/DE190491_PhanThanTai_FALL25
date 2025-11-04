import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";

const Header = () => {
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="#home">Logo</Navbar.Brand>
        <Nav className="me-auto"></Nav>
        <Navbar.Collapse className="justify-content-end gap-2">
          {/* <Nav.Link href="" className="text-white">
            Login
          </Nav.Link> */}
          <Nav.Link href="/" className="text-white">
            Home
          </Nav.Link>
          <Nav.Link href="/videos" className="text-white">
            Videos
          </Nav.Link>
          <Nav.Link href="/comment-form" className="text-white">
            Conment Form
          </Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
