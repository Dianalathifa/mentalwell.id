import React from 'react';
import { Col, Button, Container } from 'react-bootstrap';
// import { Link } from "react-router-dom/cjs/react-router-dom.min.js";
import cemas from '../../video/cemas-ringan.mp4'; // Sesuaikan path dengan lokasi video Anda
import Navbar from '../../landing/Navbar.js';
import Footer from '../../landing/Footer.js';

const Teknik54321 = () => {
return (
    <>
    <Navbar />
    <Container>
        <div className="container text-center">
            <h6 className="section-title mb-2 tfonts" style={{ borderColor:"#FFD2DD",color:"#25B7D3", fontWeight:"bold"}}><br />Ayo Kita Mulai Grounding 5-4-3-2-1 untuk Mengatasi Kecemasan<br /></h6>
            </div>
      
        <br></br><br></br><br></br><br></br>
    </Container>
    <Col md={16} className="d-flex align-items-center justify-content">
        <div className="container text-center">

        <video src={cemas} controls style={{ width: "700px", height: "auto", maxWidth: "100%", maxHeight: "100%" }} />      
        <br></br><br></br><br></br>

        </div>
        </Col>
        <br/><br/><br/>
        <Footer/>
        
      </>
    );
};
export default Teknik54321;
