import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Footer from "../landing/Footer.js";
import Navbar from "../landing/Navbar.js";
import welcomeImage from "../images/intervensi/intervensi-detail.png";
import gambar1 from "../images/alur1.png";
import gambar2 from "../images/alur2.png";
import gambar3 from "../images/alur3.png";
import cemasImage from "../images/intervensiStress/Cemas.png";
import stressImage from "../images/intervensiStress/Stress.png";
import depresiImage from "../images/intervensiStress/Depresi.png";
import cemasRingan from "../images/intervensi/Cemas54321.png";
import cemasSedang from "../images/intervensi/MBSR.png";
import stressRingan from "../images/intervensi/StressCoping.png";
import stressSedang from "../images/intervensi/30days.png";
import depresiRingan from "../images/intervensi/Activity.png";
import depresiSedang from "../images/intervensi/CBT.png";
import '../style/Intervensi.css';

const IntervensiUser = () => {
  return (
    <div>
      <Navbar />
      <section id="intervensi-list" className="section before-content-detail">
        <Container className="section-container">
          <Row className="align-items-center">
            <Col md={6} className="text-md-left">
              <h1 className="title">Hallo, Selamat Datang Di Intervensi MentalWell!</h1>
              <p className="subtitle-detail">Selamat telah sampai di fitur intervensi kami! Kami berharap fitur ini membantu Kamu dan memberikan manfaat yang signifikan.</p>
            </Col>
            <Col md={6} className="text-center">
              <img src={welcomeImage} alt="Welcome" className="welcome-image" />
            </Col>
          </Row>
       
          <section>
            <Container>
              <Row>
                <Col md={9}>
                  <Card className="info-card">
                    <Card.Body className="info-card-body">
                      <div className="info-text-container">
                        <p className="info-text">
                          Dapatkan intervensi sesuai dengan hasil tes kamu, mulai dari 'Kecemasan', 'Stress', hingga 'Depresi'
                        </p>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={3}>
                  <div className="info-image-container">
                    <img src={gambar1} alt="Gambar Pertama" className="info-image" />
                  </div>
                </Col>
              </Row>
            </Container>
          </section>

          <section>
            <Container>
              <Row>
                <Col md={3}>
                  <div className="info-image-container">
                    <img src={gambar2} alt="Gambar Kedua" className="info-image-left" />
                  </div>
                </Col>
                <Col md={9}>
                  <Card className="info-card">
                    <Card.Body className="info-card-body">
                      <div className="info-text-container">
                        <p className="info-text">
                          Kemudian, Kamu akan diarahkan ke halaman dengan informasi dan metode intervensi yang dapat Kamu praktikkan sesuai petunjuk yang diberikan.
                        </p>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Container>
          </section>

        </Container>
      </section>
      <section id="intervensi-list" className=" before-content" style={{ color: "#25B7D3" }}>
        <div className="container text-center">
          <h6 className="section-title mb-2 tfonts-2" style={{ marginBottom: "10px" }}>Intervensi List</h6>
          <h6 className="subtitle" style={{ fontSize: "16px", marginBottom: "20px" }}>
            Kamu akan diberi intervensi yang sesuai dengan kondisi mental kamu untuk mendapatkan bantuan dan dukungan. <br />Berikut intervensi yang kami berikan untuk membantu meningkatkan dan memperbaiki kondisimu
          </h6>
        </div>
      </section>

      <Container className="my-5" style={{ paddingBottom: "40px", maxWidth: "1100px" }}>
        <Row className="justify-content-center">
          <Col xs={12} sm={6} md={4} className="mb-4">
            <Card className="card-hover-circle">
              <Card.Body className="d-flex flex-column">
                <div className="title-container-circle">
                  <Card.Title className="card-title-circle">Cemas</Card.Title>

                </div>
                <Card.Text className="card-text-circle"> Intervensi ini akan membantumu mengatasi cemas dan menemukan ketenangan dalam hidup.</Card.Text>
                <img src={cemasImage} alt="Cemas" className="card-image-circle" />
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} sm={6} md={4} className="mb-4">
            <Card className="card-hover-circle">
              <Card.Body className="d-flex flex-column">
                <div className="title-container-circle">
                  <Card.Title className="card-title-circle">Stress</Card.Title>

                </div>
                <Card.Text className="card-text-circle">Intervensi ini membantumu mengatasi stress dan meningkatkan kesejahteraan mental kamu.</Card.Text>
                <img src={stressImage} alt="Stress" className="card-image-circle" />
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} sm={6} md={4} className="mb-4">
            <Card className="card-hover-circle">
              <Card.Body className="d-flex flex-column">
                <div className="title-container-circle">
                  <Card.Title className="card-title-circle">Depresi</Card.Title>

                </div>
                <Card.Text className="card-text-circle">Intervensi ini membantumu mengatasi depresi serta memberikan dukungan yang kamu butuhkan.</Card.Text>
                <img src={depresiImage} alt="Depresi" className="card-image-circle" />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <section id="intervensi-list" style={{ color: "#25B7D3", backgroundColor: "#E3F7FE", paddingTop: "40px" }}>
        <div className="container text-center">
          <h6 className="section-title mb-2 tfonts-2" style={{ marginBottom: "10px" }}>Simak penjelasan masing-masing intervensi!</h6>
        </div>

        <Container className="my-5" style={{ paddingBottom: "20px", maxWidth: "1000px" }}>
          <Row className="justify-content-center">
            <Col xs={12} md={4} className="mb-4">
              <img src={cemasImage} alt="Cemas" className="img-fluid" style={{ height: "100%", objectFit: "cover" }} />
            </Col>
            <Col xs={12} md={8}>
              <div className="mb-4" style={{ color: "#4A4A4A" }}>
                <Card.Title className="card-title-circle">Cemas</Card.Title>
                <p> Memiliki dua kategori yaitu cemas ringan dan cemas sedang. Kamu akan mendapatkan salah satu intervensi ketika sudah melakukan tes di Mentalwell!</p>
              </div>
              <Row>
                <Col xs={12} sm={6} className="mb-4">
                  <Card className="card-hover-circle">
                    <Card.Body className="d-flex flex-column">
                      <div className="title-container-circle">
                        <Card.Title className="card-title-circle">Cemas Ringan</Card.Title>
                      </div>
                      <Card.Text className="card-text-circle">
                        Melakukan Teknik Grounding 5-4-3-2-1 untuk mengatasi cemas dalam skala ringan dan temukan ketenangan dalam hidup.
                      </Card.Text>
                      <img src={cemasRingan} alt="Stress" className="card-image-circle" />
                    </Card.Body>
                  </Card>
                </Col>
                <Col xs={12} sm={6} className="mb-4">
                  <Card className="card-hover-circle">
                    <Card.Body className="d-flex flex-column">
                      <div className="title-container-circle">
                        <Card.Title className="card-title-circle">Cemas Sedang</Card.Title>
                      </div>
                      <Card.Text className="card-text-circle">
                        Mindfulness-Based Stress Reduction intervensi untuk mengatasi cemas skala sedang dan temukan ketenangan dalam hidup anda.
                      </Card.Text>
                      <img src={cemasSedang} alt="Depresi" className="card-image-circle" />
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
        </section>


        <Container className="my-5" style={{ paddingBottom: "20px", maxWidth: "1000px" }}>
          <Row className="justify-content-center">
            <Col xs={12} md={8}>
              <div className="mb-4" style={{ color: "#4A4A4A" }}>
                <Card.Title className="card-title-circle">Stress</Card.Title>
                <p> Memiliki dua kategori untuk intervensi ini yaitu stress ringan dan stress sedang. Kamu akan mendapatkan salah satu intervensi ketika sudah melakukan tes di Mentalwell!</p>
              </div>
              <Row>
                <Col xs={12} sm={6} className="mb-4">
                  <Card className="card-hover-circle">
                    <Card.Body className="d-flex flex-column">
                      <div className="title-container-circle">
                        <Card.Title className="card-title-circle">Stress Ringan</Card.Title>
                      </div>
                      <Card.Text className="card-text-circle">
                      Melakukan Stress Coping Strategies untuk mengatasi stress ringan yang kamu alami dan meningkatkan kesejahteraan mental anda.   
                      </Card.Text>
                      <img src={stressRingan} alt="Stress" className="card-image-circle" />
                    </Card.Body>
                  </Card>
                </Col>
                <Col xs={12} sm={6} className="mb-4">
                  <Card className="card-hover-circle">
                    <Card.Body className="d-flex flex-column">
                      <div className="title-container-circle">
                        <Card.Title className="card-title-circle">Stress Sedang</Card.Title>
                      </div>
                      <Card.Text className="card-text-circle">
                      Melakukan Challenge 30 Days Writing untuk mengatasi stress dalam skala sedang dan meningkatkan kesejahteraan mental anda.
                      </Card.Text>
                      <img src={stressSedang} alt="Depresi" className="card-image-circle" />
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Col>
            <Col xs={12} md={4} className="mb-4">
              <img src={stressImage} alt="Cemas" className="img-fluid" style={{ height: "100%", objectFit: "cover" }} />
            </Col>
          </Row>
        </Container>

        <section id="intervensi-list" style={{ color: "#25B7D3", backgroundColor: "#E3F7FE", paddingTop: "20px" }}>
        <Container className="my-5" style={{ paddingBottom: "20px", maxWidth: "1000px" }}>
          <Row className="justify-content-center">
            <Col xs={12} md={4} className="mb-4">
              <img src={depresiImage} alt="Cemas" className="img-fluid" style={{ height: "100%", objectFit: "cover" }} />
            </Col>
            <Col xs={12} md={8}>
              <div className="mb-4" style={{ color: "#4A4A4A" }}>
                <Card.Title className="card-title-circle">Depresi</Card.Title>
                <p> Memiliki dua kategori untuk intervensi ini yaitu depresi ringan dan depresi sedang. Kamu akan mendapatkan salah satu intervensi ketika sudah melakukan tes di Mentalwell!</p>
              </div>
              <Row>
                <Col xs={12} sm={6} className="mb-4">
                  <Card className="card-hover-circle">
                    <Card.Body className="d-flex flex-column">
                      <div className="title-container-circle">
                        <Card.Title className="card-title-circle">Depresi Ringan</Card.Title>
                      </div>
                      <Card.Text className="card-text-circle">
                      Melakukan Activity Therapy untuk mengatasi depresi dengan gejala ringan dan membutuhkan dukungan untuk membuat harimu lebih berwarna.
                      </Card.Text>
                      <img src={depresiRingan} alt="Stress" className="card-image-circle" />
                    </Card.Body>
                  </Card>
                </Col>
                <Col xs={12} sm={6} className="mb-4">
                  <Card className="card-hover-circle">
                    <Card.Body className="d-flex flex-column">
                      <div className="title-container-circle">
                        <Card.Title className="card-title-circle">Depresi Sedang</Card.Title>
                      </div>
                      <Card.Text className="card-text-circle">
                      Melakukan Cognitive Behavior Therapy untuk mengatasi depresi dengan gejala sedang dan membutuhkan bantuan untuk pulih kembali.
                      </Card.Text>
                      <img src={depresiSedang} alt="Depresi" className="card-image-circle" />
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
        <Footer />
        </section>


      
    </div>
  );
};

export default IntervensiUser;
