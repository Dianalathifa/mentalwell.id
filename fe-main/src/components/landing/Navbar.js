import React, { useState, useEffect } from "react";
import { Navbar, Nav, NavDropdown, Image } from "react-bootstrap";
import { Link, useLocation, useHistory } from "react-router-dom";
import logo from "../images/logo.png";
import profileImage from "../images/partisipan.jpg";
import reminderIcon from "../images/notification.png";
import "mdb-ui-kit/css/mdb.min.css";
import { Dropdown, Collapse, initMDB } from "mdb-ui-kit";
import Reminders from "../Partisipan/Reminder";
import "../style/Header.css";
initMDB({ Dropdown, Collapse });

const Header = () => {
  const [partisipanNama, setPartisipanNama] = useState("");
  const [partisipanFoto, setPartisipanFoto] = useState(profileImage);
  const [showReminders, setShowReminders] = useState(false);
  const [reminders, setReminders] = useState([]);
  const currentPath = useLocation().pathname;
  const history = useHistory();

  useEffect(() => {
    const partisipan_nama = localStorage.getItem('partisipan_nama');
    const partisipan_foto = localStorage.getItem('partisipan_foto_profile');
    if (partisipan_nama) {
      setPartisipanNama(partisipan_nama);
    }
    if (partisipan_foto) {
      setPartisipanFoto(partisipan_foto);
    }
  }, []);

  useEffect(() => {
    if (showReminders) {
      fetchReminders();
    }
  }, [showReminders]);

  const fetchReminders = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/reminders`); // Ganti dengan endpoint API Anda
      const data = await response.json();
      setReminders(data);
    } catch (error) {
      console.error("Error fetching reminders:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('partisipan_id');
    localStorage.removeItem('partisipan_nama');
    localStorage.removeItem('partisipan_email');
    localStorage.removeItem('partisipan_foto_profile');
    history.push('/');
  };

  const handleReminderClick = () => {
    setShowReminders(true);
  };

  return (
    <>
        <Navbar expand="lg" className="fixed-top custom-navbar justify-content-center">
        <Navbar.Brand href="/">
          <img
            src={logo}
            alt="MentalWellLogo"
            width="13%"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/" className={`custom-nav-link ${currentPath === "/" ? "active" : ""}`}>
              Beranda
            </Nav.Link>
            <Nav.Link as={Link} to="/dailyinsight-user" className={`custom-nav-link ${currentPath === "/dailyinsight-user" ? "active" : ""}`}>
              Artikel Harian
            </Nav.Link>
            <NavDropdown title="Layanan Kami" id="navbarDropdown" className="custom-nav-link" style={{ fontSize: "18px" }}>
            <NavDropdown.Item href="/mentalwelltest-user">Tes Skrining</NavDropdown.Item>
              {/* <NavDropdown.Item href="/dass42detail-user">DASS-42</NavDropdown.Item> */}
              <NavDropdown.Item href="/intervensidetail-user">Intervensi</NavDropdown.Item>
              {/* <NavDropdown.Item href="/suicide-user">Suicide</NavDropdown.Item> */}
            </NavDropdown>
            <Nav.Link as={Link} to="/about-us" className={`custom-nav-link ${currentPath === "/about-us" ? "active" : ""}`}>
              Tentang Kami
            </Nav.Link>
            <Nav.Link as={Link} to="/psikolog-list" className={`custom-nav-link ${currentPath === "/psikolog-list" ? "active" : ""}`}>
              Rekomendasi Psikolog
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link onClick={handleReminderClick} className="custom-nav-link" style={{ display: "flex", alignItems: "center", marginRight: "10px", cursor: "pointer" }}>
              <img src={reminderIcon} alt="Reminders" style={{ width: '25px', height: '25px', marginRight: '5px' }} />
              {reminders.length > 0 && (
                <span className="badge badge-danger" style={{ marginLeft: '5px' }}>{reminders.length}</span>
              )}
            </Nav.Link>
            {partisipanNama && (
              <Link to="/partisipan-profile" className="nav-link" style={{ color: "#A3A3A3", fontWeight: "bold", display: "flex", alignItems: "center" }}>
                <Image src={partisipanFoto} alt="Profile" roundedCircle style={{ width: '30px', height: '30px', marginRight: '5px' }} />
                Hi, {partisipanNama}!
              </Link>
            )}
            <Nav.Link as={Link} to="/partisipan-login" className="custom-nav-link" onClick={partisipanNama ? handleLogout : null} style={{ fontSize: "18px" }}>
              {partisipanNama ? "Logout" : "Login"}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* Modal for Reminders */}
      <Reminders
        show={showReminders}
        handleClose={() => setShowReminders(false)}
        reminders={reminders}
        className="reminders-modal" // Tambahkan kelas CSS di sini
      />
    </>
  );
};

export default Header;
