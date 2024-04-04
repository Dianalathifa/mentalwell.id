import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Row, Col, Form, Button, Image } from "react-bootstrap";
import logo from "../images/logo-web.png";
import illustrasi from "../images/illustrasi-1.png";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/partisipan/login', {
        email_partisipan: email,
        password_partisipan: password
      });
      console.log(response.data); // Log response data
      // Simpan data partisipan ke localStorage
      const { partisipan_id, partisipan_nama, partisipan_email } = response.data;
      localStorage.setItem('partisipan_id', partisipan_id);
      localStorage.setItem('partisipan_nama', partisipan_nama);
      localStorage.setItem('partisipan_email', partisipan_email);

      history.push('/dashboard');
    } catch (error) {
      if (error.response) {
        // Kesalahan dari server (status code bukan 2xx)
        if (error.response.status === 401) {
          alert('Login failed! Incorrect email or password.'); // Kesalahan email/sandi
        } else {
          alert('Login failed! Please try again later.'); // Kesalahan server lainnya
        }
      } else if (error.request) {
        // Kesalahan dalam melakukan permintaan
        alert('Failed to send request! Please check your network connection.');
      } else {
        // Kesalahan lainnya
        alert('An error occurred! Please try again later.');
      }
    }
  };

  return (
    <Row className="d-flex justify-content-between">
      {/* Form di sisi kiri */}
      <Col md={4} className="mx-5">
        <div className="d-flex align-items-center justify-content-center">
          <Image src={logo} alt="Logo" />
        </div>
        <h1 style={{ textAlign: "center", color: "#005F75", fontWeight: "bold" }}>LOGIN</h1>
        <hr style={{ borderTop: "2px solid gray" }} />
        <Form onSubmit={handleLogin}>
          <Form.Group controlId="formEmail" className="mb-3">
            <Form.Control
              type="text"
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

      {/* Gambar di sisi kanan */}
      <Col md={5}>
        <Image src={illustrasi} alt="Illustrasi" fluid />
      </Col>
    </Row>
  );
};

export default Login;
