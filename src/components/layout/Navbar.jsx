import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";

const NavBar = () => {
  return (
    <div>
      <Navbar expand="lg" bg="light" variant="light">
        <Container>
          <Navbar.Brand href="/">
            <h4>RepGen</h4>
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">
              <h4>Домой</h4>
            </Nav.Link>
            <Nav.Link href="/results">
              <h4>Результаты</h4>
            </Nav.Link>
            <Nav.Link href="/about">
              <h4>Руководство</h4>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;
