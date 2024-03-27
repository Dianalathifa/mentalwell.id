import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Row, Col, Form, Breadcrumb, Button, Card } from "react-bootstrap";
import AdminLayout from "../layouts/AdminLayout";

const AddAdmin = () => {
  const [nama_admin, setNama] = useState("");
  const [password_admin, setPassword] = useState("");
  const [email_admin, setEmail] = useState("");
  const history = useHistory();

  const saveAdmin = async (e) => {
    try {
      e.preventDefault();
      await axios.post("http://localhost:8080/api/admin", {
        // Menggunakan path relatif
        nama_admin: nama_admin,
        password_admin: password_admin,
        email_admin: email_admin,
      });
      history.push("/admin");
    } catch (error) {
      console.error("Error saving admin:", error);
    }
  };

  return (
    <AdminLayout>
      <div>
        <Breadcrumb className="mt-3">
          <Breadcrumb.Item href="/dashboard">Home</Breadcrumb.Item>
          <Breadcrumb.Item href="/admin">Admin</Breadcrumb.Item>
          <Breadcrumb.Item active>Add Admin</Breadcrumb.Item>
        </Breadcrumb>

        <Card>
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-5">
              <h5 className="font-weight-bold" style={{ fontSize: "20px" }}>
                Form Tambah Admin
              </h5>
            </div>
            <Form onSubmit={saveAdmin}>
              <Row className="mb-3">
                <Col md="2" className="d-flex justify-content-end">
                  <Form.Label>Nama</Form.Label>
                </Col>
                <Col md="8">
                  <Form.Control
                    type="text"
                    name="nama_admin"
                    value={nama_admin}
                    placeholder="Nama"
                    onChange={(e) => setNama(e.target.value)}
                    required
                  />
                </Col>
              </Row>

              {/* <Row className="mb-3">
                <Col md="2" className="d-flex justify-content-end">
                  <Form.Label>Username</Form.Label>
                </Col>
                <Col md="8">
                  <Form.Control
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </Col>
              </Row> */}

              <Row className="mb-3">
                <Col md="2" className="d-flex justify-content-end">
                  <Form.Label>Password</Form.Label>
                </Col>
                <Col md="8">
                  <Form.Control
                    type="password"
                    name="password_admin"
                    value={password_admin}
                    placeholder="********"
                    onChange={(e) => setPassword(e.target.value)}
                    pattern="(?=.*\d)(?=.*[A-Z])(?=.*\W).{8,}"
                    title="Password minimal 8 karakter, terdiri dari huruf kapital, angka, dan karakter khusus."
                    required
                  />
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md="2" className="d-flex justify-content-end">
                  <Form.Label>Email</Form.Label>
                </Col>
                <Col md="8">
                  <Form.Control
                    type="email"
                    name="email_admin"
                    placeholder="example@gmail.com"
                    value={email_admin}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Col>
              </Row>
              <Col md="10" className="d-flex justify-content-end">
              <Button variant="success" type="submit" style={{ backgroundColor: "#FEA503", borderColor: "#FEA503" }} >
                Submit
              </Button>
              </Col>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AddAdmin;
