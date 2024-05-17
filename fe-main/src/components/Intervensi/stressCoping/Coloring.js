import React from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import Navbar from '../../landing/Navbar.js';
import Footer from '../../landing/Footer.js';
import coloring from '../../images/stressCoping/creativity.png';
import colobynumber from '../../images/stressCoping/colobynumber.png';
import quickdraw from '../../images/stressCoping/quickdraw.png';
import onlinecoloring from '../../images/stressCoping/onlinecoloring.png';
import onlinesketchpad from '../../images/stressCoping/onlinesketchpad.png';


const JenisColoring = [
  { name: "Color By Number", link: "https://coloritbynumbers.com/online" },
  { name: "Quick Draw", link: "https://quickdraw.withgoogle.com/" },
  { name: "Online Coloring", link: "https://www.thecolor.com/" },
  { name: "Online Sketchpad", link: "https://sketchpad.app/en/" },
  // Add other activities with their corresponding links here
];

const GambarColoring = [colobynumber, quickdraw, onlinecoloring, onlinesketchpad];

const Coloring = () => {
  return (
    <>
      <Navbar />
      <section className="section before-content" style={{ backgroundColor: "#25B7D3", color: "#141313", marginTop: "-10px", paddingTop: "100px", paddingBottom: "-140px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "50%", left: 0, width: "100%", height: "100%", backgroundColor: "white", zIndex: 1 }}></div>
        <div style={{ position: "relative", zIndex: 2 }}>
          <Col md={16} className="d-flex align-items-center justify-content">
            <div className="container text-center">
              <h6 className="subtitle" style={{ fontSize: "40px", fontWeight: "bold", color: "white" }}>Coloring & Creativity</h6>
            </div>
          </Col>
          <br /><br /><br />
          <div className="container text-center">
            <img src={coloring} style={{ width: "500px", height: "auto", maxWidth: "100%", maxHeight: "100%" }} alt="kegiatan" />
          </div>
        </div>
      </section>

      <Container className="mt-5">
        <Col md={16} className="d-flex align-items-center justify-content">
          <div className="container text-center">
            <p style={{ fontSize: "19px", fontWeight: "bold", color: "#25B7D3" }}>
            "Beri diri Anda waktu istirahat untuk meredakan stres dengan berkegiatan Coloring & Creativity! 
            Ambillah waktu sejenak untuk mengeksplorasi kreativitas Anda dengan mewarnai. 
            Manfaatkan waktu tersebut dan biarkan diri Anda terfokus sepenuhnya pada aktivitas ini. 
            Anda akan merasakan ketenangan dan kebahagiaan yang membawa kesegaran baru. 
            Rasakan bagaimana aktivitas ini menyegarkan pikiran Anda dan memberikan semangat baru untuk melanjutkan hari Anda."            </p>
          </div>
        </Col>
        <br /><br /><br />
      </Container>

      <Container className="mt-5">
        <Row xs={1} md={3} className="g-4 justify-content-center">
          {JenisColoring.map((jenis, index) => (
            <Card key={index} style={{ borderRadius: "20px", fontWeight: "bold", fontSize: "20px", height: "400px", width: "300px", backgroundColor: "#25B7D329", color: "#25B7D3", margin: "20px" }}>
              <a href={jenis.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "#25B7D3" }}>
                <Card.Img variant="top" src={GambarColoring[index]} style={{ height: "320px", objectFit: "cover", borderRadius: "20px 20px 0 0" }} />
                <Card.Body>
                  <Card.Text style={{ textAlign: "center" }}>{jenis.name}</Card.Text>
                </Card.Body>
              </a>
            </Card>
          ))}
        </Row>
      </Container>
      <br /><br /><br /><br />
      <Footer />
    </>
  );
};

export default Coloring;
