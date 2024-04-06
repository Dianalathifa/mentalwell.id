import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom.min.js";
import Footer from "../landing/Footer.js";
import Navbar from "../landing/Navbar.js";
import detail1 from "../images/srq-detail1.png"; // Import gambar
import detail2 from "../images/srq-detail2.png"; // Import gambar
import SRQ from "../images/srq-tes.png"; // Import gambar

const AboutUs = () => {

  return (
    <div>
      <Navbar />
      <section id="psikolog-list" className="section before-content" style={{ backgroundColor: "#C4EAF4", color: "#141313", fontFamily: "Abril Fatface", marginTop: "-140px", paddingTop: "200px" }}>
      <Col md={12} className="d-flex align-items-center justify-content-center">
        <div className="container text-left ">
          <h6 className="section-title mb-2 tfonts">SRQ-Test</h6>
          <h6 className="subtitle" style={{ fontSize: "28px" }}>Self-Reporting Questionnaire (SRQ) 20 adalah kuisioner yang dikembangkan<br></br>
          oleh WHO untuk melakukan skrining adanya masalah kesehatan jiwa di<br></br>
          masyarakat. Kuisioner SRQ ini valid dan reliabel digunakan sebagai alat ukur
          <br></br>adanya masalah kesehatan mental yang dialami seseorang</h6> <br></br><br></br><br></br>
        </div>
        <img src={SRQ} alt="Logo" style={{ width: "500px", height: "500px", maxWidth: "100%", maxHeight: "100%" }} /> {/* Panggil gambar dengan variabel */}
      </Col>
      </section>
      <hr></hr>
      <hr></hr>
      <Container className="my-5">
        <Row className="justify-content-center">
        <Col md={4} className="d-flex align-items-center justify-content-center">
            <img src={detail1} alt="Image" style={{ maxWidth: "100%", maxHeight: "100%" }} /> {/* Panggil gambar dengan variabel */}
          </Col>
          <Col md={8}>
                <p style={{ fontSize: "25px" }}><br></br>Beberapa contoh penerapan penggunaan kuisioner ini adalah untuk mengetahui 
                adanya kesehatan mental pekerja di suatu perusahaan, kesehatan mental bagi yang mau menjalani naik haji, 
                kesehatan mental sebelum melamar pekerjaan, di Lapas Narkotika, kesehatan mental anak sekolahan, penelitian dll.<br></br><br></br></p>
          </Col>        
        </Row>
      </Container>
      <hr></hr>
      <hr></hr>
      <Container className="my-5">
        <Row className="justify-content-center">
        <Col md={4} className="d-flex align-items-center justify-content-center">
            <img src={detail2} alt="Image" style={{ maxWidth: "100%", maxHeight: "100%" }} /> {/* Panggil gambar dengan variabel */}
          </Col>
          <Col md={8}>
                <p style={{ fontSize: "25px" }}><br></br>Alat ukur ini tidak dapat menggantikan diagnosis dari psikiater atau psikolog klinis, 
                akan tetapi dapat dipakai acuan atau pertimbangan oleh petugas yang bertugas pada ranah kesehatan mental 
                untuk melakukan deteksi awal dan dasar rujukan kepada petugas yang profesinal seperti psikiater atau psikolog klinis.</p>
          </Col>
        </Row>
      </Container>
      <Container className="my-5">
            <Col md={14}>
            <p style={{ fontSize: "25px", textAlign: "justify" }}>
                <br></br>Kuisioner ini terdapat 20 pertanyaan yang mengukur 5 domain utama 
                yaitu Faktor Energi, Faktor Kognitif, Faktor Depresi, Faktor Fisiologis, Faktor Kecemasan, dengan penjelasan sebagai berikut: 
                <br></br><br></br>1. Faktor Energi : mengukur level energi seseorang yang sering ditandai dengan pusing, kesulitan dalam menikmati/menjalani hidup, merasa lelah. 
                <br></br>2. Faktor Kognitif : mengukur level kognitif seseorang yang sering ditandai dengan penurunan kualitas kerja, kesulitan dalam memutuskan sesuatu. 
                <br></br>3. Faktor Depresi : mengukur level depresi seseorang yang sering ditandai dengan tidak berguna, tidak senang, bahkan bunuh diri.
                <br></br>4. Faktor Fisiologis : mengukur level fisiologis seseorang yang sering ditandai adanya gangguan percernaan. 
                <br></br>5. Faktor Kecemasan : mengukur level kecemasan seseorang yang sering ditandai dengan tegang, takut, tangan gemetar. 
                <br></br><br></br>Hasil uji reabilitas kuisioner ini adalah dapat dipercaya, dengan hasil yang sama telah dilakukan pada berbagai penelitian. Sensitifitas SRQ-20 adalah 88% dan spesifitasnya adalah 81%. Hasil test ini dapat mengukur adanya gangguan mental secara umum seperti depresi dan kecemasan dengan menggunakan 5 faktor domain pertanyaan yang dapat digunakan untuk memberikan hasil yang lebih spesifik yang dapat digunakan oleh masyarakat luas. SRQ ini kemudian ditambahkan 9 pertanyaan untuk dapat digunakan sebagai deteksi adanya gangguan NAPZA, Psikosis dan PTSD sehingga totalnya menjadi 29 pertanyaan untuk mendapatkan hasil skrining gangguan mental yang lebih lengkap.
            </p>
            </Col>
        </Container>

      
      <Container className="my-6">
        <Row className="justify-content-center">
          <Col md={14}>
            <Card className="about-us-card" style={{ backgroundColor: "#FFD2DD"}}>
              <Card.Body>
              <h5  style={{ fontSize: "30px", color:"#25B7D3", fontWeight:"bold" }}>Petunjuk Tes :<br></br></h5>
                <p style={{ fontSize: "25px" }}><br></br>1. Metode: diisi sendiri (rahasia).<br></br>
                2. Jawablah semua pertanyaan sesuai dengan kondisi saat ini yang anda alami atau rasakan selama 30 hari terakhir.
                <br></br>3. Setiap jawaban yang dijawab akan mendapatkan skor.
                <br></br>4. Semakin sesuai yang anda alami maka hasil tes ini akan semakin akurat dan benar.
                <br></br>5. Pastikan semua pertanyaan sudah terjawab, dan jika sudah semua terjawab baru kemudian klik Lihat Hasil Test untuk memperoleh hasil test.
                <br></br>Selamat Mengerjakan!
                </p>
              </Card.Body>
            </Card>
          </Col>
          
        </Row>
      </Container>
      <Container>
      
      <Col md={14} className="text-center">
          <Link to="/srqtest-user">
            <Button variant="light" style={{ backgroundColor: "#25B7D3", borderColor: "#25B7D3", color: "white", fontWeight: "bold" }} >Mulai Tes SRQ</Button>
          </Link>
        </Col>
        </Container>
        <hr></hr>
      <Footer />
    </div>
  );
};

export default AboutUs;
