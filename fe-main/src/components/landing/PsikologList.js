import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Footer from "../landing/Footer";
import Header from "../landing/Header";
import ConNav from './conNav'; // Import ConNav component here

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
      <ConNav /> {/* Use ConNav component here */}
      <section id="about" className="section before-content">
        <div className="container text-center">
          <div>
            <h6 className="subtitle">Prioritaskan Kesehatan Mentalmu</h6>
            <h6 className="section-title mb-2 tfonts">Temui Ahli Konsultan Kami!</h6>
            <p className="mb-5 pb-4">Dapatkan Pencerahan dan Panduan yang Tepat untuk Meninggalkan Pola Pikir Negatif Anda Melalui Sesi Konsultasi Online Bersama Psikolog Profesional.</p>
          </div>
        </div>

        <div className="container mt-0">
          <Row xs={1} md={2} lg={3} className="g-4">
            {psikologs.map((psikolog) => (
              <Col key={psikolog.id_psikolog}>
                <Link to={`/psikolog/${psikolog.id_psikolog}`} className="psikolog-card-link">
                  <Card className="psikolog-card" style={{ height: "100%" }}>
                    <Row>
                      <Col md={6}>
                        <Card.Img variant="top" src={`http://localhost:8080/images/psikolog/${psikolog.image_psikolog}`} style={{ objectFit: "cover", height: "100%" }} />
                      </Col>
                      <Col md={6}>
                        <Card.Body>
                          <Card.Title className="psikolog-card-title">{psikolog.nama_psikolog}</Card.Title>
                          <Card.Text className="psikolog-card-content">
                            {psikolog.deskripsi_psikolog.length > 100 ? psikolog.deskripsi_psikolog.substring(0, 100) + "..." : psikolog.deskripsi_psikolog}
                          </Card.Text>
                          <p>Lokasi: {psikolog.lokasi_psikolog}</p>
                          <p>Telephone: {psikolog.telephone_psikolog}</p>
                          <Link to={`/psikolog/${psikolog.id_psikolog}`}>
                            <Button variant="primary">Lihat Profil</Button>
                          </Link>
                        </Card.Body>
                      </Col>
                    </Row>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default PsikologList;
