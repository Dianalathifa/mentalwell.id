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


const TampilanAwal = () => {

  return (
    <div>
      <Navbar />
      <section id="psikolog-list" className="section before-content" style={{ backgroundColor: "#C4EAF4", color: "#141313", fontFamily: "Abril Fatface", marginTop: "-56px", paddingTop: "200px" }}>
        <div className="container text-center">
          <h6 className="section-title mb-2 tfonts">Mental Well<br></br>Test<br></br><br></br></h6>
          
        </div>
      </section>

      <section id="about" className="section before-content">
        <div className="container text-center">
          <div>
            <h2 className="section-title mb-2 tfonts">Pentingnya Kesehatan<br></br>Mental</h2>
          </div>
        </div>
        </section>

        <Container className="my-6">
        <Row className="justify-content-center text-center">
          <Col md={11}>
            <Card className="about-us-card" style={{ backgroundColor: "#FEF2DD"}}>
              <Card.Body>
                <p style={{ fontSize: "27px" }}><br></br>"Menurut World Health Organization (WHO) kesehatan <br></br> optimal diartikan bahwa suatu keadaan dimana seseorang <br></br> memiliki keadaan fisik, mental dan sosial yang seutuhnya."<br></br></p><br></br><br></br>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

     <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={6}>
              <p style={{ fontSize: "28px" }}>
                <br></br><br></br><br></br><br></br>Mengenali adanya gangguan mental <br></br>sedini mungkin 
                akan jauh lebih baik
                <br></br>dibandingkan membiarkan terlalu lama <br></br>yang dapat menyebabkan terganggunya <br></br>fungsi sehari-hari. 
                Jika lebih awal dikenali <br></br>juga akan mempermudah penanganan <br></br>dan biaya pengobatan.
              </p>
              
        </Col>
        <Col md={5} className="d-flex align-items-center justify-content-center">
          <img src={image10} alt="Image" style={{ maxWidth: "100%", maxHeight: "100%" }} />
        </Col>
      </Row>
      
    </Container>

    <br></br>
    <Container className="my-6">
      <Row className="justify-content-center">
        <Col md={{ span: 2, offset: 0.5 }}>
          <h1 style={{ fontSize: "20px", fontWeight: "bold", color: "#0C38B5" }}>
            <br></br><br></br>Setiap Orang yang <br></br>Memerlukan Bantuan
          </h1>
          <p style={{ fontSize: "20px", color: "#0C38B5" }}>
            Psikiater dan Psikolog <br></br>adalah tempat yang aman <br></br>
            untuk berkonsultasi <br></br>tentang masalah <br></br>kesehatan mental health.
          </p>
        </Col>
        <Col md={3} className="d-flex align-items-center">
          <img src={Test1} alt="Image" style={{ maxWidth: "100%", maxHeight: "100%" }} />
        </Col>
        <Col md={3} className="d-flex align-items-center">
          <img src={Test2} alt="Image" style={{ maxWidth: "100%", maxHeight: "100%" }} />
        </Col>
        <Col md={{ span: 2, offset: 0.5 }}>
          <h1 style={{ fontSize: "20px", fontWeight: "bold", color: "#0C38B5" }}>
            <br></br>Skrining Cepat <br></br>Bantuan Cepat
          </h1>
          <p style={{ fontSize: "20px", color: "#0C38B5" }}>
            Skrining Psikotes sebagai <br></br> langkah awal untuk <br></br>mencari bantuan <br></br>masalah kesehatan <br></br>mental anda
          </p>
        </Col>
      </Row>
    </Container>


     
     <br></br>
     <br></br>
      <section id="about" className="section before-content">
        <div className="container text-center">
          <div>
            <h6 className="section-title mb-2 tfonts">Alur Tes Kesehatan Mental</h6>
            <br></br>
            <br></br>
            <br></br>
            <br></br>

          </div>
          <Row className="text-center align-items-center">
          <Col>
            <img src={skrining}  className="mb-6" />
              <Card.Title>Langkah 1</Card.Title>
              <p>Melakukan skrining <br></br>psikotes online <br></br>untuk mengevaluasi <br></br>keluhan/gejala psikologis.</p>
          </Col>
          <Col>
             <img src={hasil}  className="mb-6" />
              <Card.Title>Langkah 2</Card.Title>  
              <p>Mendapatkan hasil tes <br></br>yang dapat digunakan <br></br>untuk acuan konsultasi <br></br>dengan tenaga profesional.</p>
 
          </Col>
          <Col>
           <img src={lanjutan}  className="mb-6" />
            <Card.Title>Langkah 3</Card.Title>
            <p>Melakukan skrining <br></br>psikotes online <br></br>untuk mengevaluasi <br></br>keluhan/gejala psikologis.</p>

          </Col>
        </Row>
        </div>
      
        </section>
        <Col md={14} className="text-center">
          <Link to="/srqdetail-user">
            <Button variant="light" style={{
            backgroundColor: "#25B7D3",
            borderRadius:"50px",
            color: "white",
            fontWeight: "bold",
            padding: '20px 35px', // Atur padding untuk mengatur ukuran tombol
            fontSize: '25px'}} >Mulai Skrining</Button>
          </Link>
        </Col>

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
      
      <Footer />
    </div>
  );
};

export default TampilanAwal;
