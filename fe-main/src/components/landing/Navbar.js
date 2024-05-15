import React, { useState, useEffect } from "react";
import { Navbar, Nav, NavDropdown, Image } from "react-bootstrap";
import { Link, useLocation, useHistory } from "react-router-dom"; 
import "../style/Home.css";
import logo from "../images/logo.png";
import profileImage from "../images/partisipan.jpg"; // Impor gambar profil

const Header = () => {
  const [partisipanNama, setPartisipanNama] = useState(""); // State untuk menyimpan nama partisipan
  const [partisipanFoto, setPartisipanFoto] = useState(profileImage); // State untuk menyimpan foto partisipan
  const currentPath = useLocation().pathname;
  const history = useHistory();

  useEffect(() => {
    const partisipan_nama = localStorage.getItem('partisipan_nama');
    const partisipan_foto = localStorage.getItem('partisipan_foto_profile'); // Ambil foto profil dari local storage
    if (partisipan_nama) {
      setPartisipanNama(partisipan_nama);
    }
    if (partisipan_foto) {
      setPartisipanFoto(partisipan_foto); // Atur foto profil ke dalam state jika ada
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('partisipan_id');
    localStorage.removeItem('partisipan_nama');
    localStorage.removeItem('partisipan_email');
    localStorage.removeItem('partisipan_foto_profile');
    history.push('/');
  };

  const handleDropdownClick = (url) => {
    // Fungsi untuk mengarahkan pengguna ke URL yang diinginkan
    history.push(url);
  };

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
          <NavDropdown title="Mental Well Test" id="navbarDropdown" onClick={() => handleDropdownClick("/mentalwelltest-user")} style={{ color: "#000", fontWeight: "bold" }}>
            <NavDropdown.Item href="/dass42detail-user">DASS-42</NavDropdown.Item>
            <NavDropdown.Item href="/intervensidetail-user">Intervensi</NavDropdown.Item>
            <NavDropdown.Item href="/suicide-user">Suicide</NavDropdown.Item>
          </NavDropdown>
          <Nav.Link as={Link} to="/about-us" className={`nav-link ${currentPath === "/about-us" ? "active" : ""}`} style={{ color: "#000", fontWeight: "bold" }}>
            About Us
          </Nav.Link>
          <Nav.Link as={Link} to="/psikolog-list" className={`nav-link ${currentPath === "/psikolog-list" ? "active" : ""}`} style={{ color: "#000", fontWeight: "bold" }}>
            Psikolog List
          </Nav.Link>
        </Nav>
        <Nav>
          {partisipanNama && (
            <Link to="/partisipan-profile" className="nav-link" style={{ color: "#000", fontWeight: "bold", display: "flex", alignItems: "center" }}>
              <Image src={partisipanFoto} alt="Profile" roundedCircle style={{ width: '30px', height: '30px', marginRight: '5px' }} /> {/* Tampilkan foto profil */}
              Hi, {partisipanNama}!
            </Link>
          )}
          <Nav.Link as={Link} to="/partisipan-login" className="nav-link" style={{ color: "#000", fontWeight: "bold" }} onClick={partisipanNama ? handleLogout : null}>
            {partisipanNama ? "Logout" : "Login"}
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
