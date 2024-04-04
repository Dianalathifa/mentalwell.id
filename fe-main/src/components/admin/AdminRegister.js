import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Row, Col, Form, Button, Image } from "react-bootstrap";
import logo from "../images/logo.png";
import illustrasi from "../images/illustrasi-1.png";

const RegisterPage = () => {
  const [nama_admin, setName] = useState("");
  const [email_admin, setEmail] = useState("");
  const [password_admin, setPassword] = useState("");
  const history = useHistory();


  const saveAdmin = async (e) => {
    try {
      e.preventDefault();
      await axios.post("http://localhost:8080/admin/register", {
        // Menggunakan path relatif
        nama_admin: nama_admin,
        email_admin: email_admin,
        password_admin: password_admin
      });
      history.push("/admin-login");
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  return (
    <Row className="d-flex justify-content-between">
      {/* Gambar di sisi kanan */}
      <Col md={5}>
        <Image src={illustrasi} alt="Register" fluid />
      </Col>

      {/* Form di sisi kiri */}
      <Col md={4} style={{ marginTop: "50px" }} className="mx-5">
        <div className="d-flex align-items-center justify-content-center">
          <Image src={logo} alt="Logo" />
        </div>
        <h1 style={{ textAlign: "center", color: "#005F75", fontWeight: "bold" }}>REGISTER</h1>
        <hr style={{ borderTop: "2px solid gray" }} />

        <Form onSubmit={saveAdmin}>

          <Form.Group controlId="formNama" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Nama"
              name="nama"
              value={nama_admin}
              onChange={(e) => setName(e.target.value)}
              required
              style={{ backgroundColor: "#FFFFFF", borderColor: "gray" }}
            />
          </Form.Group>

          <Form.Group controlId="formEmail" className="mb-3">
            <Form.Control
              type="email"
              placeholder="Email"
              name="email"
              value={email_admin}
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
              value={password_admin}
              onChange={(e) => setPassword(e.target.value)}
              pattern="(?=.*\d)(?=.*[A-Z])(?=.*\W).{8,}"
              title="Password minimal 8 karakter, terdiri dari huruf kapital, angka, dan karakter khusus."
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
            Already have an account? <a href="/admin-login">Login</a>
          </p>
        </div>
      </Col>
    </Row>
  );
};

export default RegisterPage;
