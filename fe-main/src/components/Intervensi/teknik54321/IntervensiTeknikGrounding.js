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
            <h6 className="section-title mb-2 tfonts" style={{ borderColor:"#FFD2DD",color:"#25B7D3", fontWeight:"bold"}}><br />Intervensi Cemas<br /></h6>
            </div>

            <div className="container text-center">
                <br></br><br></br>
                <p style={{color:"black",  fontSize:"20px"}}>
                "Naik level dirimu dengan mendalami informasi seputar kesehatan mental remaja untuk mendapatkan pikiran yang lebih cerah. Temukan tips-tips intervensi stres yang sesuai dengan gaya hidupmu untuk mencapai kestabilan emosional dan kesejahteraan secara menyeluruh."
                <br></br><br></br>

                
                </p>
        </div>
        <div className="container text-center">
            <h6 className="section-title mb-2 tfonts" style={{ borderColor:"#FFD2DD",color:"#25B7D3", fontWeight:"bold"}}><br />5-4-3-2-1 Method<br /></h6>
            </div>

            <div className="container text-left">
                <br></br><br></br>
                <p style={{color:"black",  fontSize:"20px"}}>

                Jika Anda kesulitan mengatasi gejala kecemasan Anda, Anda tidak sendirian. Kecemasan adalah salah satu masalah kesehatan mental yang paling umum saat ini. Orang-orang mengalami berbagai jenis kecemasan mulai dari yang ringan hingga yang sangat melemahkan.<br /><br/>
                Kecemasan dikaitkan dengan banyak keadaan emosi intens yang berbeda. Sulit untuk fokus atau merasa terkendali ketika Anda mengalami gelombang panik atau perasaan cemas yang luar biasa. Seringkali segala sesuatunya terasa kabur.<br/><br/>
                Kabar baiknya adalah ada banyak cara efektif untuk mengurangi gejala kecemasan. Salah satu teknik yang sangat efektif yang dapat Anda terapkan kapan saja, di mana saja, adalah grounding, yang menggunakan praktik sederhana untuk mengaktifkan indra Anda sedemikian rupa sehingga membantu melawan gejala kecemasan.<br/><br/>
                
                </p>
        </div>
        
        <br></br><br></br><br></br><br></br>
    </Container>
    
    <Container>
      <Col md={14} className="text-center">
          <Link to="/groundingdetail-user">
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
