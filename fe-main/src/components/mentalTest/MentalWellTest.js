import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from 'react-router-dom';
import Footer from "../landing/Footer.js";
import Navbar from "../landing/Navbar.js";
import image10 from "../images/image10.png"; // Import gambar
import Test1 from "../images/mentalwell-test1.png"; // Import gambar
import Test2 from "../images/mentalwell-test2.png"; // Import gambar
import skrining from "../images/skrining.png";
import hasil from "../images/menerima-hasil.png";
import lanjutan from "../images/tes-lanjutan.png";
import stress from "../images/intervensi/dass-stress.png";
import cemas from "../images/intervensi/dass-cemas.png";
import depresi from "../images/intervensi/dass-depresi.png";
import suicide from "../images/intervensi/suicide.png";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../style/Intervensi.css";



const TampilanAwal = () => {
  return (
    <>
      <Navbar />
      <section id="psikolog-list" style={{ color: "#25B7D3", marginTop: "200px" }}>
        <div className="container text-center">
          <h6 className="section-title mb-2 tfonts" style={{color: "#25B7D3"}}>Layanan Mental Well</h6>
        </div>
      </section>

      <Container className="my-6">
        <Row className="justify-content-center text-center">
          <Col md={3}>
            <Card className="mentalwell-card" style={{ backgroundColor: "#FEF2DD", marginTop:"30px"}}>
              <Card.Body>
                <h1 style={{fontSize:"17px", fontWeight:"bold", marginBottom:"15px", color:"#FEA503"}}><br/>Pentingnya <br/>Kesehatan Mental</h1>
                <p style={{ fontSize: "16px", color:"#FEA503" }}>
                  "Menurut World Health Organization (WHO) kesehatan 
                  optimal diartikan bahwa suatu keadaan dimana seseorang 
                  memiliki keadaan fisik, mental dan sosial yang seutuhnya."
                </p>
                <br/>
              </Card.Body>
            </Card>
          </Col>
          <Col md={5} className="text-left">
            <h1 style={{fontWeight:"bold",fontSize:"20px", marginTop:"90px" }}>Tes Skrining Kesehatan Mental (SRQ-20)</h1>
            <p style={{ fontSize: "16px", marginTop:"10px" }}>
              Mengenali adanya gangguan mental 
              sedini mungkin akan jauh lebih baik
              dibandingkan membiarkan terlalu lama 
              yang dapat menyebabkan terganggunya 
              fungsi sehari-hari. Jika lebih awal dikenali 
              juga akan mempermudah penanganan 
              dan pengobatan.
            </p>
          </Col>
          <Col md={3} className="d-flex align-items-center justify-content-center">
            <img src={image10} alt="Image" style={{ maxWidth: "100%", maxHeight: "100%" }} />
          </Col>
        </Row>
      </Container>

      <Container className="my-6">
        <Row className="justify-content-center">
          <Col md={{ span: 2, offset: 0.5 }}>
            <h1 style={{ fontSize: "15px", fontWeight: "bold", color: "#0C38B5" }}>
              <br></br><br></br>Setiap Orang yang <br></br>Memerlukan Bantuan
            </h1>
            <p style={{ fontSize: "14px", color: "#0C38B5" }}>
              Psikiater dan Psikolog <br></br>adalah tempat yang aman <br></br>
              untuk berkonsultasi <br></br>tentang masalah <br></br>kesehatan mental health.
            </p>
          </Col>
          <Col md={2} className="d-flex align-items-center">
            <img src={Test1} alt="Image" style={{ maxWidth: "100%", maxHeight: "100%" }} />
          </Col>
          <Col md={2} className="d-flex align-items-center">
            <img src={Test2} alt="Image" style={{ maxWidth: "100%", maxHeight: "100%" }} />
          </Col>
          <Col md={{ span: 2, offset: 0.5 }}>
            <h1 style={{ fontSize: "15px", fontWeight: "bold", color: "#0C38B5" }}>
              <br></br>Skrining Cepat <br></br>Bantuan Cepat
            </h1>
            <p style={{ fontSize: "14px", color: "#0C38B5" }}>
              Skrining Psikotes sebagai <br></br> langkah awal untuk <br></br>mencari bantuan <br></br>masalah kesehatan <br></br>mental anda
            </p>
          </Col>
        </Row>
      </Container>

      <section id="mentalwell" className="section sebelum-content">
        <div className="container text-center">
          <div>
            <h6 className="mb-2 tfonts-2">Alur Tes Skrining Kesehatan Mental</h6>
            <br></br>
          </div>
          <Row className="text-center align-items-center">
            <Col>
              <img src={skrining} className="mb-6 small-img" />
              <Card.Title>Langkah 1</Card.Title>
              <p>Melakukan skrining <br></br>psikotes online <br></br>untuk mengevaluasi <br></br>keluhan/gejala psikologis.</p>
            </Col>
            <Col>
              <img src={hasil} className="mb-6 small-img" />
              <Card.Title>Langkah 2</Card.Title>
              <p>Dapatkan hasil tes yang <br/>akan memunculkan <br/>rekomendasi intervensi <br></br>dan penanganan <br/>tenaga profesional.</p>
            </Col>
            <Col>
              <img src={lanjutan} className="mb-6 small-img" />
              <Card.Title>Langkah 3</Card.Title>
              <p>Hasil tes yang kamu <br/>dapatkan akan memunculkan <br/>rekomendasi sesuai kondisi <br/>yang sedang kamu alami.<br/> Ikuti solusi yang diberikan!</p>
            </Col>
          </Row>
        </div>
      </section>

      <Col md={14} className="text-center">
        <Link to="/srqtest-user">
          <Button
            variant="light"
            className="custom-button"
            style={{
              borderRadius: "50px",
              fontWeight: "bold",
              padding: '15px 20px',
              fontSize: '20px'
            }}
          >
            Mulai Skrining
          </Button>
        </Link>
      </Col>

      <section id="mentalwell" className="section sebelum-content" style={{marginTop:"20px"}}>
          <div className="container text-center">
            
              <h6 className="section-title mb-2 tfonts-2">Layanan Tes Kesehatan Mental Lainnya</h6>
              <br></br>
            <Row className="justify-content-center">
            <Col md={5}>
            <Card className="dass-card small-card" style={{ backgroundColor: "#FFD2DD" }}>
              <Card.Body style={{textAlign:"left"}}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img src={stress} alt="Stress" style={{ width: "170px", height: "170px", marginRight: "20px" }} />
                  <div>
                    <h5 style={{fontWeight:"bold"}}>DASS-Stress</h5>
                    <p>Tes ini berguna untuk mengetahui seberapa stress keadaan yang kamu alami. Kami siap membantu-mu mengatasinya!</p>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>

              <Col md={5}>
                <Card className="dass-card medium-card" style={{ backgroundColor: "#D2FFD2" }}>
                  <Card.Body>
                  <img src={cemas} alt="Cemas" style={{ width: "160px", height: "160px", marginRight: "20px" }} />
                    <h5 style={{fontWeight:"bold"}}>DASS-Cemas</h5>
                    <p>Tenangkan dirimu dan temukan solusi. Kami akan membantu kecemasan-mu berkurang!</p>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row className="justify-content-center">
              <Col md={5}>
                <Card className="dass-card large-card" style={{ backgroundColor: "#D2E0FF" }}>
                  <Card.Body>
                    <h5 style={{fontWeight:"bold"}}>DASS-Depresi</h5>
                    <p>Tes ini mengukur tingkat depresi yang sedang kamu rasakan. Jangan menyerah! kami siap memberikan solusi</p>
                    <img src={depresi} alt="depresi" style={{ width: "230px", height: "230px", marginRight: "20px" }} />
                  </Card.Body>
                </Card>
              </Col>
              <Col md={5}>
              <Card className="dass-card small-card-suicide" style={{ backgroundColor: "#FFEFD2" }}>
                <Card.Body style={{textAlign:"left"}}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div>
                      <h5 style={{ fontWeight: "bold" }}>Suicide</h5>
                      <p>Tes ini untuk mengukur risiko diri seseorang yang memiliki kecenderungan bunuh diri.<br/>Kami tahu kamu hebat,<br/>banyak orang menyayangimu!</p>
                    </div>
                    <img src={suicide} alt="suicide" style={{ width: "150px", height: "150px", marginLeft: "20px" }} />
                  </div>
                </Card.Body>
              </Card>
            </Col>
            </Row>
          </div>
        </section>          
        <Container className="my-6">
            <Row className="justify-content-center">
              <Col md={10}>
                <Card className="about-us-card" style={{ backgroundColor: "#FFD2DD"}}>
                  <Card.Body>
                  <h5 style={{ fontSize: "20px", color:"#25B7D3", fontWeight:"bold" }}>
                    <FontAwesomeIcon icon={faInfoCircle} style={{ marginRight: "10px", textAlign:"left" }} />
                    info penting
                    <br></br>
                  </h5>      
                    <p style={{ fontSize: "18px" }}>
                    <br></br>
                    Kondisi gaduh gelisah, tindakan/percobaan bunuh diri yang sulit dikontrol tidak perlu skrining, ajak segera datang ke UGD Rumah Sakit terdekat atau{" "}
                    <a style={{fontWeight:"bold", color:"red"}} href="tel:911">Call 911</a>{" "}
                    atau <a style={{fontWeight:"bold", color:"red"}} href="tel:911">Local Emergency Service</a>{" "} untuk mendapatkan bantuan.
                  </p>
                  </Card.Body>
                </Card>
              </Col>    
            </Row>
          </Container>

      <Footer />
    </>
  );
};

export default TampilanAwal;
