import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Row, Col, Form, Button, Image } from "react-bootstrap";
import logo from "../images/logo.png";
import illustrasi from "../images/illustrasi-1.png";
import Navbar from "../landing/Navbar";
import Footer from "../landing/Footer";

const RegisterPage = () => {
  const [nama_partisipan, setNama] = useState("");
  const [email_partisipan, setEmail] = useState("");
  const [password_partisipan, setPassword] = useState("");
  const [usia, setUsia] = useState("");
  const [no_telp, setNoTelp] = useState("");
  const history = useHistory();

  const savePartisipan = async (e) => {
    try {
      e.preventDefault();
      await axios.post("http://localhost:8080/api/partisipan", {
        // Menggunakan path relatif
        nama_partisipan: nama_partisipan,
        email_partisipan: email_partisipan,
        password_partisipan: password_partisipan,
        usia: usia,
        no_telp: no_telp
      });
      history.push("/partisipan-login");
    } catch (error) {
      console.error("Error saving partisipan:", error);
    }
  };

  return (
    <>
    <Navbar/>
    <Row className="d-flex justify-content-between">
        {/* Form di sisi kiri */}
        <Col md={5} className="mx-5">
        <div className="d-flex align-items-center justify-content-center">
            <Image src={logo} alt="Logo" />
          </div>
          <h1 style={{ textAlign: "center", color: "#005F75", fontWeight: "bold" }}>REGISTER</h1>
          <hr style={{ borderTop: "2px solid gray" }} />

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
      <Col md={5}>
        {/* Gambar di sisi kanan */}
        <div className="text-center">
          <Image src={illustrasi} alt="Register" fluid />
        </div>
      </Col>
    </Row>
    <Footer/>
    </>
  );
};

export default RegisterPage;
