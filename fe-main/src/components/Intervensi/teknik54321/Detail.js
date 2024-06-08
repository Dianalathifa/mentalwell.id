import React from 'react';
import { Col, Row, Card, Button, Container } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { useInView } from 'react-intersection-observer';
import Navbar from '../../landing/Navbar.js';
import Footer from '../../landing/Footer.js';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../../style/Intervensi.css'; // Impor CSS global
import cemas from '../../video/cemas-ringan.mp4'; // Sesuaikan path dengan lokasi video Anda


const Teknik54321 = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1, 
  });

  return (
    <>
      <Navbar />
      <Container>
        <div className="container text-center" style={{marginTop:"150px"}}>
          <h6 className="section-title mb-2 tfonts-2" style={{ borderColor:"#FFD2DD", color:"#25B7D3", fontWeight:"bold" }}>
            Ayo Kita Mulai Grounding 5-4-3-2-1 <br/>untuk Mengatasi Kecemasan<br />
          </h6>
        </div>
        <br />
      </Container>
      <Container className="my-6">
        <Row className="justify-content-center">
          <Col md={10}>
            <Card className="about-us-card" style={{ backgroundColor: "#FFD2DD" }}>
              <Card.Body>
                <h5 style={{ fontSize: "20px", color:"#25B7D3", fontWeight:"bold" }}>Tips :<br /></h5>
                <p style={{ fontSize: "18px" }}>
                  <br />1. Lakukan teknik grounding 5-4-3-2-1 di tempat yang tenang dan bebas dari gangguan.
                  <br />2. Tutup mata anda untuk membantu fokus pada indra anda.
                  <br />3. Berikan diri anda waktu untuk merasakan sensasi dari setiap benda yang anda lihat, sentuh, dengar, cium, dan rasakan.
                  <br />4. Jika pikiran anda mengembara, bawalah kembali ke indra yang anda fokuskan saat ini.
                  <br />5. Lakukan teknik ini rutin untuk membantu anda mengelola kecemasan dan stress.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Col md={16} className="d-flex align-items-center justify-content">
        <div className="container text-center">
          <div ref={ref}>
            {inView && (
              <video src={cemas} controls style={{ width: "700px", height: "auto", maxWidth: "100%", maxHeight: "100%" }} />
            )}
          </div>
          <br /><br /><br />
        </div>
      </Col>
      
      <Container>
        <Col md={14} className="text-center">
          <Link to="/Intervensi54321-user">
            <Button 
              variant="light"
              className="custom-button"
              style={{
                borderRadius: "50px",
                fontWeight: "bold",
                padding: '15px 30px',
                fontSize: '18px'
              }}
            >
              Yuk Mulai Checklist Harian!
            </Button>
          </Link>
        </Col>
      </Container>
      <br /><br /><br />
      <Footer />
    </>
  );
};

export default Teknik54321;
