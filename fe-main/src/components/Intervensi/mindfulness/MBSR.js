import React from 'react';
import { Col, Button, Container, Card, Row } from 'react-bootstrap';
import week1 from '../../video/mindfulness-week1.mp4'; 
import Navbar from '../../landing/Navbar.js';
import Footer from '../../landing/Footer.js';
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../../style/Intervensi.css'; 


const MBSR = () => {
return (
    <>
    <Navbar />
        <Container className="my-6" style={{paddingTop:"100px"}}>
        <div className="container text-center mt-5">
            <h6 className="section-title mb-2 tfonts" style={{ color:"#EBBCBC", fontWeight:"bold"}}><br />Hello Welcome to Week 1 !<br />Mari Lakukan Latihan Meditasi<br /></h6>
            </div>
            <Row className="justify-content-center">
              <Col md={10}>
                <Card className="about-us-card" style={{ backgroundColor: "#EBBCBC", marginTop:"50px"}}>
                  <Card.Body>
                  <h5 style={{ fontSize: "20px", color:"white", fontWeight:"bold" }}>
                    <FontAwesomeIcon icon={faInfoCircle} style={{ marginRight: "10px", textAlign:"left" }} />
                    Latihan meditasi singkat
                    <br></br>
                  </h5>      
                    <p style={{ fontSize: "18px" }}>
                    <br></br>
                Berikut adalah contoh latihan meditasi singkat yang dapat Anda lakukan di rumah:<br></br>
                - &nbsp;Duduklah dengan nyaman di kursi atau di lantai dengan punggung tegak.<br></br>
                - &nbsp;Tutup mata Anda atau arahkan pandangan Anda ke bawah.<br></br>
                - &nbsp;Fokuskan perhatian Anda pada pernapasan Anda. Rasakan sensasi napas yang masuk dan keluar dari hidung Anda.<br></br>
                - &nbsp;Jika pikiran Anda mengembara, dengan lembut bawa kembali perhatian Anda ke pernapasan Anda.<br></br>
                - &nbsp;Ikuti alur meditasi dibawah.
                </p>
                  </Card.Body>
                </Card>
              </Col>    
            </Row>
          </Container>

        <section className="section before-content" style={{ backgroundColor: "#EBBCBC", color: "#141313", marginTop: "-10px", paddingTop: "100px", paddingBottom: "100px" }}>
        <Col md={16} className="d-flex align-items-center justify-content">
            <div className="container text-center">
            <h6 className="subtitle" style={{ fontSize: "18px", fontWeight:"bold", color:"white"}}>Mari kita temukan kedamaian dalam keheningan. <br></br>Ayo mulai sesi meditasi untuk menenangkan pikiran dan menyegarkan jiwa kita bersama!</h6> 
            </div>
        </Col>
        <br></br><br></br><br></br>
        <Col md={16} className="d-flex align-items-center justify-content">
        <div className="container text-center">

        <video src={week1} controls style={{ width: "700px", height: "auto", maxWidth: "100%", maxHeight: "100%" }} />      
        <br></br><br></br><br></br>
        <Button variant="light" style={{width: "250px", height: "50px", backgroundColor:"white", borderColor:"white",color:"#EBBCBC", fontWeight:"bold", fontSize:"18px", borderRadius:"50px"}} href="/mindfulness-1" >Checklist Harian</Button>

        </div>
        </Col>

        </section>
        <Footer/>
      </>
    );
};
export default MBSR;
