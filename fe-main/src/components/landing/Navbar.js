import React from "react";
import { Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom"; 
import "../style/Home.css";
import logo from "../images/logo.png";

const Header = () => {
  // Dapatkan path saat ini dari useLocation
  const currentPath = useLocation().pathname;

  return (
    <Navbar expand="lg" style={{ backgroundColor: "#C4EAF4", position: "relative" }} fixed="top" shadow="2">
      <Navbar.Brand href="#home">
        <img
          src={logo}
          alt="MentalWellLogo"
          width="10%" // Sesuaikan dengan tinggi yang diinginkan
          className="d-inline-block align-top"
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/" className={currentPath === "/" ? "active" : ""}>
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/dailyinsight-user" className={currentPath === "/reserv-user" ? "active" : ""}>
            Daily Insight
          </Nav.Link>
          {/* <NavDropdown
            title="Mental Well Test"
            id="basic-nav-dropdown"
            className={currentPath === "/mentalwelltest-user" ? "nav-item active" : "nav-item"}
          >
            <NavDropdown.Item as={Link} to="/srqtest-user">SRQ-20 Test</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/intervensi-user">Intervensi</NavDropdown.Item>
          </NavDropdown> */}
          <Nav.Link as={Link} to="/mentalwelltest-user" className={currentPath === "/mentalwelltest-user" ? "active" : ""}>
            Mental Well Test
          </Nav.Link><Nav.Link as={Link} to="/about-us" className={currentPath === "/about-us" ? "active" : ""}>
            About Us
          </Nav.Link>
          <Nav.Link as={Link} to="/psikolog-list" className={currentPath === "/psikolog-list" ? "active" : ""}>
            Psikolog List
          </Nav.Link>
        </Nav>
        <Nav>
          <Button variant="light" as={Link} to="/partisipan-login" type="button" className="btn btn-outline-info" style={{ backgroundColor: "#FFFFF", borderColor: "#239BB2", borderWidth: "3px" }}>
            Login
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
