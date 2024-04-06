import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom"; 
import "../style/Home.css";
import logo from "../images/logo.png";

const Header = () => {
  // Dapatkan path saat ini dari useLocation
  const currentPath = useLocation().pathname;

  return (
    <Navbar expand="lg" style={{ backgroundColor: "#C4EAF4", position: "relative", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }} fixed="top">
      <Navbar.Brand href="/">
        <img
          src={logo}
          alt="MentalWellLogo"
          width="13%" // Sesuaikan dengan tinggi yang diinginkan
          className="d-inline-block align-top"
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
      <Nav.Link as={Link} to="/" className={`nav-link ${currentPath === "/" ? "active" : ""}`} style={{ color: "#000", fontWeight: "bold" }}>
        Home
      </Nav.Link>
      <Nav.Link as={Link} to="/dailyinsight-user" className={`nav-link ${currentPath === "/reserv-user" ? "active" : ""}`} style={{ color: "#000", fontWeight: "bold" }}>
        Daily Insight
      </Nav.Link>
      <Nav.Link as={Link} to="/mentalwelltest-user" className={`nav-link ${currentPath === "/mentalwelltest-user" ? "active" : ""}`} style={{ color: "#000", fontWeight: "bold" }}>
        Mental Well Test
      </Nav.Link>
      <Nav.Link as={Link} to="/about-us" className={`nav-link ${currentPath === "/about-us" ? "active" : ""}`} style={{ color: "#000", fontWeight: "bold" }}>
        About Us
      </Nav.Link>
      <Nav.Link as={Link} to="/psikolog-list" className={`nav-link ${currentPath === "/psikolog-list" ? "active" : ""}`} style={{ color: "#000", fontWeight: "bold" }}>
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
