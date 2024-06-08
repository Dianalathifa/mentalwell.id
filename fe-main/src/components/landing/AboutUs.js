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
      <section className="section before-content mt-5" style={{  fontFamily: "Abril Fatface",  paddingTop: "100px" }}>
      <Col md={12} className="d-flex align-items-center justify-content-center">
        <div className="container text-align" style={{ paddingLeft: "150px" }}>
          <h6 className="section-title mb-2 tfonts" style={{ paddingRight: "50px" }}>Tentang Kami</h6>
          <h6 className="subtitle-about" style={{ fontSize: "20px", paddingRight: "40px" }}>Selamat datang di MentalWell ruang digital yang didedikasikan untuk kesehatan mental.
          Kami adalah komunitas yang berfokus memberikan dukungan holistik dan sumber daya untuk meningkatkan kesejahteraan mental anda. MentalWell percaya bahwa setiap individu layak mendapatkan akses mudah dan aman
          terhadap layanan kesehatan mental yang berkualitas.</h6> 
        </div>
        <img src={logo1} alt="Logo" style={{ width: "400px", height: "360px", maxWidth: "100%", maxHeight: "100%", paddingRight:"60px"}} /> {/* Panggil gambar dengan variabel */}
      </Col>
      </section>
      <Container className="my-5">
        <Row className="justify-content-center">
        <Col md={3} className="d-flex align-items-center justify-content-center">
            <img src={image6} alt="Image" style={{ maxWidth: "100%", maxHeight: "100%" }} /> {/* Panggil gambar dengan variabel */}
          </Col>
          <Col md={6}>
           
              <h5  style={{ fontSize: "25px", fontWeight:"bold" }}><br></br>VISI<br></br></h5>
                <p style={{ fontSize: "20px" }}><br></br>Meningkatkan kesadaran tentang kesehatan mental <br></br>dan proses pengembangan diri untuk mewujudkan kualitas hidup<br/> yang lebih optimal<br></br><br></br></p>
             
          </Col>        
        </Row>
      </Container>

      <Container className="my-5">
        <Row className="justify-content-center">
        <Col md={3} className="d-flex align-items-center justify-content-center">
            <img src={image7} alt="Image" style={{ maxWidth: "100%", maxHeight: "100%" }} /> {/* Panggil gambar dengan variabel */}
          </Col>
          <Col md={6}>
            
              <h5  style={{ fontSize: "25px", fontWeight:"bold" }}><br></br>MISI<br></br></h5>
                <p style={{ fontSize: "20px" }}><br></br>1. Memahami permasalahan kesehatan mental yang sedang 
                                                            <br/>&nbsp;&nbsp;&nbsp;&nbsp;dialami remaja khususnya mahasiswa.<br></br>
                                                          2. Mengedukasi remaja khususnya mahasiswa tentang kesehatan mental 
                                                            <br/>&nbsp;&nbsp;&nbsp;&nbsp;dan pengembangan diri melalui berbagai konten kreatif di platform 
                                                            &nbsp;&nbsp;&nbsp;&nbsp;website.<br></br>
                                                          3. Menyediakan bantuan berupa layanan dukungan kesehatan mental 
                                                            <br/>&nbsp;&nbsp;&nbsp;&nbsp;dan pengembangan diri kepada remaja dan mahasiswa yang 
                                                            &nbsp;&nbsp;&nbsp;&nbsp;membutuhkan.<br></br>
                                                          4. Memberikan pemahaman kepada kalangan remaja agar lebih 
                                                            <br/>&nbsp;&nbsp;&nbsp;&nbsp;mengenal diri sendiri.</p>
             
          </Col>
        </Row>
      </Container>

      <br></br>
      <Container className="my-6">
        <Row className="justify-content-center">
          <Col md={8}>
            <Card className="about-us-card" style={{ backgroundColor: "#FFD2DD"}}>
              <Card.Body>
              <h5  style={{ fontSize: "25px", color:"red", fontWeight:"bold" }}>info penting<br></br></h5>
                <p style={{ fontSize: "20px" }}>
                  <br></br>Kondisi gaduh gelisah, tindakan/percobaan bunuh diri yang sulit dikontrol tidak perlu skrining, 
                  ajak segera datang ke UGD Rumah Sakit terdekat atau Call 911 atau Local Emergency Service 
                  untuk mendapatkan bantuan.</p><br/>
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
