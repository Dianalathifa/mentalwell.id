import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom.min.js";
import Footer from "../landing/Footer.js";
import Navbar from "../landing/Navbar.js";
import detail1 from "../images/dass42-detail1.png"; // Import gambar
import detail2 from "../images/dass42-detail2.png"; // Import gambar
import DASS42 from "../images/dass42-tes.png"; // Import gambar
import cemas from "../images/dass42-cemas.jpg"; // Import gambar
import depresi from "../images/dass42-depresi.jpg"; // Import gambar
import stress from "../images/dass42-stress.jpg"; // Import gambar

const DASS42Detail = () => {
    const [kategoriTests, setKategoriTests] = useState([]);

    useEffect(() => {
        const fetchKategoriTests = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/kategori_test/dass42");
                const dass42Tests = response.data.filter(test => test.id_test >= 2 && test.id_test <= 4);
                setKategoriTests(dass42Tests);
            } catch (error) {
                console.error("Error fetching kategori tests:", error);
            }
        };

        fetchKategoriTests();
    }, []);

    return (
        <div>
            <Navbar />
            <br/><br/>
            <section id="psikolog-list" className="section before-content" style={{ backgroundColor: "#C4EAF4", color: "#141313", fontFamily: "Abril Fatface", marginTop: "-140px", paddingTop: "200px" }}>
                <Col md={12} className="d-flex align-items-center justify-content-center">
                    <div className="container text-left ">
                        <h6 className="section-title mb-2 tfonts" style={{marginLeft:"80px"}}>DASS42-Test</h6>
                        <h6 className="subtitle" style={{ fontSize: "28px", marginLeft:"80px" }}>
                            Depression, Anxiety, Stress Scale (DASS) 42 
                            <br/>adalah kuesioner psikologi yang memetakan tiga faktor psikologis, 
                            <br/>yakni depresi, kecemasan, dan stress. Kuesioner ini terdiri atas 42 
                            <br/>pertanyaan yang pada website ini nantinya akan terpecah menjadi 14 soal 
                            <br/>dengan kategori soal yang telah disesuaikan serta telah diuji validitas dan reliabilitasnya</h6> <br></br><br></br><br></br>
                    </div>
                    <img src={DASS42} alt="Logo" style={{ marginRight:"80px", width: "500px", height: "500px", maxWidth: "100%", maxHeight: "100%" }} /> {/* Panggil gambar dengan variabel */}
                </Col>
            </section>
            <br/>
            <br/>
            <Container className="my-5">
                <Row className="justify-content-center">
                    <Col md={4} className="d-flex align-items-center justify-content-center">
                        <img src={detail1} alt="" style={{ maxWidth: "100%", maxHeight: "100%" }} /> {/* Panggil gambar dengan variabel */}
                    </Col>
                    <Col md={8}>
                        <p style={{ fontSize: "25px" }}>
                            <br/>Penggunaan DASS42 dapat digunakan dalam berbagai konteks, 
                            <br/>seperti dalam penelitian ilmiah, penilaian kesehatan mental dalam 
                            <br/>lingkungan kerja, evaluasi kesehatan mental sebelum pelayanan medis tertentu, dan sebagainya.<br></br><br></br></p>
                    </Col>        
                </Row>
            </Container>
            <br/>
            <br/>
            <Container className="my-5">
                <Row className="justify-content-center">
                    <Col md={4} className="d-flex align-items-center justify-content-center">
                        <img src={detail2} alt="" style={{ maxWidth: "100%", maxHeight: "100%" }} /> {/* Panggil gambar dengan variabel */}
                    </Col>
                    <Col md={8}>
                        <p style={{ fontSize: "25px" }}>
                            <br/>DASS42 tidak dapat menggantikan diagnosis dari psikiater atau psikolog klinis, 
                            namun dapat digunakan sebagai alat bantu dalam menilai 
                            tingkat depresi, kecemasan, dan stres seseorang untuk mengarahkan 
                            <br/>tindakan lebih lanjut atau rujukan yang tepat.</p>
                    </Col>
                </Row>
            </Container>
            <Container className="my-5">
                <Col md={14}>
                    <p style={{ fontSize: "25px", textAlign: "justify" }}>
                        <br></br>Skala jawaban DASS42 meliputi skala 0 hingga 3 untuk setiap pertanyaan, dengan penjelasan sebagai berikut: 
                        <br></br><br></br>0:&nbsp;&nbsp;Tidak ada gejala
                        <br></br>1:&nbsp;&nbsp;Terkadang
                        <br></br>2:&nbsp;&nbsp;Sering
                        <br></br>3:&nbsp;&nbsp;Selalu
                        <br></br><br></br>Hasil akhir dari pengisian kuesioner DASS42 akan memberikan gambaran tentang tingkat depresi, kecemasan, dan stres yang dialami oleh responden.
                    </p>
                </Col>
            </Container>
            <Container className="my-6">
                <Row className="justify-content-center">
                    <Col md={14}>
                        <Card className="about-us-card" style={{ backgroundColor: "#FFD2DD"}}>
                            <Card.Body>
                                <h5 style={{ fontSize: "30px", color:"#25B7D3", fontWeight:"bold" }}>Petunjuk Tes :<br></br></h5>
                                <p style={{ fontSize: "25px" }}><br></br>1. Metode: diisi sendiri (rahasia).<br></br>
                                2. Jawablah semua pertanyaan sesuai dengan kondisi saat ini yang anda alami atau rasakan selama 7 hari terakhir.
                                <br></br>3. Setiap pertanyaan memiliki skala jawaban dari 0 hingga 3.
                                <br></br>4. Pilihlah jawaban yang paling sesuai dengan kondisi Anda dalam 7 hari terakhir.
                                <br></br>5. Setelah selesai menjawab semua pertanyaan, klik Lihat Hasil Tes untuk melihat hasilnya.
                                <br></br>Selamat Mengerjakan!
                                </p>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

            <section id="about" className="section before-content">
            <div className="container text-center">
            <div>
                <h2 className="section-title mb-2 tfonts">Kategori Test<br></br>DASS-42</h2>
            </div><br/><br/><br/>
            </div>
            </section>
            <Container>
                <Row>
                    <Col md={4}>
                        <Card>
                            <Card.Img variant="top" src={cemas} />
                            <Card.Body>
                                <Card.Title>Kecemasan</Card.Title>
                                <Card.Text>Test yang akan mendeteksi gangguan kecemasan</Card.Text>
                                <Link to="/dass42cemas-user">Mulai Tes</Link>
                            </Card.Body>
                        </Card><br/><br/><br/>
                    </Col>
                    <Col md={4}>
                        <Card>
                            <Card.Img variant="top" src={depresi} />
                            <Card.Body>
                                <Card.Title>Depresi</Card.Title>
                                <Card.Text>Test yang akan mendeteksi gangguan depresi</Card.Text>
                                <Link to="/dass42depresi-user">Mulai Tes</Link>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card>
                            <Card.Img variant="top" src={stress} />
                            <Card.Body>
                                <Card.Title>Stress</Card.Title>
                                <Card.Text>Test yang akan endeteksi gangguan stress</Card.Text>
                                <Link to="/dass42stress-user">Mulai Tes</Link>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>


            <br/><br/><br/>
            <Footer />
        </div>
    );
};

export default DASS42Detail;
