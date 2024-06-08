import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button, CardImg } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileAlt, faSun, faUserMd } from "@fortawesome/free-solid-svg-icons";
import mentalwelltes from "./images/mw-tes.png";
import daily from "./images/d-insight.png";
import psikolist from "./images/psikolog-list.png";
import illustrasi from "./images/intervensi/dokter.jpg";
import tes from "./images/tes.png";
import dailyinsight from "./images/dailyinsight.png";
import psikolog1 from "./images/psikolog1.png";
import Footer from "./landing/Footer.js";
import Navbar from "./landing/Navbar.js";
import doctorConsulting from "./images/konsultasii.png"; // Ensure this path is correct
import "./style/Home.css";

const Home = () => {
  const [psikologs, setPsikologs] = useState([]);

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
      <section
        id="psikolog-list"
        className="section before-content"
        style={{ backgroundColor: "white", color: "#141313", padding: "50px 0", textAlign: "center" }} // Ubah warna background dan tambahkan gaya text-align untuk rapihkan tampilan
      >
        <Col md={16} className="d-flex align-items-center justify-content">
          <div className="container text-center"> {/* Ubah teks menjadi text-center untuk memusatkan */}
            <h1 className="section-title mb-4 tfonts" style={{ fontSize: "36px", fontWeight: "bold", color: "#333" }}> {/* Ubah ukuran dan ketebalan font */}
              <span style={{ color: "#FEA503" }}>Mental Well</span> Platform
            </h1>
            <h6 className="subtitle-home" style={{ fontSize: "19px", lineHeight: "1.6", maxWidth: "800px", margin: "auto" }}> {/* Tambahkan lebar maksimum dan margin otomatis */}
              Platform kesehatan mental sebagai solusi inovatif meningkatkan kesehatan mental mahasiswa melalui test dan pemahaman lebih dalam tentang kesejahteraan mental.
            </h6>
            <Button
              variant="light"
              style={{
                fontSize: "16px",
                marginTop: "20px",
                borderRadius: "50px",
                padding: "16px 30px",
                backgroundColor: "#25B7D3",
                borderColor: "#25B7D3", // Ubah warna border agar sesuai dengan background
                fontWeight: "bold",
                color: "white",
                boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.15)",
              }}
              href="/mentalwelltest-user"
            >
              Tes Sekarang!
            </Button>
          </div>
          <img
            src={illustrasi}
            alt="Logo"
            style={{ width: "800px", height: "auto", maxWidth: "100%", maxHeight: "100%", marginLeft: "50px" }} // Sesuaikan margin kiri
          />
        </Col>
      </section>


      {/* Doctor Consulting Section */}
      <Container className="my-5">
        <Row className="justify-content-center">
          <Col md={4} className="d-flex align-items-center justify-content-center">
            <img src={doctorConsulting} alt="Doctor Consulting" style={{ maxWidth: "100%", maxHeight: "100%" }} />
          </Col>
          <Col md={7}>
            <h5 style={{ fontSize: "20px", fontWeight: "bold" }}>
              <br />Tes Skrining<br />
            </h5>
            <p style={{ fontSize: "18px" }}>
              <br />Ayo lakukan tes skrining agar kamu dapat mengetahui kondisi mental yang kamu alami sedang dalam keadaan baik ataupun dalam keadaan yang kurang baik!<br /><br />
            </p>
            <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
              <FontAwesomeIcon icon={faFileAlt} size="3x" style={{ color: "#40E0D0", marginRight: "26px" }} />
              <div>
                <h6 style={{ fontWeight: "bold" }}>Lakukan Tes Skrining</h6>
                <p>Kamu akan diarahkan ke halaman tes skrining terlebih dahulu</p>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
              <FontAwesomeIcon icon={faSun} size="3x" style={{ color: "#40E0D0", marginRight: "15px" }} />
              <div>
                <h6 style={{ fontWeight: "bold" }}>Lihat Hasil Skrining</h6>
                <p>Lihat hasil skrining untuk menentukan langkah selanjutnya</p>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <FontAwesomeIcon icon={faUserMd} size="3x" style={{ color: "#40E0D0", marginRight: "22px" }} />
              <div>
                <h6 style={{ fontWeight: "bold" }}>Dapatkan Solusi</h6>
                <p>Hasil tes yang kamu dapatkan akan memunculkan rekomendasi sesuai kondisi yang sedang kamu alami. Ikuti solusi yang diberikan!</p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>


      <section id="about">
        <div className="container text-center" style={{ marginTop: "70px", marginBottom: "70px" }}>
          <div>
            <h6 className="section-title mb-2 tfonts-2">Layanan Mental Well</h6>
          </div>
          <br />
          <br />
          <Row className="text-center align-items-center">
            <Col>
              <img src={tes} alt="MentalWell Test" className="mb-6 small-img" />
              <Card.Title>MentalWell Test</Card.Title>
            </Col>
            <Col>
              <img src={dailyinsight} alt="Daily Insight" className="mb-6 small-img" />
              <Card.Title>Daily Insight</Card.Title>
            </Col>
            <Col>
              <img src={psikolog1} alt="Psikolog List" className="mb-6 small-img" />
              <Card.Title>Psikolog List</Card.Title>
            </Col>
          </Row>
        </div>
      </section>


      {/* LAYANAN 1 */}

      <Container className="my-5">
        <Row className="justify-content-center">
          <Col md={3} className="d-flex align-items-center justify-content-center">
            <img src={mentalwelltes} alt="Image" style={{ maxWidth: "100%", maxHeight: "100%" }} /> {/* Panggil gambar dengan variabel */}
          </Col>
          <Col md={7}>
            <h5 style={{ fontSize: "20px", fontWeight: "bold" }}>
              <br />Mental Well Test<br />
            </h5>
            <p style={{ fontSize: "18px" }}>
              <br />Mental Health Test merupakan tes berupa skala psikologi.
              <br />
              Skala psikologi sendiri adalah instrumen pengukuran untuk
              mengidentifikasi konstruk psikologis tertentu dalam diri seseorang.
              Hasil tes kurang lebih dapat digunakan sebagai screening awal kondisi psikologis individu,
              tetapi bukan sebagai diagnosis.
              <br />
              <br />
            </p>
          </Col>
        </Row>
      </Container>

      {/* LAYANAN 2 */}

      <Container className="my-5">
        <Row className="justify-content-center">
          <Col md={3} className="d-flex align-items-center justify-content-center">
            <img src={daily} alt="Image" style={{ maxWidth: "100%", maxHeight: "100%" }} /> {/* Panggil gambar dengan variabel */}
          </Col>
          <Col md={7}>
            <h5 style={{ fontSize: "20px", fontWeight: "bold" }}>
              <br />Daily Insight<br />
            </h5>
            <p style={{ fontSize: "18px" }}>
              <br />Daily Insight merupakan fitur yang dirancang untuk memberikan pengguna akses harian konten bermutu yang mendukung peningkatan kesehatan mental. Fitur ini menyediakan artikel, materi, dan panduan yang membahas berbagai aspek kesehatan mental, memberikan wawasan, dan memberikan dukungan untuk meningkatkan diri.
            </p>
          </Col>
        </Row>
      </Container>

      {/* LAYANAN 3 */}

      <Container className="my-5" >
        <Row className="justify-content-center" style={{ marginTop: "70px" }}>
          <Col md={3} className="d-flex align-items-center justify-content-center">
            <img src={psikolist} alt="Image" style={{ maxWidth: "100%", maxHeight: "100%" }} /> {/* Panggil gambar dengan variabel */}
          </Col>
          <Col md={7}>
            <h5 style={{ fontSize: "20px", fontWeight: "bold" }}>
              <br />Psikolog List<br />
            </h5>
            <p style={{ fontSize: "18px" }}>
              <br />Psikolog List merupakan bentuk layanan yang berupa informasi psikologi ahli yakni berisi terkait nama, lokasi dan foto dari profile psikolog. Layanan ini sebagai rekomendasi rujukan bagi penderita yang butuh penanganan oleh ahli.
            </p>
          </Col>
        </Row>
      </Container>
      <br />
      <br />


      {/* Psikolog Recommendations Section */}
      <Container className="my-5" style={{paddingBottom:"200px"}}>
  <h3 className="text-center mb-4 tfonts-2">Recommended Psychologists</h3>
  <Row className="justify-content-center">
    {psikologs.map((psikolog) => (
      <Col key={psikolog.id_psikolog} md={4} className="mb-4 d-flex align-items-stretch" style={{marginTop:"100px" }}>
        <Card style={{ padding: "20px", maxWidth: "400px", height: "120%" }}>
          <Card.Img
            src={`http://localhost:8080/images/psikolog/${psikolog.image_psikolog}`}
            alt="Psikolog Image"
            style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "10px" }} 
          />
          <Card.Body className="text-center">
            <Card.Title >{psikolog.nama_psikolog}</Card.Title>
            <p style={{ fontSize: "0.9375rem", lineHeight: "1.5" }}>Lokasi: {psikolog.lokasi_psikolog}</p>
            <p style={{ fontSize: "0.9375rem", lineHeight: "1.5", fontWeight: "bold" }}>Telephone: {psikolog.telephone_psikolog}</p>
            <div style={{ marginTop: "20px" }}>
              <Button variant="light" style={{ backgroundColor: "#25B7D3", borderColor: "#25B7D3", color: "white", fontWeight: "bold", width: "100%", marginBottom: "15px" }}>Lihat Profil</Button>
            </div>
          </Card.Body>
        </Card>
      </Col>
    ))}
  </Row>
</Container>


      <Footer />
    </>
  );
};

export default Home;
