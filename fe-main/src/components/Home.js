import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import mentalwelltes from "./images/mw-tes.png";
import daily from "./images/d-insight.png";
import psikolist from "./images/psikolog-list.png";
import illustrasi from "./images/illustrasi-1.png";
import tes from "./images/tes.png";
import dailyinsight from "./images/dailyinsight.png";
import psikolog1 from "./images/psikolog1.png";
import Footer from "./landing/Footer.js";
import Navbar from "./landing/Navbar.js";
import "./style/Home.css";

const PsikologCard = ({ image, nama_psikolog }) => {
  return (
    <Card style={{ width: "18rem" }}>
      <div className="card-image-container">
        <Card.Img
          variant="top"
          src={`http://localhost:8080/images/psikolog/${image}`}
          alt={nama_psikolog}
          className="card-image"
        />
      </div>
      <Card.Body className="text-center">
        <Card.Title className="my-3">{nama_psikolog}</Card.Title>
        <Button variant="info" className="my-3">
          Cek Sekarang
        </Button>
      </Card.Body>
    </Card>
  );
};


const Home = () => {
  const [psikolog, setPsikologs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await getPsikolog();
    };

    fetchData();
  }, []);

  const getPsikolog = async () => {
    const response = await axios.get(`http://localhost:8080/api/psikolog`);
    setPsikologs(response.data);
  };


  return (
    <>
      <Navbar />
      <section id="psikolog-list" className="section before-content" style={{ backgroundColor: "#C4EAF4", color: "#141313", fontFamily: "Abril Fatface", marginTop: "-140px", paddingTop: "200px" }}>
      <Col md={16} className="d-flex align-items-center justify-content">
        <div className="container text-left">
          <h6 className="section-title mb-2 tfonts">Mental Well</h6>
          <h6 className="subtitle" style={{ fontSize: "28px" }}>adalah platform kesehatan mental yang dirancang sebagai solusi inovatif dalam meningkatkan kesehatan mental mahasiswa melalui  test dan pemahaman lebih dalam tentang kesejahteraan mental.</h6> 
          <Button variant="light" style={{backgroundColor:"#FFD2DD", borderColor:"#FFD2DD",color:"black", fontWeight:"bold"}}>Baca Selengkapnya</Button>

        </div>
        <img src={illustrasi} alt="Logo" style={{ width: "700px", height: "700px", maxWidth: "100%", maxHeight: "100%" }} /> {/* Panggil gambar dengan variabel */}
      </Col>
      </section>
      <br></br>
      <br></br>
      <section id="about" className="section before-content">
        <div className="container text-center">
          <div>
            <h6 className="section-title mb-2 tfonts">Layanan Mental Well</h6>
          </div>
          <br></br>
          <br></br>
          <br></br>
          <Row className="text-center align-items-center">
          <Col>
            
                <img src={tes} size="4x" className="mb-6" />
                <Card.Title>MentalWell Test</Card.Title>
              
          </Col>
          <Col>
          
                <img src={dailyinsight} size="4x" className="mb-6" />
                <Card.Title>Daily Insight</Card.Title>
              
          </Col>
          <Col>
            
                <img src={psikolog1} size="4x" className="mb-6" />
                <Card.Title>Psikolog List</Card.Title>
              
          </Col>
        </Row>
        </div>
        </section>


      {/*LAYANAN 1*/}
      <hr></hr>
      <hr></hr>
      <Container className="my-5">
        <Row className="justify-content-center">
        <Col md={4} className="d-flex align-items-center justify-content-center">
            <img src={mentalwelltes} alt="Image" style={{ maxWidth: "100%", maxHeight: "100%" }} /> {/* Panggil gambar dengan variabel */}
          </Col>
          <Col md={8}>
            
              <h5  style={{ fontSize: "30px", fontWeight:"bold" }}><br></br>Mental Well Test<br></br></h5>
                <p style={{ fontSize: "25px" }}><br></br>Mental Health Test merupakan tes berupa skala psikologi. <br></br>
                Skala psikologi sendiri adalah instrumen pengukuran untuk mengidentifikasi konstruk psikologis tertentu dalam diri seseorang.<br></br>
                Hasil tes kurang lebih dapat digunakan sebagai screening awal kondisi psikologis individu, tetapi bukan sebagai diagnosis.<br></br><br></br></p>
              
          </Col>        
        </Row>
      </Container> 

      {/*LAYANAN 2*/}
       <hr></hr>
      <hr></hr>
      <Container className="my-5">
        <Row className="justify-content-center">
        <Col md={4} className="d-flex align-items-center justify-content-center">
            <img src={daily} alt="Image" style={{ maxWidth: "100%", maxHeight: "100%" }} /> {/* Panggil gambar dengan variabel */}
          </Col>
          <Col md={8}>
              <h5  style={{ fontSize: "30px", fontWeight:"bold" }}><br></br>Daily Insight<br></br></h5>
                <p style={{ fontSize: "25px" }}><br></br>Daily Insight merupakan fitur yang dirancang untuk memberikan pengguna akses harian konten bermutu yang mendukung peningkatan kesehatan mental. Fitur ini menyediakan artikel, materi, dan panduan yang membahas berbagai aspek kesehatan mental, memberikan wawasan, dan memberikan dukungan untuk meningkatkan diri.</p>
          </Col>        
        </Row>
      </Container> 

      {/*LAYANAN 3*/}
      <hr></hr>
      <hr></hr>
      <Container className="my-5">
        <Row className="justify-content-center">
        <Col md={4} className="d-flex align-items-center justify-content-center">
            <img src={psikolist} alt="Image" style={{ maxWidth: "100%", maxHeight: "100%" }} /> {/* Panggil gambar dengan variabel */}
          </Col>
          <Col md={8}>
          
              <h5  style={{ fontSize: "30px", fontWeight:"bold" }}><br></br>Psikolog List<br></br></h5>
                <p style={{ fontSize: "25px" }}><br></br>Psikolog List merupakan bentuk layanan yang berupa informasi psikologi ahli yakni berisi terkait nama, lokasi dan foto dari profile psikolog. Layanan ini sebagai rekomendasi rujukan bagi penderita yang butuh penanganan oleh ahli.</p>
             
          </Col>        
        </Row>
      </Container>  
      <hr></hr> 
      <hr></hr> 

      <Container className="mt-5">
        <div className="container text-center">
          <div>
            <h6 className="section-title mb-2 tfonts">Rekomendasi Psikolog </h6>
            <br></br>
            <br></br>
          </div>
          <div className="scrollable-cards-container py-5 d-flex flex-wrap justify-content-center">
            {/* Menggunakan d-flex, flex-wrap, dan justify-content-center untuk styling */}
            {psikolog.map((psikolog) => (
              <Col key={psikolog.id_psikolog} className="mr-6 mb-6" style={{ flex: "0 0 auto", maxWidth: "300px" }}>
                {/* Set flex ke auto agar lebar card menyesuaikan konten */}
                <PsikologCard image={psikolog.image_psikolog} nama_psikolog={psikolog.nama_psikolog} />
              </Col>
            ))}
          </div>
        </div>
      </Container>

     <Footer />
      
    </>
  );
};

export default Home;

