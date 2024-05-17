import React, { useState, useEffect } from "react";
import { Navbar, Nav, NavDropdown, Container, Col, Button, Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useHistory } from "react-router-dom";
import Logo from "../images/logo.png";
import profileImage from '../images/admin.jpg'; // Impor gambar profil admin
import "../style/AdminLayout.css";

const AdminLayout = ({ children }) => {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const location = useLocation();
  const history = useHistory();
  const [adminProfile, setAdminProfile] = useState({
    nama_admin: localStorage.getItem('admin_nama') || '',
    email_admin: localStorage.getItem('admin_email') || '',
    foto_profile: localStorage.getItem('admin_foto_profile') || profileImage,
  });

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  useEffect(() => {
    // Ambil informasi admin dari penyimpanan lokal (misalnya, localStorage)
    const adminData = {
      nama_admin: localStorage.getItem('admin_nama') || '',
      email_admin: localStorage.getItem('admin_email') || '',
      foto_profile: localStorage.getItem('admin_foto_profile') || profileImage,
    };
    setAdminProfile(adminData);
  }, []);

  const handleLogout = () => {
    // Hapus data admin dari penyimpanan lokal
    localStorage.removeItem("admin_nama");
    localStorage.removeItem("admin_email");
    localStorage.removeItem("admin_foto_profile");
    // Redirect ke halaman login admin
    history.push("/admin/login");
  };

  const handleProfileClick = () => {
    // Redirect ke halaman profil admin
    history.push("/admin/profile");
  };

  return (
    <>
      <Navbar
        style={{
          backgroundColor: "#239BB2",
          borderBottom: "1px solid #ddd",
          boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
        }}
        expand="lg"
      >
        <Container fluid>
          <Navbar.Brand
            href="/dashboard"
            className="d-flex justify-content-begin align-items-center"
          >
            <img
              src={Logo}
              alt="Logo"
              style={{
                width: "10%",
                padding: "3px",
                boxSizing: "border-box",
              }}
            />
            <h3 style={{ color: "white", fontWeight: "bold" }}>Mental Well</h3>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav">
            <Button
              variant="light"
              onClick={toggleSidebar}
              style={{ margin: "10px" }}
            >
              <FontAwesomeIcon icon={faBars} />
            </Button>
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              {adminProfile.nama_admin && (
                <NavDropdown
                  title={`Hi, ${adminProfile.nama_admin}`}
                  id="basic-nav-dropdown"
                  onClick={handleProfileClick}
                >
                  <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
            {adminProfile.nama_admin && (
              <Image
                src={adminProfile.foto_profile}
                roundedCircle
                style={{ width: '40px', height: '40px', marginLeft: '10px' }}
              />
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div
        style={{
          display: "flex",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <Col
          sm={2}
          className={`sidebar ${sidebarVisible ? "d-block" : "d-none"}`}
        >
          <Nav className="flex-column">
            <Nav.Link
              href="/dashboard"
              className={`sidebar-link ${
                location.pathname === "/dashboard" ? "active" : ""
              } mt-3`}
            >
              Dashboard
            </Nav.Link>
            <Nav.Link
              href="/admin"
              className={`sidebar-link ${
                location.pathname.startsWith("/admin") ? "active" : ""
              } mt-2`}
            >
              Admin
            </Nav.Link>
            
            <Nav.Link
              href="/partisipan"
              className={`sidebar-link ${
                location.pathname.startsWith("/partisipan") ? "active" : ""
              } mt-2`}
            >
              Partisipan
            </Nav.Link>

            <Nav.Link
              href="/kategoritest"
              className={`sidebar-link ${
                location.pathname.startsWith("/kategoritest") ? "active" : ""
              } mt-2`}
            >
              Kategori Test
            </Nav.Link>

            <Nav.Link
              href="/kuisioner"
              className={`sidebar-link ${
                location.pathname.startsWith("/kuisioner") ? "active" : ""
              } mt-2`}
            >
              Kuisioner
            </Nav.Link>
            
            <Nav.Link
              href="/jawaban"
              className={`sidebar-link ${
                location.pathname.startsWith("/jawaban") ? "active" : ""
              } mt-2`}
            >
              Jawaban Test
            </Nav.Link>

            <Nav.Link
              href="/srq"
              className={`sidebar-link ${
                location.pathname.startsWith("/srq") ? "active" : ""
              } mt-2`}
            >
              Jawaban Test SRQ
            </Nav.Link>

            <Nav.Link
              href="/hasil-srq"
              className={`sidebar-link ${
                location.pathname.startsWith("/hasil-srq") ? "active" : ""
              } mt-2`}
            >
              Hasil Test SRQ
            </Nav.Link>

            <Nav.Link
              href="/intervensi"
              className={`sidebar-link ${
                location.pathname.startsWith("/intervensi") ? "active" : ""
              } mt-2`}
            >
              Intervensi
            </Nav.Link>

            <Nav.Link
              href="/dailyinsight"
              className={`sidebar-link ${
                location.pathname.startsWith("/dailyinsight") ? "active" : ""
              } mt-2`}
            >
              Daily Insight
            </Nav.Link>
            <Nav.Link
              href="/psikolog"
              className={`sidebar-link ${
                location.pathname.startsWith("/psikolog") ? "active" : ""
              } mt-2`}
            >
              Psikolog
            </Nav.Link>

            <Nav.Link
              href="/video-stress-admin"
              className={`sidebar-link ${
                location.pathname.startsWith("/video-stress") ? "active" : ""
              } mt-2`}
            >
              Video Stress
            </Nav.Link>
          </Nav>
        </Col>
        <Col
          sm={10}
          style={{
            marginLeft: sidebarVisible ? "0px" : "0px",
            transition: "margin 0.2s",
            height: "100%",
          }}
        >
          {children}
        </Col>
      </div>
    </>
  );
};

export default AdminLayout;
