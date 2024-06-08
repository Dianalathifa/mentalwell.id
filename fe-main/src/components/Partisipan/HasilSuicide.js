import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button, Table } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../landing/Navbar";
import Footer from "../landing/Footer";
import "../style/Intervensi.css";

const HasilSuicide = () => {
  const [hasilSuicide, setHasilSuicide] = useState(null);
  const [error, setError] = useState(null);
  const [psikologs, setPsikologs] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const partisipanId = localStorage.getItem("partisipan_id");

    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/suicide/${partisipanId}`);
        setHasilSuicide(response.data);
        fetchPsikologs();
      } catch (error) {
        setError("Gagal mengambil hasil tes suicide");
      }
    };

    const fetchPsikologs = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/psikolog");
        setPsikologs(response.data);
      } catch (error) {
        console.error("Error fetching psikologs:", error);
      }
    };

    fetchData();
  }, []);


  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  return (
    <>
      <Navbar />
      <Container className="mt-5" style={{ marginBottom: "50px", paddingTop:"100px" }}>
        <div className="container text-center">
          <h6 className="section-title mb-2 tfonts-2">
            <br />
            Hasil Suicide
            <br />
          </h6>
        </div>
        <Row className="justify-content-center">
          <Col md={10}>
            <Card>
              <Card.Body>
                {error ? (
                  <p>{error}</p>
                ) : (
                  <div>
                    <Table bordered striped responsive className="mb-4" style={{fontSize:"18px"}}>
                      <tbody>
                        <tr>
                          <td><strong>Tanggal Tes:</strong></td>
                          <td>{formatDate(hasilSuicide && hasilSuicide.tanggal_tes)}</td>
                        </tr>
                        <tr>
                          <td><strong>Klasifikasi:</strong></td>
                          <td>{hasilSuicide && hasilSuicide.klasifikasi}</td>
                        </tr>
                        <tr>
                          <td colSpan="2">
                            {hasilSuicide &&
                              (hasilSuicide.klasifikasi === "Resiko Bunuh Diri Rendah" ||
                                hasilSuicide.klasifikasi === "Tidak Ada Resiko Bunuh Diri"
                                ? "Anda tidak memiliki resiko bunuh diri. Namun tingkatan anda sudah parah."
                                  : "Anda memiliki resiko bunuh diri.")}
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <Container className="mt-3 text-center d-flex justify-content-center" style={{ marginBottom: "50px" }}>
        <Col md={10}>
          <div className="text-center mt-3">
            <h6 className="tfonts-2" style={{marginBottom:"20px"}}>Rekomendasi Psikolog:</h6>
            <Row>
              {psikologs.slice(0, 3).map((psikolog) => (
                <Col key={psikolog.id_psikolog} md={4}>
                  <a href={psikolog.url_psikolog} target="_blank" rel="noopener noreferrer" className="psikolog-link">
                    <Card className="mb-3">
                      <Card.Body>
                        <Row>
                          <Col md={4}>
                            <Card.Img
                              src={`http://localhost:8080/images/psikolog/${psikolog.image_psikolog}`} 
                              alt={psikolog.nama_psikolog}
                              style={{ borderRadius: "15%", width: "100px", height: "100px" }}
                            />
                          </Col>
                          <Col md={8}>
                            <Card.Title>{psikolog.nama_psikolog}</Card.Title>
                            <Card.Text>
                              Lokasi: {psikolog.lokasi_psikolog}<br />
                              Telephone: {psikolog.telephone_psikolog}
                            </Card.Text>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </a>
                </Col>
              ))}
            </Row>
            <Button variant="light"
                    className="custom-button"
                    style={{
                      borderRadius: "50px",
                      fontWeight: "bold",
                      padding: '15px 25px',
                      fontSize: '17px'}}
                       onClick={() => history.push("/psikolog-list")}>
              Lihat Lebih Banyak Daftar Psikolog
            </Button>
          </div>
        </Col>
      </Container>

      <Container>
          <Row className="justify-content-center" style={{marginBottom:"50px"}}>
            <Col md={10}>
              <Card
                className="about-us-card"
                style={{ backgroundColor: "#FFD2DD" }}
              >
                <Card.Body>
                  <h5
                    style={{
                      fontSize: "18px",
                      color: "red",
                      fontWeight: "bold",
                    }}
                  >
                    <FontAwesomeIcon icon={faExclamationTriangle} /> Disclaimer
                  </h5>
                  <p style={{ fontSize: "16px" }}>
                    <br /> Psikotes ini bukan milik atau buatan penulis sendiri,
                    namun berdasarkan referensi yang biasa digunakan di praktek
                    klinis dan sudah divalidasi. Hasil tes ini sangat bersifat
                    obyektif, untuk diagnosis diperlukan langsung dengan
                    psikiater.
                  </p>
                  <br />
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>


      <Footer />
    </>
  );
};

export default HasilSuicide;
