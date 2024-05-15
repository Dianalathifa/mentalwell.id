import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom.min.js";
import Footer from "../landing/Footer.js";
import Navbar from "../landing/Navbar.js";
import terapi4 from "../images/intervensi/terapi4.png"; // Import gambar
import mindfulness4 from "../images/intervensi/mindfulness4.png"; // Import gambar
import challenge from "../images/intervensiStress/30.png"; // Import gambar
import ringan from "../images/stressCoping/stressringan1.png"; // Import gambar
import cemasRingan from "../images/intervensi/cemas-ringan.jpg"; // Import gambar

const IntervensiUser = () => {
    return (
        <div>
            <Navbar />
            <br></br>
            <section id="intervensi-list" className="section before-content" style={{ backgroundColor: "#C4EAF4", color: "#141313", fontFamily: "Abril Fatface", marginTop: "-140px", paddingTop: "200px" }}>
                    <div className="container text-center ">
                        <h6 className="section-title mb-2 tfonts" >Intervensi untuk Kesehatan Mental</h6>
                        <h6 className="subtitle" style={{ fontSize: "28px" }}>Temukan berbagai intervensi untuk mengatasi stres, depresi, dan cemas</h6> <br></br><br></br><br></br>
                    </div>
            </section>
            <br></br><br></br><br></br>
                    
                    <Container className="my-5">
                        <Row className="justify-content-center">
                            <Col md={9} className="d-flex align-items-center justify-content-center">
                                <img src={cemasRingan} alt="image" style={{ borderRadius:"50px", maxWidth: "25%", maxHeight: "100%" }} />
                            <Col/>
                                <Col md={8}>
                                    <Card.Body>
                                        <Card.Title  style={{ fontSize: "35px" }}>Cemas Ringan</Card.Title>
                                        <Card.Text style={{ fontSize: "20px" }}>Lakukan Teknik Grounding 5-4-3-2-1 untuk mengatasi cemas dan menemukan ketenangan dalam hidup anda.</Card.Text><br/>
                                        <Link to="/intervensigrounding-user" >Lihat Intervensi</Link>
                                    </Card.Body>
                                </Col>
                                <br/>
                             </Col>
                        </Row>
                    </Container>   
                        
                    <Container className="my-5">
                        <Row className="justify-content-center">
                            <Col md={9} className="d-flex align-items-center justify-content-center">
                                <img src={mindfulness4} alt="image" style={{ borderRadius:"50px", maxWidth: "25%", maxHeight: "100%" }} />
                            <Col/>
                                <Col md={8}>
                                    <Card.Body>
                                        <Card.Title  style={{ fontSize: "35px" }}>Cemas Sedang</Card.Title>
                                        <Card.Text style={{ fontSize: "20px" }}>Mindfulness-Based Stress Reduction intervensi untuk mengatasi cemas dan menemukan ketenangan dalam hidup anda.</Card.Text><br/>
                                        <Link to="/intervensimindfulness-user" >Lihat Intervensi</Link>
                                    </Card.Body>
                                </Col>
                                <br/>
                             </Col>
                        </Row>
                    </Container>                     
                               
                    
                    <Container className="my-5">
                        <Row className="justify-content-center">
                            <Col md={9} className="d-flex align-items-center justify-content-center">
                                <img src={ringan} alt="image" style={{ borderRadius:"50px", maxWidth: "25%", maxHeight: "100%" }} />
                            <Col/>
                                <Col md={8} >
                                    <Card.Body>
                                        <Card.Title  style={{ fontSize: "35px" }}>Stress Ringan</Card.Title>
                                        <Card.Text  style={{ fontSize: "20px" }}>Lakukan Stress Coping Strategies untuk mengatasi stress dan meningkatkan kesejahteraan mental Anda.</Card.Text><br/>
                                        <Link to="/intervensi-stresscoping-user">Lihat Intervensi</Link>
                                    </Card.Body>
                                </Col>
                                <br/>
                             </Col>
                        </Row>
                    </Container>  

                    <Container className="my-5">
                        <Row className="justify-content-center">
                            <Col md={9} className="d-flex align-items-center justify-content-center">
                                <img src={challenge} alt="image" style={{ borderRadius:"50px", maxWidth: "25%", maxHeight: "100%" }} />
                            <Col/>
                                <Col md={8} >
                                    <Card.Body>
                                        <Card.Title  style={{ fontSize: "35px" }}>Stress Sedang</Card.Title>
                                        <Card.Text  style={{ fontSize: "20px" }}>Lakukan 30 Days Writing Challenge strategi untuk mengatasi stress dan meningkatkan kesejahteraan mental Anda.</Card.Text><br/>
                                        <Link to="/intervensi30days-user">Lihat Intervensi</Link>
                                    </Card.Body>
                                </Col>
                                <br/>
                             </Col>
                        </Row>
                    </Container>  

                    <Container className="my-5">
                        <Row className="justify-content-center">
                            <Col md={9} className="d-flex align-items-center justify-content-center">
                                <img src={terapi4} alt="image" style={{ borderRadius:"50px", maxWidth: "25%", maxHeight: "100%" }} />
                                <Col/>
                                <Col md={8} >
                                    <Card.Body>
                                        <Card.Title style={{ fontSize: "35px" }}>Depresi Ringan</Card.Title>
                                        <Card.Text style={{ fontSize: "20px" }}>Lakukan Intervensi Activity Therapy untuk mengatasi depresi ringan serta dukungan yang Anda butuhkan.</Card.Text><br/>
                                        <Link to="/intervensiterapi-user">Lihat Intervensi</Link>
                                    </Card.Body>
                                </Col>
                                <br/>
                            </Col>
                        </Row>
                    </Container>
            <br></br><br></br><br></br>
            <Footer />
        </div>
    );
};

export default IntervensiUser;
