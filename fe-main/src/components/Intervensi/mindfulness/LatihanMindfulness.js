import React from 'react';
import { Col, Button, Container, Card, Row } from 'react-bootstrap';
import walking from '../../video/mindfulness-walking.mp4'; // Sesuaikan path dengan lokasi video Anda
import Navbar from '../../landing/Navbar.js';
import Footer from '../../landing/Footer.js';
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../style/Intervensi.css";

const MBSR = () => {
return (
    <>
    <Navbar />
    <Container>
        <div className="container text-center" style={{marginTop:"100px"}}>
            <h6 className="section-title mb-2 tfonts" style={{ color:"#EBBCBC", fontWeight:"bold"}}><br />Hello Welcome to Week 2 !<br />Yuk Kita Belajar Tentang Latihan Walking<br /></h6>
            </div>
            <Row className="justify-content-center">
              <Col md={10}>
                <Card className="about-us-card" style={{ backgroundColor: "#EBBCBC", marginTop:"50px"}}>
                  <Card.Body>
                  <h5 style={{ fontSize: "20px", color:"white", fontWeight:"bold" }}>
                    <FontAwesomeIcon icon={faInfoCircle} style={{ marginRight: "10px", textAlign:"left" }} />
                    Latihan Mindful Walking:
                    <br></br>
                  </h5>      
                    <p style={{ fontSize: "18px" }}>
                    <br></br>
                - &nbsp;Pilih tempat yang tenang dan aman untuk berjalan kaki.<br></br>
                - &nbsp;Berjalanlah dengan perlahan dan perhatikan setiap langkah kaki Anda.<br></br>
                - &nbsp;Rasakan sensasi kaki Anda saat menyentuh tanah.<br></br>
                - &nbsp;Perhatikan gerakan tubuh Anda saat berjalan.<br></br>
                - &nbsp;Jika pikiran Anda mengembara, bawalah kembali perhatian Anda ke langkah kaki Anda.
                </p>
                  </Card.Body>
                </Card>
              </Col>    
            </Row>
        </Container>

        <section className="section before-content" style={{ backgroundColor: "#EBBCBC",  marginTop: "100px", paddingTop: "100px", paddingBottom: "100px" }}>
        <Col md={16} className="d-flex align-items-center justify-content">
            <div className="container text-center">
            <h6 className="subtitle" style={{ fontSize: "30px", fontWeight:"bold", color:"white"}}>Latihan Mindful Walking</h6> 
            </div>
        </Col>
        <br></br><br></br><br></br>
        <Col md={12} className="d-flex align-items-center justify-content">
        <div className="container text-center">
        <br/>
        <video src={walking} controls style={{ width: "700px", height: "auto", maxWidth: "100%", maxHeight: "100%" }} />      
        <br></br>
        </div>
        </Col>
        <Button variant="light" className="custom-button" style={{marginTop:"30px", width: "250px", height: "50px", backgroundColor:"white", borderColor:"#EBBCBC", color:"#EBBCBC", fontWeight:"bold", fontSize:"18px", borderRadius:"50px"}} href="/mindfulness-2" >Checklist Harian</Button>

        </section>
        
        
        <Footer/>
      </>
    );
};
export default MBSR;
