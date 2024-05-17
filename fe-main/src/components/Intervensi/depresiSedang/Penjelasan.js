import React from 'react';
import { Col, Button, Container } from 'react-bootstrap';
import { Link } from "react-router-dom/cjs/react-router-dom.min.js";
import Navbar from '../../landing/Navbar.js';
import Footer from '../../landing/Footer.js';

const Teknik54321 = () => {
return (
    <>
    <Navbar />
    <Container>
        <div className="container text-center">
            <h6 className="section-title mb-2 tfonts" style={{ borderColor:"#FFD2DD",color:"#25B7D3", fontWeight:"bold"}}><br />Intervensi Depresi Sedang<br /></h6>
            </div>

            <div className="container text-center">
                <br></br><br></br>
                <p style={{color:"black",  fontSize:"20px"}}>
                "Kembangkan dirimu di tingkat yang lebih tinggi dengan menggali lebih dalam informasi seputar depresi remaja untuk mencapai pikiran yang lebih positif. 
                Cari tips-tips intervensi depresi yang ada diwebsite ini sesuai dengan rutinitas hidupmu untuk mencapai stabilitas emosional dan kesejahteraan secara menyeluruh."                <br></br><br></br>

                
                </p>
        </div>
        <div className="container text-center">
            <h6 className="section-title mb-2 tfonts" style={{ borderColor:"#FFD2DD",color:"#25B7D3", fontWeight:"bold"}}><br />CBT (Cognitive Behavior Therapy)<br /></h6>
            </div>

            <div className="container text-left">
                <br></br><br></br>
                <p style={{color:"black",  fontSize:"20px"}}>

                CBT (Cognitive Behavior Therapy) adalah terapi yang sering digunakan untuk menangani kasus depresi. 
                Terapi ini mengkombinasikan cara berpikir dan berperilaku dengan berfokus pada tiga aspek yang saling berkaitan: pikiran, perasaan, dan perilaku. 
                Tujuan utama CBT adalah mengubah cara seseorang memandang suatu masalah (kognitif) untuk menghasilkan perubahan emosi dan perilaku yang positif.<br /><br/>
                CBT didasarkan pada pemahaman bahwa pikiran, emosi, dan tingkah laku saling mempengaruhi satu sama lain. 
                Misalnya, keyakinan atau persepsi seseorang tentang suatu situasi dapat mempengaruhi perasaannya dan perilakunya dalam menghadapi situasi tersebut. 
                Untuk itu, CBT menggabungkan pendekatan perilaku dan kognitif dalam penerapannya, menggunakan berbagai teknik intervensi untuk membantu individu mengubah pola pikir dan perilaku yang tidak membantu menjadi lebih adaptif dan sehat.<br/><br/>
                Dalam pendekatan perilaku, tindakan atau perilaku seseorang dianggap memiliki pengaruh langsung terhadap perasaan dan pikirannya. 
                Dengan demikian, intervensi CBT sering kali melibatkan latihan untuk mengubah perilaku tertentu yang pada gilirannya akan mempengaruhi pikiran dan perasaan menjadi lebih positif.<br/><br/>
                
                </p>
        </div>
        
        <br></br><br></br><br></br><br></br>
    </Container>
    
    <Container>
      <Col md={14} className="text-center">
          <Link to="/cbt">
            <Button variant="light" 
            style={{
            backgroundColor: "#25B7D3",
            borderRadius:"50px",
            color: "white",
            fontWeight: "bold",
            padding: '20px 35px', // Atur padding untuk mengatur ukuran tombol
            fontSize: '25px'}} >Yuk Ikuti Langkah-langkah nya!</Button>
          </Link>
        </Col>
        </Container>
        <br/><br/><br/>
        <Footer/>
        
      </>
    );
};
export default Teknik54321;
