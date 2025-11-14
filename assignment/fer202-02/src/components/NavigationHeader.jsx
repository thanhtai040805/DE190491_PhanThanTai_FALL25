// NavigationHeader.jsx là component thanh điều hướng chung chứa thông tin đăng nhập và nút Logout
import React from "react";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext.jsx";
import { useNavigate, Link } from "react-router-dom";
const NavigationHeader = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const fullName = user?.fullName || user?.username;
  
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  
  return (
    <Navbar bg="light" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/home"></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            <Nav.Link as={Link} to="/home" className="text-dark">
              <img src={"./images/logo.png"} alt="Logo" width="50" height="50" />
            </Nav.Link>
            <Nav.Link as={Link} to="/users" className="text-dark ">
              Personal Budget Management
            </Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            <Navbar.Text className="me-3 text-dark">
              Signed in as: <strong>{fullName}</strong>
            </Navbar.Text>
            <Button variant="outline-dark" onClick={handleLogout}>
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default NavigationHeader;
