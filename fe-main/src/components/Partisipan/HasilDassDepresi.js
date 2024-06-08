import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Button, Table, Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Navbar from "../landing/Navbar";
import Footer from "../landing/Footer";
import "../style/Intervensi.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import depresiRingan from "../images/intervensi/depresiringan1.png";
import depresiSedang from "../images/intervensi/depresisedang1.png";

const HasilDassDepresi = () => {
  const [hasilKlasifikasi, setHasilKlasifikasi] = useState(null);
  const [error, setError] = useState(null);
  const [dailyInsights, setDailyInsights] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const fetchHasilKlasifikasi = async () => {
      try {
        const partisipanId = localStorage.getItem("partisipan_id");
        const response = await axios.get(
          `http://localhost:8080/api/dass-depresi/${partisipanId}`
        );
        setHasilKlasifikasi(response.data);
      } catch (error) {
        setError("Gagal mengambil hasil klasifikasi");
      }
    };

    const fetchDailyInsights = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/daily_insight");
        setDailyInsights(response.data);
      } catch (error) {
        console.error("Error fetching daily insights:", error);
      }
    };

    fetchHasilKlasifikasi();
    fetchDailyInsights();
  }, []);


  const handleNavigation = (path) => {
    history.push(path);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };
  
  const renderDailyInsights = () => (
    <Row className="justify-content-center" style={{marginBottom:"50px"}}>
      {dailyInsights.map((daily_insight) => (
        <Col key={daily_insight.id} md={4} className="my-3">
          <Card className="daily-insight-card">
            <Card.Img
              variant="top"
              src={`http://localhost:8080/images/daily_insight/${daily_insight.image}`}
              style={{ objectFit: "cover", height: "200px" }}
            />
            <Card.Body className="daily-insight-card-body">
              <Card.Title className="daily-insight-card-title">
                {daily_insight.judul_content}
              </Card.Title>
              <Card.Text className="daily-insight-card-content">
                {daily_insight.deskripsi.length > 100
                  ? daily_insight.deskripsi.substring(0, 100) + "..."
                  : daily_insight.deskripsi}
              </Card.Text>
              <div style={{ marginTop: "auto" }}>
                <Button variant="link" onClick={() => handleNavigation(`/dailyinsight-detail-user/${daily_insight.id}`)}>
                  Baca Selengkapnya
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
  
  return (
    <>
      <Navbar />
      <Container className="mt-5" style={{ marginBottom: "50px", paddingTop: "100px" }}>
        <div className="container text-center">
          <h6 className="section-title mb-2 tfonts-2"><br />Hasil Klasifikasi<br /></h6>
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
                          <td><strong>Tanggal:</strong></td>
                          <td>{formatDate(hasilKlasifikasi && hasilKlasifikasi.tanggal_tes)}</td>
                        </tr>
                        <tr>
                          <td><strong>Points:</strong></td>
                          <td>{hasilKlasifikasi && hasilKlasifikasi.points}</td>
                        </tr>
                        <tr>
                          <td><strong>Klasifikasi:</strong></td>
                          <td>{hasilKlasifikasi && hasilKlasifikasi.klasifikasi}</td>
                        </tr>
                        <tr>
                          
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {hasilKlasifikasi && (
          <Container className="mt-3 text-center d-flex justify-content-center">
            <Col md={10}>
              <div className="text-center mt-3">
                <h6 className="tfonts-2" style={{ marginBottom: "20px" }}>Rekomendasi:</h6>
                {hasilKlasifikasi && hasilKlasifikasi.klasifikasi === "Depresi Normal" && (
                <Container className="mt-3 text-center d-flex justify-content-center" style={{marginBottom:"10px"}}>
                  <Col md={10} >
                    <Alert variant="white" style={{ fontSize:"18px"}}>
                      <h4 style={{fontWeight:"bold"}}>WAH! Hasil Tes Kesehatanmu Sangat Baik</h4>
                      <p style={{marginBottom:"20px"}}>Selamat, kamu memiliki mental yang sehat. Tetap jaga kesehatan mentalmu dan lanjut ke artikel harian!</p><br/>
                      {renderDailyInsights()}
                      <Button variant="light"
                        className="custom-button"
                        style={{
                          borderRadius: "50px",
                          fontWeight: "bold",
                          padding: '15px 25px',
                          fontSize: '17px'}}
                        onClick={() => handleNavigation('/dailyinsight-user')}>
                        Temukan Lebih Banyak Artikel Harian
                      </Button>
                    </Alert>
                  </Col>
                </Container>
              )}
                {hasilKlasifikasi.klasifikasi === "Depresi Ringan" && (
                    <>
                      <p style={{ fontSize: "18px" }}>
                        Anda dapat mencoba teknik-teknik pernapasan dan relaksasi untuk mengurangi kecemasan. Jika perlu,{" "}
                        <Link to="/intervensiterapi-user">konsultasikan dengan psikolog atau terapis</Link> untuk bantuan tambahan.
                      </p>
                      <Row className="mt-3 justify-content-center">
                        <Col xs={6} md={3} lg={3} style={{marginBottom:"20px"}}>
                          <Card className="h-100 card-hover" style={{ height: '350px', margin: '10px' }}>
                            <Card.Body className="d-flex align-items-center justify-content-center flex-column">
                              <img src={depresiRingan} alt="derepsiRingan" style={{ objectFit: "cover", width: "100%", height: "200px", borderRadius:"5px" }} />
                              <div className="mt-3">
                                <Card.Title style={{ fontSize: "18px" }}>Intervensi Depresi Ringan</Card.Title>
                                <Card.Text style={{ fontSize: "12px" }}>Teknik pernapasan dan relaksasi untuk mengatasi depresi ringan dan temukan ketenangan dalam hidup.</Card.Text>
                                <Button variant="light" className="custom-button" style={{backgroundColor:"#7F91D8"}} href="/intervensiterapi-user">Lihat Selengkapnya</Button>
                              </div>
                            </Card.Body>
                          </Card>
                        </Col>
                      </Row>
                    </>
                  )}
                {hasilKlasifikasi.klasifikasi === "Depresi Sedang" && (
                  <>
                    <p style={{ fontSize: "18px" }}>
                      Selain mencoba teknik-teknik pernapasan dan relaksasi, pertimbangkan untuk berbicara dengan seseorang yang Anda percayai tentang perasaan Anda.{" "}
                      <Link to="/penjelasan-cbt">Psikolog atau terapis</Link> juga dapat memberikan bantuan yang berguna.
                    </p>
                    <Row className="mt-3 text-center d-flex justify-content-center">
                      <Col xs={6} md={3} lg={3} style={{marginBottom:"20px"}}>
                        <Card className="h-100 card-hover" style={{ marginLeft: '10px', height: '250px' }}>
                          <Card.Body className="d-flex align-items-center justify-content-center flex-column">
                            <img src={depresiSedang} alt="depresiSedang" style={{ objectFit: "cover", width: "100%", height: "200px" }} />
                            <div className="mt-3">
                              <Card.Title style={{ fontSize: "18px" }}>Depresi Sedang</Card.Title>
                              <Card.Text style={{ fontSize: "12px" }}>Buatmu yang sedang merasa depresi dan harimu cukup menguras energi dan sedang membutuhkan bantuan untuk pulih kembali.</Card.Text>
                              <Button variant="light" className="custom-button" style={{ backgroundColor: "#7F91D8"}} href="/penjelasan-cbt">Lihat Intervensi</Button>
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>
                  </>
                )}
                {hasilKlasifikasi.klasifikasi === "Depresi Parah" && (
                  <p style={{ fontSize: "18px" }}>
                    Dengan kecemasan yang parah, sangat penting untuk mendapatkan bantuan profesional.{" "}
                    <Link to="/psikolog-list">Silakan cari bantuan dari psikolog atau terapis</Link> sesegera mungkin.
                  </p>
                )}
                {hasilKlasifikasi.klasifikasi === "Depresi Sangat Parah" && (
                  <p style={{ fontSize: "18px" }}>
                    Segera cari bantuan profesional jika Anda mengalami kecemasan yang sangat parah.{" "}
                    <Link to="/psikolog-list">Psikolog atau terapis</Link> akan membantu Anda menangani masalah ini dengan metode yang sesuai.
                  </p>
                )}
              </div>
            </Col>
          </Container>
        )}
        <Container>
              <Row className="justify-content-center">
                <Col md={10}>
                  <Card className="about-us-card" style={{ backgroundColor: "#FFD2DD" }}>
                    <Card.Body>
                      <h5 style={{ fontSize: "18px", color: "red", fontWeight: "bold" }}>
                        <FontAwesomeIcon icon={faExclamationTriangle} /> Disclaimer
                      </h5>
                      <p style={{ fontSize: "16px" }}>
                        <br /> Psikotes ini bukan milik atau buatan penulis sendiri, namun berdasarkan referensi yang biasa digunakan di praktek klinis dan sudah divalidasi.
                        Hasil tes ini sangat bersifat obyektif, untuk diagnosis diperlukan langsung dengan psikiater.
                      </p><br />
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Container>
      </Container>
      <Footer />
    </>
  );
};

export default HasilDassDepresi;
