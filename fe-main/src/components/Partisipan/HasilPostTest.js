import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Alert, Button, Table } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../landing/Navbar";
import Footer from "../landing/Footer";

const HasilPrediksi = () => {
  const [hasilPrediksi, setHasilPrediksi] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const history = useHistory();

  const partisipanNama = localStorage.getItem('partisipan_nama') || 'Nama Partisipan';

  useEffect(() => {
    const partisipanId = localStorage.getItem('partisipan_id');

    const ambilHasilPrediksi = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/hasil-prediksi/partisipan/${partisipanId}`);
        setHasilPrediksi(response.data);
      } catch (error) {
        console.error('Gagal mengambil hasil prediksi:', error);
      }
    };

    ambilHasilPrediksi();
  }, []);

  const handleNavigation = (url) => {
    history.push(url);
  };


  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  return (
    <>
      <Navbar />
      <Container className="mt-5" style={{marginBottom:"50px"}}>
        <div className="container text-center">
          <h6 className="section-title mb-2 tfonts">
            Hasil Post Test
          </h6>
        </div>
        <Row className="justify-content-center">
          <Col md={8}>
            <Card>
              <Card.Body>
                {hasilPrediksi ? (
                  <>
                    <Table bordered striped responsive className="mb-4">
                      <tbody>
                        <tr>
                          <td><strong>Tanggal Tes:</strong></td>
                          <td>{formatDate(hasilPrediksi.tanggal_tes)}</td>
                        </tr>
                        <tr>
                          <td><strong>Nama Partisipan:</strong></td>
                          <td>{partisipanNama}</td>
                        </tr>
                        <tr>
                          <td><strong>Points:</strong></td>
                          <td>{hasilPrediksi.points}</td>
                        </tr>
                        <tr>
                          <td><strong>Mental Disorders:</strong></td>
                          <td>{hasilPrediksi.mental_disorders ? 'Ya' : 'Tidak'}</td>
                        </tr>
                        <tr>
                          <td><strong>Klasifikasi:</strong></td>
                          <td>{hasilPrediksi.klasifikasi}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </>
                ) : (
                  <p>Loading...</p>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <Container>
      <Row className="justify-content-center">
          <Col md={8}>
            <Card className="about-us-card" style={{ backgroundColor: "#FFD2DD", marginBottom:"50px"}}>
              <Card.Body>
              <h5 style={{ fontSize: "25px", color: "red", fontWeight: "bold" }}>
                <FontAwesomeIcon icon={faExclamationTriangle} /> Disclaimer
              </h5>
                  <p style={{ fontSize: "20px" }}>
                  <br></br>Hasil prediksi ini hanya sebagai informasi awal saja. Untuk diagnosis yang akurat, konsultasikan dengan psikolog atau psikiater.
                  </p><br/>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <Footer />
    </>
  );
};

export default HasilPrediksi;
