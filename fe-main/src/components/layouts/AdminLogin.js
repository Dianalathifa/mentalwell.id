import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Form, Button, Image } from "react-bootstrap";
import logo from "./images/logo-web.png";
import sidebg from "./images/login-side.png";

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/admin/login', {
        username: username,
        password: password,
      });

      // Cek keberhasilan autentikasi
      if (response.data.success) {
        // Jika berhasil, redirect ke halaman beranda
        history.push('/');
      } else {
        // Jika gagal, tampilkan pesan kesalahan
        alert(response.data.message || 'Login failed! Please check your credentials.');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred while logging in. Please try again later.');
    }
  };

  return (
    <Row className="d-flex justify-content-between">
      <Col md={5}>
        <Image src={sidebg} alt="Register" fluid />
      </Col>

      <Col md={4} style={{ marginTop: "50px" }} className="mx-5">
        <div className="d-flex align-items-center justify-content-center">
          <Image src={logo} alt="Logo" />
        </div>

        <hr style={{ borderTop: "2px solid gray" }}></hr>

        <Form onSubmit={handleLogin}>
          <Form.Group controlId="formEmail" className="mb-3">
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              style={{ backgroundColor: "#F4EEE0", borderColor: "gray" }}
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
              style={{ backgroundColor: "#F4EEE0", borderColor: "gray" }}
              required
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
            Login
          </Button>
        </Form>

        <div className="my-3 text-center">
          <p>
            Create new account? <a href="/register">Register</a>
          </p>
        </div>
      </Col>
      <Col md={1}></Col>
    </Row>
  );
};

export default AdminLogin;
