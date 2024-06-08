import React from 'react';
import { Col, Button, Container, Card, Row } from 'react-bootstrap';
import Navbar from '../../landing/Navbar.js';
import Footer from '../../landing/Footer.js';
import breathing1 from '../../video/mindfulness-breathing1.mp4'; // Sesuaikan path dengan lokasi video Anda
import bodyscan1 from '../../video/mindfulness-bodyscan1.mp4'; // Sesuaikan path dengan lokasi video Anda
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MBSR = () => {
return (
    <>
    <Navbar />
    <Container>
  <div className="container text-center" style={{marginTop:"100px"}}>
    <h6 className="section-title mb-2 tfonts" style={{ color:"#EBBCBC", fontWeight:"bold"}}><br />Hello Welcome to Week 4 !<br />Yuk Kita Belajar Tentang Latihan Walking<br /></h6>
  </div>
  <Row className="justify-content-center">
    <Col md={4}>
      <Card className="about-us-card" style={{ backgroundColor: "#EBBCBC", marginTop:"50px", padding:"28px"}}>
        <Card.Body>
          <h5 style={{ fontSize: "20px", color:"white", fontWeight:"bold" }}>
            <FontAwesomeIcon icon={faInfoCircle} style={{ marginRight: "10px", textAlign:"left" }} />
            Latihan Mindful Breathing:
            <br></br>
          </h5>      
          <p style={{ fontSize: "18px", textAlign: "justify", }}>
            <br></br>
            - &nbsp;Cari posisi yang nyaman, bisa duduk atau berbaring.<br></br>
            - &nbsp;Tutup mata atau biarkan pandangan lembut ke bawah.<br></br>
            - &nbsp;Fokuskan perhatian pada sensasi napas. Rasakan udara masuk melalui hidung dan keluar melalui mulut atau hidung.<br></br>
            - &nbsp;Perhatikan perut yang naik turun saat bernapas.<br></br>
            - &nbsp;Pikiran akan mengembara, itu wajar. Lembut saja arahkan perhatian kembali ke napas saat Anda tersadar.<br/>
            - &nbsp;Lakukan selama 5-10 menit atau lebih lama jika nyaman.<br/>
          </p>
        </Card.Body>
      </Card>
    </Col>
    <Col md={4}>
      <Card className="about-us-card" style={{ backgroundColor: "#EBBCBC", marginTop:"50px"}}>
        <Card.Body>
          <h5 style={{ fontSize: "20px", color:"white", fontWeight:"bold" }}>
            <FontAwesomeIcon icon={faInfoCircle} style={{ marginRight: "10px", textAlign:"left" }} />
            Latihan Mindful Body Scan:
            <br></br>
          </h5>      
          <p style={{ fontSize: "18px", textAlign: "justify" }}>
            <br></br>
            - &nbsp;Posisi sama seperti mindful breathing.<br></br>
            - &nbsp;Tarik napas dalam dan embuskan perlahan.<br></br>
            - &nbsp;Mulailah fokuskan perhatian pada bagian atas kepala. Rasakan sensasi apapun yang ada, seperti kehangatan, kesemutan, atau relaksasi. Tidak perlu ada penilaian.<br></br>
            - &nbsp;Perlahan pindaikan perhatian ke seluruh tubuh, area demi area. Leher, bahu, lengan, dada, punggung, dan seterusnya hingga ke ujung jari kaki.<br></br>
            - &nbsp;Saat Anda menemukan area yang tegang, coba bayangkan napas mengalir ke sana dan melunakkan ketegangan tersebut.<br/>
            - &nbsp;Lanjutkan pemindaian hingga seluruh tubuh tercakup.<br/>
            - &nbsp;Setelah selesai, luangkan waktu sejenak untuk merasakan keseluruhan tubuh Anda.<br/>
          </p>
        </Card.Body>
      </Card>
    </Col>    
  </Row>
</Container>



        <section className="section before-content" style={{ backgroundColor: "#EBBCBC", marginTop: "60px", paddingTop: "100px", paddingBottom: "100px" }}>
        <Col md={16} className="d-flex align-items-center justify-content">
            <div className="container text-center">
            <h6 className="subtitle" style={{ fontSize: "40px", fontWeight:"bold", color:"white"}}>Latihan Mindful Breathing</h6> 
            </div>
        </Col>
        <br></br><br></br><br></br>
        <Col md={12} className="d-flex align-items-center justify-content">
        <div className="container text-center">

        <video src={breathing1} controls style={{ width: "600px", height: "auto", maxWidth: "100%", maxHeight: "100%", marginBottom:"60px" }} />            
        </div>
        </Col>

        </section>
        <section className="section before-content" style={{ backgroundColor: "white", color: "#141313", marginTop: "-10px", paddingTop: "100px", paddingBottom: "100px" }}>
        <Col md={16} className="d-flex align-items-center justify-content">
            <div className="container text-center">
            <h6 className="subtitle" style={{ fontSize: "40px", fontWeight:"bold", color:"#EBBCBC", marginBottom:"20px"}}>Latihan Mindful Scan</h6> 
            </div>
        </Col>
        <Col md={12} className="d-flex align-items-center justify-content">
        <div className="container text-center">

        <video src={bodyscan1} controls style={{ width: "600px", height: "auto", maxWidth: "100%", maxHeight: "100%", marginBottom:"10px" }} />     
        </div>
        </Col>

        </section>
        <Col md={16} className="d-flex align-items-center justify-content">
            <div className="container text-center">
                <Button variant="light" style={{width: "250px", height: "50px", backgroundColor:"#EBBCBC", borderColor:"#EBBCBC",color:"white", fontWeight:"bold", fontSize:"18px", borderRadius:"50px", marginBottom:"50px"}} href="/mindfulness-4" >Checklist Harian</Button>
            </div>
        </Col>
        <Footer/>
      </>
    );
};
export default MBSR;
