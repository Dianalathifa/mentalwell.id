import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Footer from "../landing/Footer.js";
import Navbar from "../landing/Navbar.js";
import welcomeImage from "../images/intervensi/intervensi-detail.png";
import gambar1 from "../images/alur1.png";
import gambar2 from "../images/alur2.png";
import gambar3 from "../images/alur3.png";
import cemasImage from "../images/intervensi/cemas1.png";
import stressImage from "../images/intervensi/stress1.png";
import depresiImage from "../images/intervensi/depresi1.png";

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
          <div className="intervensi-options">
            <div className="intervensi-option">
              <p className="intervensi-text">Intervensi</p>
              <Button variant="link" className="intervensi-button" href="/cemas-user">Cemas</Button>
            </div>
            <div className="separator"></div>
            <div className="intervensi-option">
              <p className="intervensi-text">Intervensi</p>
              <Button variant="link" className="intervensi-button" href="/stress-user">Stress</Button>
            </div>
            <div className="separator"></div>
            <div className="intervensi-option">
              <p className="intervensi-text">Intervensi</p>
              <Button variant="link" className="intervensi-button" href="/depresi-user">Depresi</Button>
            </div>
          </div>
          <section>
            <Container>
              <Row>
                <Col md={9}>
                  <Card className="info-card">
                    <Card.Body className="info-card-body">
                      <div className="info-text-container">
                        <p className="info-text">
                          Pilih intervensi sesuai dengan hasil tes Kamu, mulai dari 'Kecemasan Ringan', 'Stress', hingga 'Depresi'
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

          <section>
            <Container>
              <Row>
                <Col md={9}>
                  <Card className="info-card">
                    <Card.Body className="info-card-body">
                      <div className="info-text-container">
                        <p className="info-text">
                          Ingatlah, semua fitur ini terbuka dan bisa kamu coba. Klasifikasi untuk yang lain juga bisa kamu eksplorasi untuk siapa pun yang ingin menjaga kesehatan mental mereka, tidak hanya untuk yang telah didiagnosis.
                        </p>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={3}>
                  <div className="info-image-container">
                    <img src={gambar3} alt="Gambar Ketiga" className="info-image" />
                  </div>
                </Col>
              </Row>
            </Container>
          </section>
        </Container>
      </section>

      <section id="intervensi-list" className="section before-content" style={{ paddingTop: "30px" }}>
        <div className="container text-center">
          <h6 className="section-title mb-2 tfonts-2">Intervensi</h6>
          <h6 className="subtitle" style={{ fontSize: "18px" }}>
            "Temukan intervensi yang sesuai untuk membantu kesehatan mentalmu."
          </h6>
        </div>
      </section>
      <Container className="my-5">
        <Row className="justify-content-center">
          <Col xs={12} sm={6} md={3} className="mb-4">
            <Card className="card-hover">
              <Card.Img variant="top" src={cemasImage} alt="Cemas" className="card-image" />
              <Card.Body className="d-flex flex-column">
                <Card.Title className="card-title">Cemas</Card.Title>
                <Card.Text className="card-text">Ikuti intervensi berikut untuk mengatasi cemas dan menemukan ketenangan dalam hidup Anda.</Card.Text>
                <Link to="/cemas-user" className="mt-auto">
                  <Button variant="light" className="custom-button">Lihat Intervensi</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} sm={6} md={3} className="mb-4">
              <Card className="card-hover">
                <Card.Img variant="top" src={stressImage} alt="Stress" className="card-image" />
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="card-title">Stress</Card.Title>
                  <Card.Text className="card-text">Ikuti intervensi berikut untuk mengatasi stress dan meningkatkan kesejahteraan mental Anda.</Card.Text>
                  <Link to="/stress-user" className="mt-auto">
                    <Button variant="light" className="custom-button">Lihat Intervensi</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} sm={6} md={3} className="mb-4">
            <Card className="card-hover" style={{marginBottom:"100px"}}>
              <Card.Img variant="top" src={depresiImage} alt="Depresi" className="card-image" />
              <Card.Body className="d-flex flex-column">
                <Card.Title className="card-title">Depresi</Card.Title>
                <Card.Text className="card-text">Ikuti intervensi berikut untuk mengatasi depresi ringan serta dukungan yang Anda butuhkan.</Card.Text>
                <Link to="/depresi-user" className="mt-auto">
                  <Button variant="light" className="custom-button">Lihat Intervensi</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <Footer />
    </div>
  );
};

export default IntervensiUser;
