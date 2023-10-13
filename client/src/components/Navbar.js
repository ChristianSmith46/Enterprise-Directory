import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

function NavBar({ onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/login");
  };

  return (
    <Navbar bg="light" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Enterprise Directory
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/predictsalary">
              Predict Salary
            </Nav.Link>

            <Nav.Link as={Link} to="/create">
              Create User
            </Nav.Link>
            {!localStorage.getItem("token") ? (
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
            ) : null}
            {localStorage.getItem("token") ? (
              <Nav.Link variant="link" onClick={handleLogout}>
                Logout
              </Nav.Link>
            ) : null}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
