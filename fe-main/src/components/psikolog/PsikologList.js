import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Footer from "../landing/Footer";
import Navbar from "../landing/Navbar";
import "../style/Intervensi.css";

const PsikologList = () => {
  const [psikologs, setPsikologs] = useState([]);

  useEffect(() => {
    const fetchPsikologs = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/psikolog");
        setPsikologs(response.data);
      } catch (error) {
        console.error("Error fetching psikologs:", error);
      }
    };

    fetchPsikologs();
  }, []);

  return (
    <div>
      <Navbar />
      <section id="psikolog-list" className="section before-content" style={{ color: "#25B7D3", paddingTop: "100px" }}>
        <div className="container text-center">
          <h6 className="section-title mb-2 tfonts-2" style={{ marginBottom: "10px" }}>Psikolog List<br /></h6>
          <h6 className="subtitle" style={{ fontSize: "16px", marginBottom: "20px" }}>
            Menyediakan informasi tenaga medis terdekat guna penanganan tepat oleh ahli<br />
            ketika kesehatan mental yang anda alami dalam kondisi yang perlu dilakukan rujukan
          </h6>
        </div>
      </section>
  
      <section id="about" className="section">
        <Container className="my-5" style={{ paddingBottom: "200px" }}>
          <Row className="justify-content-center">
            {psikologs.map((psikolog) => (
              <Col key={psikolog.id_psikolog} md={4} className="mb-4 d-flex align-items-stretch" style={{ marginTop: "10px" }}>
               <a href={psikolog.url_psikolog} className="psikolog-card-link">
                <Card style={{ padding: "20px", maxWidth: "400px", height: "100%" }}>
                  <Card.Img
                    src={`http://localhost:8080/images/psikolog/${psikolog.image_psikolog}`}
                    alt="Psikolog Image"
                    style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "10px" }}
                  />
                  <Card.Body className="text-center">
                    <Card.Title>{psikolog.nama_psikolog}</Card.Title>
                    <Card.Text className="psikolog-card-content" style={{ fontSize: "0.9375rem", lineHeight: "1.5", textAlign: "center", marginBottom: "10px" }}>
                      {psikolog.deskripsi_psikolog.length > 100 ? psikolog.deskripsi_psikolog.substring(0, 100) + "..." : psikolog.deskripsi_psikolog}
                    </Card.Text>
                    <p style={{ fontSize: "0.9375rem", lineHeight: "1.5", marginBottom: "10px" }}>Lokasi: {psikolog.lokasi_psikolog}</p>
                    <p style={{ fontSize: "0.9375rem", lineHeight: "1.5", fontWeight: "bold", marginBottom: "20px" }}>Telephone: {psikolog.telephone_psikolog}</p>
                    <div style={{ marginTop: "10px" }}>
                      <Button variant="light" style={{ backgroundColor: "#25B7D3", borderColor: "#25B7D3", color: "white", fontWeight: "bold", width: "100%" }}>Lihat Profil</Button>
                    </div>
                  </Card.Body>
                </Card>
                </a>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
      <Footer />
    </div>
  );
  
};

export default PsikologList;
