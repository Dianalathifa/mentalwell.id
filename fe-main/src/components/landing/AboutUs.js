import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Footer from "../landing/Footer.js";
import Navbar from "../landing/Navbar.js";
import image6 from "../images/image6.png"; // Import gambar
import image7 from "../images/image7.png"; // Import gambar
import logo1 from "../images/logo1.png"; // Import gambar

const AboutUs = () => {

  return (
    <div>
      <Navbar />
      <section id="psikolog-list" className="section before-content" style={{ backgroundColor: "#C4EAF4", color: "#141313", fontFamily: "Abril Fatface", marginTop: "-140px", paddingTop: "200px" }}>
      <Col md={16} className="d-flex align-items-center justify-content-center">
        <div className="container text-left">
          <h6 className="section-title mb-2 tfonts">About Us</h6>
          <h6 className="subtitle" style={{ fontSize: "28px" }}>Selamat datang di MentalWell ruang digital yang didedikasikan <br></br>untuk kesehatan mental.
          Kami adalah komunitas yang berfokus memberikan dukungan holistik dan sumber daya untuk meningkatkan kesejahteraan mental anda. MentalWell percaya bahwa setiap individu layak mendapatkan akses mudah dan aman
          terhadap layanan kesehatan mental yang berkualitas.</h6> 
        </div>
        <img src={logo1} alt="Logo" style={{ width: "500px", height: "560px", maxWidth: "100%", maxHeight: "100%" }} /> {/* Panggil gambar dengan variabel */}
      </Col>
      </section>
      <section id="about" className="section before-content">
        <div className="container text-center">
          <div>
            <h6 className="section-title mb-2 tfonts">VISI & MISI</h6>
          </div>
        </div>
        </section>
      <Container className="my-5">
        <Row className="justify-content-center">
        <Col md={4} className="d-flex align-items-center justify-content-center">
            <img src={image6} alt="Image" style={{ maxWidth: "100%", maxHeight: "100%" }} /> {/* Panggil gambar dengan variabel */}
          </Col>
          <Col md={8}>
           
              <h5  style={{ fontSize: "30px", fontWeight:"bold" }}><br></br>VISI<br></br></h5>
                <p style={{ fontSize: "25px" }}><br></br>Meningkatkan kesadaran tentang kesehatan mental <br></br>dan proses pengembangan diri untuk mewujudkan kualitas hidup yang lebih optimal<br></br><br></br></p>
             
          </Col>        
        </Row>
      </Container>

      <Container className="my-5">
        <Row className="justify-content-center">
        <Col md={4} className="d-flex align-items-center justify-content-center">
            <img src={image7} alt="Image" style={{ maxWidth: "100%", maxHeight: "100%" }} /> {/* Panggil gambar dengan variabel */}
          </Col>
          <Col md={8}>
            
              <h5  style={{ fontSize: "30px", fontWeight:"bold" }}><br></br>MISI<br></br></h5>
                <p style={{ fontSize: "25px" }}><br></br>1. Memahami permasalahan kesehatan mental yang sedang dialami remaja khususnya mahasiswabr<br></br>
                                                          2. Mengedukasi remaja khususnya mahasiswa tentang kesehatan mental dan pengembangan diri melalui berbagai konten kreatif di platform website<br></br>
                                                          3. Menyediakan bantuan berupa layanan dukungan kesehatan mental dan pengembangan diri kepada remaja dan mahasiswa yang membutuhkan<br></br>
                                                          4. Memberikan pemahaman kepada kalangan remaja agar lebih mengenal diri sendiri</p>
             
          </Col>
        </Row>
      </Container>

      <br></br>
      <Container className="my-6">
        <Row className="justify-content-center">
          <Col md={9}>
            <Card className="about-us-card" style={{ backgroundColor: "#FFD2DD"}}>
              <Card.Body>
              <h5  style={{ fontSize: "30px", color:"red", fontWeight:"bold" }}>info penting<br></br></h5>
                <p style={{ fontSize: "25px" }}><br></br>Kondisi gaduh gelisah, tindakan/percobaan bunuh diri yang sulit dikontrol tidak perlu skrining, ajak segera datang ke UGD Rumah Sakit terdekat atau Call 911 atau Local Emergency Service untuk mendapatkan bantuan.</p>
              </Card.Body>
            </Card>
          </Col>

        </Row>
      </Container>
      <br></br>
      <br></br>

      <Footer />
    </div>
  );
};

export default AboutUs;
