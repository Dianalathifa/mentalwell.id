import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { Container, Row, Col, Card, Button, Table, Alert } from "react-bootstrap";
import Navbar from "../landing/Navbar";
import Footer from "../landing/Footer";
import "../style/Intervensi.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import stressSedang from "../images/intervensi/streesringan1.png";
import stressRingan from "../images/intervensi/streessedang1.png";

const HasilDassStress = () => {
  const [hasilKlasifikasi, setHasilKlasifikasi] = useState(null);
  const [error, setError] = useState(null);
  const [psikologs, setPsikologs] = useState([]);
  const [dailyInsights, setDailyInsights] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const partisipanId = localStorage.getItem("partisipan_id");

    const ambilHasilKlasifikasi = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/dass-stress/${partisipanId}`
        );
        setHasilKlasifikasi(response.data);
        if (response.data.klasifikasi === "Stress Parah") {
          fetchPsikologParah();
        } else if (response.data.klasifikasi === "Stress Sangat Parah") {
          fetchPsikologSangatParah();
        }
      } catch (error) {
        setError("Gagal mengambil hasil klasifikasi");
      }
    };

    const fetchPsikologParah = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/psikolog"
        );
        setPsikologs(response.data);
      } catch (error) {
        console.error("Error fetching psikologs for Stress Parah:", error);
      }
    };

    const fetchPsikologSangatParah = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/psikolog"
        );
        setPsikologs(response.data);
      } catch (error) {
        console.error(
          "Error fetching psikologs for Stress Sangat Parah:",
          error
        );
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

    fetchDailyInsights();
    ambilHasilKlasifikasi();
  }, []);

  const goToIntervensi = () => {
    history.push("/intervensidetail-user");
  };

  const goToTesSuicide = () => {
    history.push("/suicidetest-user");
  };

  const handleNavigation = () => {
    const klasifikasi = hasilKlasifikasi && hasilKlasifikasi.klasifikasi;

    if (klasifikasi === "Stress Ringan" || klasifikasi === "Stress Sedang") {
      goToIntervensi();
    } else {
      goToTesSuicide();
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("id-ID", options);
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
          <h6 className="section-title mb-2 tfonts-2">
            <br />
            Hasil Klasifikasi
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
                          <td>
                            <strong>Tanggal:</strong>
                          </td>
                          <td>
                            {formatDate(
                              hasilKlasifikasi && hasilKlasifikasi.tanggal_tes
                            )}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Points:</strong>
                          </td>
                          <td>{hasilKlasifikasi && hasilKlasifikasi.points}</td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Klasifikasi:</strong>
                          </td>
                          <td>
                            {hasilKlasifikasi && hasilKlasifikasi.klasifikasi}
                          </td>
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

        <Container
          className="mt-3 text-center d-flex justify-content-center"
          style={{ marginBottom: "50px" }}
        >
          <Col md={10}>
            <div className="text-center mt-3">
              <h6 className="tfonts-2" style={{marginBottom:"20px"}}>Rekomendasi:</h6>
              {hasilKlasifikasi && (
                <p style={{ fontSize: "18px" }}>
                  {hasilKlasifikasi && hasilKlasifikasi.klasifikasi === "Stress Normal" && (
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
                  {hasilKlasifikasi.klasifikasi === "Stress Ringan" && (
                    <>
                      Anda dapat mencoba teknik-teknik pernapasan dan relaksasi
                      untuk mengurangi kecemasan. Jika perlu,{" "}
                      <Link to="/intervensi-stresscoping-user">
                        konsultasikan dengan psikolog atau terapis
                      </Link>{" "}
                      untuk bantuan tambahan.
                      <Col xs={6} md={3} lg={3} style={{marginLeft:"380px", marginTop:"50px"}}>
                        <Card className="h-100 card-hover" style={{ marginLeft: '10px', height: '250px' }}>
                            <Card.Body className="d-flex align-items-center justify-content-center flex-column">
                                <img src={stressRingan} alt="stressRingan" style={{ objectFit: "cover", width: "100%", height: "150px", borderRadius:"5px"  }} />
                                <div className="mt-3">
                                    <Card.Title style={{ fontSize: "18px" }}>Stress Ringan</Card.Title>
                                    <Card.Text style={{ fontSize: "12px" }}>Melakukan Stress Coping Strategies untuk mengatasi stress ringan yang kamu alami dan meningkatkan kesejahteraan mental anda.</Card.Text>
                                    <Button variant="light" className="custom-button" style={{ backgroundColor: "#F5A5AD"}} href="/stress-detail">Lihat Intervensi</Button>
                                </div>
                            </Card.Body>
                        </Card>
                      </Col>
                    </>
                  )}
                  {hasilKlasifikasi.klasifikasi === "Stress Sedang" && (
                    <>
                      Selain mencoba teknik-teknik pernapasan dan relaksasi,
                      pertimbangkan untuk <br/> berbicara dengan seseorang yang Anda
                      percayai tentang perasaan Anda.{" "}
                      <Link to="/intervensi30days-user">
                        <br/>Psikolog atau terapis
                      </Link>{" "}
                      juga dapat memberikan bantuan yang berguna.
                      <Col xs={6} md={3} lg={3} style={{marginLeft:"380px", marginTop:"50px"}}>
                        <Card className="h-100 card-hover" style={{ marginLeft: '10px', height: '250px' }}>
                            <Card.Body className="d-flex align-items-center justify-content-center flex-column">
                                <img src={stressSedang} alt="stressSedang" style={{ objectFit: "cover", width: "100%", height: "150px", borderRadius:"5px"  }} />
                                <div className="mt-3">
                                    <Card.Title style={{ fontSize: "18px" }}>Stress Sedang</Card.Title>
                                    <Card.Text style={{ fontSize: "12px" }}>Melakukan Challenge 30 Days Writing untuk mengatasi stress dalam skala sedang dan meningkatkan kesejahteraan mental anda.</Card.Text>
                                    <Button variant="light" className="custom-button" style={{ backgroundColor: "#F5A5AD"}}  href="/intervensi30days-user">Lihat Intervensi</Button>
                                </div>
                            </Card.Body>
                        </Card>
                      </Col>
                    </>
                  )}
                  {hasilKlasifikasi &&
                  (hasilKlasifikasi.klasifikasi === "Stress Parah" ||
                    hasilKlasifikasi.klasifikasi === "Stress Sangat Parah") && (
                  <Container className="mt-3">
                    <Row className="justify-content-center">
                      <Col md={10}>
                        <h1 className="subtitle">Oh Tidak! Kamu memiliki kondisi stress yang kurang baik. Berikut beberapa psikolog rekomendasi kami yang dapat membantumu menghilangkan stress berlebih.</h1>
                        <Row>
                          {psikologs.map((psikolog) => (
                            <Col key={psikolog.id_psikolog} xs={12} sm={6} md={4} className="mb-4">
                              <Card className="h-100">
                                <Card.Img variant="top" src={`http://localhost:8080/images/psikolog/${psikolog.image_psikolog}`} alt="Psikolog Image" style={{ objectFit: "cover", height: "200px" }} />
                                <Card.Body>
                                  <Card.Title>{psikolog.nama_psikolog}</Card.Title>
                                  <Card.Text>
                                    Lokasi: {psikolog.lokasi_psikolog}<br />
                                    Telephone: {psikolog.telephone_psikolog}
                                  </Card.Text>
                                  <Button variant="primary" href={psikolog.url_psikolog}>Lihat Profil</Button>
                                </Card.Body>
                              </Card>
                            </Col>
                          ))}
                        </Row>
                      </Col>
                    </Row>
                  </Container>
                )}
                </p>
              )}
            </div>
          </Col>
        </Container>
        <Container>
          <Row className="justify-content-center">
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
      </Container>
      <Footer />
    </>
  );
};

export default HasilDassStress;
