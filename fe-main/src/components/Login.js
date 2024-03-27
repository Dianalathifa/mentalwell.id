import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Row, Col, Form, Button, Image } from "react-bootstrap";
import logo from "./images/logo-web.png";
import illustrasi from "./images/illustrasi-1.png";

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const getUser = async (e) => {
    try {
      e.preventDefault();
      await axios.post('http://localhost:8080/api/login', {
        username: username,
        password: password,
      });
      history.push('/');
    } catch (error) {
      alert('Login failed! Please check your credentials.');
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
        <Form onSubmit={getUser}>
          <Form.Group controlId="formEmail" className="mb-3">
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
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
            Create new account? <a href="/register">Register</a>
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

export default LoginPage;
