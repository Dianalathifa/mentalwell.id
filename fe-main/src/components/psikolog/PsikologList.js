import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Footer from "../landing/Footer";
import Navbar from "../landing/Navbar";

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
      
      <section id="psikolog-list" className="section before-content" style={{ backgroundColor: "#C4EAF4", color: "#141313", fontFamily: "Abril Fatface", marginTop: "-56px", paddingTop: "200px" }}>
        <div className="container text-center">
          <h6 className="section-title mb-2 tfonts">Psikolog List<br></br></h6>
          <h6 className="subtitle" style={{ fontSize: "28px" }}><br></br>Menyediakan informasi tenaga medis terdekat<br></br>
          guna penanganan tepat oleh ahli ketika kesehatan mental<br></br>
          yang anda alami dalam kondisi yang perlu dilakukan rujukan<br></br><br></br><br></br><br></br><br></br></h6>

        </div>
      </section>

      <section id="about" className="section before-content">
        <div className="container text-center">
          <div>
            <h6 className="subtitle">Prioritaskan Kesehatan Mentalmu</h6>
            <h6 className="section-title mb-2 tfonts">Temui Ahli Rekomendasi Kami!</h6>
            <p className="mb-5 pb-4">Dapatkan Pencerahan dan Panduan yang Tepat untuk Meninggalkan Pola Pikir Negatif Anda Melalui Sesi Konsultasi Bersama Psikolog Profesional.</p>
          </div>
        </div>

        <Container fluid>
          <Row className="justify-content-center">
            {psikologs.map((psikolog) => (
              <Col key={psikolog.id_psikolog} xs={12} md={6} lg={12}>
                <Link to={`/psikolog/${psikolog.id_psikolog}`} className="psikolog-card-link">
                  <Card className="psikolog-card" style={{ width: "100%", height: "100%" }}>
                    <Card.Body>
                      <Row>
                        <Col md={6} className="text-center">
                          <Card.Img src={`http://localhost:8080/images/psikolog/${psikolog.image_psikolog}`} alt="Psikolog Image" style={{ width: "70%", height: "auto" }} />
                        </Col>
                        <br/>
                        <Col md={6}>
                          <Card.Title className="psikolog-card-title" style={{ fontSize: "30px", lineHeight: "2" }}>{psikolog.nama_psikolog}</Card.Title>
                          <Card.Text className="psikolog-card-content" style={{ fontSize: "25px", lineHeight: "2" }}>
                            {psikolog.deskripsi_psikolog.length > 1000 ? psikolog.deskripsi_psikolog.substring(0, 100) + "..." : psikolog.deskripsi_psikolog}
                          </Card.Text>
                          <p style={{ fontSize: "25px", lineHeight: "2" }}>Lokasi: {psikolog.lokasi_psikolog}</p>
                          <p style={{ fontSize: "25px", lineHeight: "2" }}>Telephone: {psikolog.telephone_psikolog}</p>
                          <Link to={`/psikolog/${psikolog.id_psikolog}`}>
                            <Button variant="light" style={{ backgroundColor: "#25B7D3", borderColor: "#25B7D3", color: "white", fontWeight: "bold" }}>Lihat Profil</Button>
                          </Link>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                  <br/>
                </Link>
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
