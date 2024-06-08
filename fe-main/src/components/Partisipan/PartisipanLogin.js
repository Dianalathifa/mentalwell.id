import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Row, Col, Form, Button, Image, Container, Alert } from "react-bootstrap";
import logo from "../images/logo.png";
import Header from "../landing/Navbar";
import Footer from "../landing/Footer";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // State untuk menyimpan pesan kesalahan
  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/partisipan/login', {
        email_partisipan: email,
        password_partisipan: password
      });
      console.log(response.data);
      const { data } = response;
      const { partisipan_id, partisipan_nama, partisipan_email, usia, no_telp } = data;
      if (partisipan_id) {
        localStorage.setItem('partisipan_id', partisipan_id);
        localStorage.setItem('partisipan_nama', partisipan_nama);
        localStorage.setItem('partisipan_email', partisipan_email);
        localStorage.setItem('usia', usia);
        localStorage.setItem('no_telp', no_telp);
        history.push('/'); // Redirect ke halaman profil
      } else {
        setError('Incorrect email or password.');
      }
    } catch (error) {
      console.error("Login error:", error);
      setError('Incorrect email or password.');
    }
  };
  
  return (
    <>
      <Header />
      <Container>
        <Row className="d-flex justify-content-center align-items-center" style={{ height: "110vh", maxWidth:"800px", marginLeft:"240px" }}>
          <Col md={6} className="mx-auto">
            <div className="d-flex align-items-center justify-content-center">
              <Image src={logo} alt="Logo" style={{ width: "40%", marginBottom: "20px" }} />
            </div>
            <h1 style={{ textAlign: "center", color: "#005F75", fontWeight: "bold" }}>LOGIN</h1>
            <hr style={{ borderTop: "2px solid gray" }} />
            {error && <Alert variant="danger">{error}</Alert>} {/* Tampilkan pesan kesalahan */}
            <Form onSubmit={handleLogin}>
              <Form.Group controlId="formEmail" className="mb-3">
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  style={{ backgroundColor: "#FFFFFF", borderColor: "gray" }}
                  autoFocus
                  required
                />
              </Form.Group>
              <Form.Group controlId="formPassword" className="mb-3">
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  style={{ backgroundColor: "#FFFFFF", borderColor: "gray" }}
                  required
                />
              </Form.Group>
              <Button
                style={{ backgroundColor: "#005F75", borderRadius: "10px", borderColor: "#393646" }}
                type="submit"
                className="w-100 mt-3"
              >
                Login
              </Button>
            </Form>
            <div className="my-3 text-center">
              <p>
                Don't have an account? <a href="/partisipan-register">Register</a>
              </p>
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default Login;
