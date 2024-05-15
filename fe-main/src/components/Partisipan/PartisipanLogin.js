import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Row, Col, Form, Button, Image, Container } from "react-bootstrap";
import logo from "../images/logo.png";
import Header from "../landing/Navbar";
import Footer from "../landing/Footer";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/partisipan/login', {
        email_partisipan: email,
        password_partisipan: password
      });
      console.log(response.data);
      const { partisipan_id, partisipan_nama, partisipan_email } = response.data;
      localStorage.setItem('partisipan_id', partisipan_id);
      localStorage.setItem('partisipan_nama', partisipan_nama);
      localStorage.setItem('partisipan_email', partisipan_email);

      history.push('/');
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          alert('Login failed! Incorrect email or password.');
        } else {
          alert('Login failed! Please try again later.');
        }
      } else if (error.request) {
        alert('Failed to send request! Please check your network connection.');
      } else {
        alert('An error occurred! Please try again later.');
      }
    }
  };
  
  return (
    <>
      <Header />
      <Container>
        <Row className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
          <Col md={6} className="mx-auto"> {/* Mengubah md menjadi 4 dan menambahkan class mx-auto */}
            <div className="d-flex align-items-center justify-content-center">
            <Image src={logo} alt="Logo" style={{ width: "40%", marginBottom: "20px" }} />
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
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default Login;
