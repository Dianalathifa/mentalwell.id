import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Row, Col, Form, Button, Image, Container, Alert } from "react-bootstrap";
import logo from "../images/logo.png";
import Navbar from "../landing/Navbar";
import Footer from "../landing/Footer";

const RegisterPage = () => {
  const [nama_partisipan, setNama] = useState("");
  const [email_partisipan, setEmail] = useState("");
  const [password_partisipan, setPassword] = useState("");
  const [usia, setUsia] = useState("");
  const [no_telp, setNoTelp] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const history = useHistory();

  const savePartisipan = async (e) => {
    try {
      e.preventDefault();
      await axios.post("http://localhost:8080/partisipan/register", {
        nama_partisipan: nama_partisipan,
        email_partisipan: email_partisipan,
        password_partisipan: password_partisipan,
        usia: usia,
        no_telp: no_telp
      });
      setShowSuccess(true);
      setShowError(false);
      setTimeout(() => {
        history.push("/partisipan-login");
      }, 2000);
    } catch (error) {
      console.error("Error saving partisipan:", error);
      setShowError(true);
      setShowSuccess(false);
    }
  };

  
return (
  <>
    <Navbar />
    <Container>
      <Row className="d-flex justify-content-center align-items-center" style={{ height: "110vh", maxWidth:"600px", marginLeft:"350px" }}>
        <Col md={8} className="mx-auto"> 
          <div className="d-flex align-items-center justify-content-center">
            <Image src={logo} alt="Logo" style={{ width: "40%", marginBottom: "20px" }} />
          </div>
          <h1 style={{ textAlign: "center", color: "#005F75", fontWeight: "bold" }}>REGISTER</h1>
          <hr style={{ borderTop: "2px solid gray" }} />

          {showSuccess && (
            <Alert variant="success" onClose={() => setShowSuccess(false)} dismissible>
              Registrasi berhasil! Anda akan dialihkan ke halaman login.
            </Alert>
          )}

          {showError && (
            <Alert variant="danger" onClose={() => setShowError(false)} dismissible>
              Gagal melakukan registrasi. Silakan coba lagi.
            </Alert>
          )}

          <Form onSubmit={savePartisipan}>
            <Form.Group controlId="formNama" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Nama"
                name="nama"
                value={nama_partisipan}
                onChange={(e) => setNama(e.target.value)}
                required
                style={{ backgroundColor: "#FFFFFF", borderColor: "gray" }}
              />
            </Form.Group>

            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Control
                type="email"
                placeholder="Email"
                name="email"
                value={email_partisipan}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ backgroundColor: "#FFFFFF", borderColor: "gray" }}
              />
            </Form.Group>

            <Form.Group controlId="formPassword" className="mb-3">
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={password_partisipan}
                onChange={(e) => setPassword(e.target.value)}
                pattern="(?=.*\d)(?=.*[A-Z])(?=.*\W).{8,}"
                title="Password minimal 8 karakter, terdiri dari huruf kapital, angka, dan karakter khusus."
                required
                style={{ backgroundColor: "#FFFFFF", borderColor: "gray" }}
              />
            </Form.Group>
            <Form.Group controlId="formUsia" className="mb-3">
              <Form.Control
                type="number"
                placeholder="Usia"
                name="usia"
                value={usia}
                onChange={(e) => setUsia(e.target.value)}
                required
                style={{ backgroundColor: "#FFFFFF", borderColor: "gray" }}
              />
            </Form.Group>

            <Form.Group controlId="formNoTelp" className="mb-3">
              <Form.Control
                type="tel"
                placeholder="Nomor Telepon"
                name="no_telp"
                value={no_telp}
                onChange={(e) => setNoTelp(e.target.value)}
                required
                style={{ backgroundColor: "#FFFFFF", borderColor: "gray" }}
              />
            </Form.Group>

            <Button
              style={{
                backgroundColor: "#393646",
                borderRadius: "20px",
                borderColor: "#393646",
              }}
              type="submit"
              className="w-100 mt-3"
            >
              Register
            </Button>
          </Form>

          <div className="my-3 text-center">
            <p>
              Already have an account? <a href="/partisipan-login">Login</a>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
      <br/><br/><br/><br/><br/><br/>
      <Footer />
    </>
  );
};

export default RegisterPage;
