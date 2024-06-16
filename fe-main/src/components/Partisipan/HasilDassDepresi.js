import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Button, Table, Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Navbar from "../landing/Navbar";
import Footer from "../landing/Footer";
import "../style/Intervensi.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import depresiRingan from "../images/intervensi/depresiringan1.png";
import depresiSedang from "../images/intervensi/depresisedang1.png";
import normalImage from '../images/depresi/d-normal.jpeg';
import ringanImage from '../images/depresi/d-ringan.jpg';
import sedangImage from '../images/depresi/d-sedang.jpg';
import beratImage from '../images/depresi/d-parah.jpg';
import sangatParahImage from '../images/depresi/d-sangat_parah.jpg';

const HasilDassDepresi = () => {
  const [hasilKlasifikasi, setHasilKlasifikasi] = useState(null);
  const [error, setError] = useState(null);
  const [psikologs, setPsikologs] = useState([]);
  const [dailyInsights, setDailyInsights] = useState([]);
  const history = useHistory();

  useEffect(() => {
      const partisipanId = localStorage.getItem("partisipan_id");

    const fetchHasilKlasifikasi = async () => {
      try {
        const partisipanId = localStorage.getItem("partisipan_id");

        const response = await axios.get(
          `http://localhost:8080/api/dass-depresi/${partisipanId}`
        );
        setHasilKlasifikasi(response.data);
        if (response.data.klasifikasi === "Depresi Parah") {
          fetchPsikologParah();
        } else if (response.data.klasifikasi === "Depresi Sangat Parah") {
          fetchPsikologSangatParah();
        }
      } catch (error) {
        setError("Gagal mengambil hasil klasifikasi");
      }
    };
    

    const fetchPsikologParah = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/psikolog"
        );
        setPsikologs(response.data);
      } catch (error) {
        console.error("Error fetching psikologs for Depresi Parah:", error);
      }
    };

    const fetchPsikologSangatParah = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/psikolog"
        );
        setPsikologs(response.data);
      } catch (error) {
        console.error(
          "Error fetching psikologs for Depresi Sangat Parah:",
          error
        );
      }
    };

    const fetchDailyInsights = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/daily_insight");
        setDailyInsights(response.data);
      } catch (error) {
        console.error("Error fetching daily insights:", error);
      }
    };

    fetchHasilKlasifikasi();
    fetchDailyInsights();
  }, []);


  const handleNavigation = (path) => {
    history.push(path);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };
  
  const renderDailyInsights = () => (
    <Row className="justify-content-center" style={{marginBottom:"50px"}}>
      {dailyInsights.map((daily_insight) => (
        <Col key={daily_insight.id} md={4} className="my-3">
          <Card className="daily-insight-card">
            <Card.Img
              variant="top"
              src={`http://localhost:8080/images/daily_insight/${daily_insight.image}`}
              style={{ objectFit: "cover", height: "200px" }}
            />
            <Card.Body className="daily-insight-card-body">
              <Card.Title className="daily-insight-card-title">
                {daily_insight.judul_content}
              </Card.Title>
              <Card.Text className="daily-insight-card-content">
                {daily_insight.deskripsi.length > 100
                  ? daily_insight.deskripsi.substring(0, 100) + "..."
                  : daily_insight.deskripsi}
              </Card.Text>
              <div style={{ marginTop: "auto" }}>
                <Button variant="link" onClick={() => handleNavigation(`/dailyinsight-detail-user/${daily_insight.id}`)}>
                  Baca Selengkapnya
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );

  // Fungsi untuk mengambil nama klasifikasi dan warna yang sesuai
  const getClassNameAndColor = () => {
    if (hasilKlasifikasi) {
      switch (hasilKlasifikasi.klasifikasi) {
        case 'Depresi Normal':
          return { className: 'Depresi Normal', color: '#FFBF78', image: normalImage }; // oren muda
        case 'Depresi Ringan':
          return { className: 'Depresi Ringan', color: '#FFE8C8' ,  image: ringanImage }; // hijau muda
        case 'Depresi Sedang':
          return { className: 'Depresi Sedang', color: '#FB6D48', image: sedangImage }; // pink muda
        case 'Depresi Parah':
          return { className: 'Depresi Parah', color: '#A7E6FF', image: beratImage }; // merah muda
        case 'Depresi Sangat Parah':
          return { className: 'Depresi Sangat Parah', color: '#D04848', image: sangatParahImage  }; // merah muda
        default:
          return { className: '', color: '#ffffff' , image : null};
      }
    }
    return { className: '', color: '#ffffff', image : null };
  };

  const points = hasilKlasifikasi ? hasilKlasifikasi.points : '';
  const klasifikasi = hasilKlasifikasi ? hasilKlasifikasi.klasifikasi : '';
  const { className, color, image } = getClassNameAndColor();

  
  return (
    <>
      <Navbar />
      <Container className="mt-5" style={{ marginBottom: "50px", paddingTop: "100px" }}>
        <Container className="text-center mt-4">
      <h6 className="section-title mb-2 tfonts-2">
        <br />
        Hasil Klasifikasi Tes DASS Depresi
        <br />
      </h6>
      <Row className="justify-content-center mt-4">
        <Col md={8}>
          <Card style={{ backgroundColor: color }}>
            <Card.Body>
              <Row>
                <Col md={6} className="text-left">
                  {/* Gambar sesuai klasifikasi */}
                  {image && (
                    <img
                      src={image} // Path gambar diambil dari import
                      alt={klasifikasi}
                      style={{ maxWidth: '100%', maxHeight: '100%' }}
                    />
                  )}
                </Col>
                <Col md={6}>
                <br></br><br></br><br></br><br></br>
                  <Card style={{ backgroundColor: 'white' }}>
                    <Card.Body>
                    <p style={{ fontWeight: 'bold', fontSize: '20px' }}>Total Points Kamu </p>
                      <Container style={{ backgroundColor: 'white', color: 'white', textAlign: 'center', padding: '10px' , fontWeight: 'bold', fontSize: '25px'}}>
                        <strong>{points}</strong>
                      </Container>
                      <Container style={{ backgroundColor: color , color: 'black', textAlign: 'center', padding: '10px' }}>
                        <p style={{ fontWeight: 'bold', fontSize: '20px' }}> Klasifikasi: {klasifikasi}</p>
                      </Container>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              {error && (
                <Row className="mt-4">
                  <Col md={12}>
                    <p>{error}</p>
                  </Col>
                </Row>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>

        {hasilKlasifikasi && (
          <Container className="mt-3 text-center d-flex justify-content-center">
            <Col md={10}>
              <div className="text-center mt-3">
                <h6 className="tfonts-2" style={{ marginBottom: "20px" }}>Rekomendasi:</h6>
                {hasilKlasifikasi && hasilKlasifikasi.klasifikasi === "Depresi Normal" && (
                <Container className="mt-3 text-center d-flex justify-content-center" style={{marginBottom:"10px"}}>
                  <Col md={10} >
                    <Alert variant="white" style={{ fontSize:"18px"}}>
                    <h4 style={{fontWeight:"bold"}}>WAH! Hasil Tes Dass Depresi kamu menunjukkan hasil yang normal.</h4>
                      <p style={{marginBottom:"20px"}}>Cobalah buang hal negatif yang menghantui pikiranmu. Tetap jaga kesehatan mentalmu dan yuk lanjut ke artikel harian untuk lebih menjaga kesehatan mentalmu!</p><br/>
                      {renderDailyInsights()}
                      <Button variant="light"
                        className="custom-button"
                        style={{
                          borderRadius: "50px",
                          fontWeight: "bold",
                          padding: '15px 25px',
                          fontSize: '17px'}}
                        onClick={() => handleNavigation('/dailyinsight-user')}>
                        Temukan Lebih Banyak Artikel Harian
                      </Button>
                    </Alert>
                  </Col>
                </Container>
              )}
                {hasilKlasifikasi.klasifikasi === "Depresi Ringan" && (
                    <>
                      Tetap tenang dan jangan panik. Apapun itu hasilnya, MentalWell hadir untuk membantumu. 
                      Yuk ikuti langkah berikutnya yaitu intervensi. Jika perlu,{" "}
                      <Link to="/intervensi-stresscoping-user">
                        konsultasikan dengan psikolog atau terapis
                      </Link>{" "}
                      untuk bantuan tambahan.
                      <Row className="mt-3 justify-content-center">
                        <Col xs={6} md={3} lg={3} style={{marginBottom:"20px"}}>
                          <Card className="h-100 card-hover" style={{ height: '350px', margin: '10px' }}>
                            <Card.Body className="d-flex align-items-center justify-content-center flex-column">
                              <img src={depresiRingan} alt="derepsiRingan" style={{ objectFit: "cover", width: "100%", height: "200px", borderRadius:"5px" }} />
                              <div className="mt-3">
                                <Card.Title style={{ fontSize: "18px" }}>Intervensi Depresi Ringan</Card.Title>
                                <Card.Text style={{ fontSize: "12px" }}>Teknik pernapasan dan relaksasi untuk mengatasi depresi ringan dan temukan ketenangan dalam hidup.</Card.Text>
                                <Button variant="light" className="custom-button" style={{backgroundColor:"#7F91D8"}} href="/intervensiterapi-user">Lihat Selengkapnya</Button>
                              </div>
                            </Card.Body>
                          </Card>
                        </Col>
                      </Row>
                    </>
                  )}
                {hasilKlasifikasi.klasifikasi === "Depresi Sedang" && (
                  <>
                    Tetap tenang dan jangan panik. Apapun itu hasilnya, MentalWell hadir untuk membantumu. 
                      Yuk ikuti langkah berikutnya yaitu intervensi. Jika perlu,{" "}
                      <Link to="/intervensi-stresscoping-user">
                        konsultasikan dengan psikolog atau terapis
                      </Link>{" "}
                      untuk bantuan tambahan.
                    <Row className="mt-3 text-center d-flex justify-content-center">
                      <Col xs={6} md={3} lg={3} style={{marginBottom:"20px"}}>
                        <Card className="h-100 card-hover" style={{ marginLeft: '10px', height: '250px' }}>
                          <Card.Body className="d-flex align-items-center justify-content-center flex-column">
                            <img src={depresiSedang} alt="depresiSedang" style={{ objectFit: "cover", width: "100%", height: "200px" }} />
                            <div className="mt-3">
                              <Card.Title style={{ fontSize: "18px" }}>Depresi Sedang</Card.Title>
                              <Card.Text style={{ fontSize: "12px" }}>Buatmu yang sedang merasa depresi dan harimu cukup menguras energi dan sedang membutuhkan bantuan untuk pulih kembali.</Card.Text>
                              <Button variant="light" className="custom-button" style={{ backgroundColor: "#7F91D8"}} href="/penjelasan-cbt">Lihat Intervensi</Button>
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>
                  </>
                )}
                {hasilKlasifikasi &&
                  (hasilKlasifikasi.klasifikasi === "Depresi Parah" ||
                    hasilKlasifikasi.klasifikasi === "Depresi Sangat Parah") && (
                  <Container className="mt-3">
                    <Row className="justify-content-center">
                      <Col md={10}>
                        <h1 className="subtitle">Oh Tidak! Kamu memiliki kondisi depresi yang sudah parah. Berikut beberapa psikolog rekomendasi kami yang dapat membantumu menghilangkan depresi yang kamu alami.</h1>
                        <Row>
                          {psikologs.map((psikolog) => (
                            <Col key={psikolog.id_psikolog} xs={12} sm={6} md={4} className="mb-4">
                              <Card className="h-100">
                                <Card.Img variant="top" src={`http://localhost:8080/images/psikolog/${psikolog.image_psikolog}`} alt="Psikolog Image" style={{ objectFit: "cover", height: "200px" }} />
                                <Card.Body>
                                  <Card.Title>{psikolog.nama_psikolog}</Card.Title>
                                  <Card.Text>
                                    Lokasi: {psikolog.lokasi_psikolog}<br />
                                    Telephone: {psikolog.telephone_psikolog}
                                  </Card.Text>
                                  <Button variant="light" className="custom-button" href={psikolog.url_psikolog}>Lihat Profil</Button>
                                </Card.Body>
                              </Card>
                            </Col>
                          ))}
                        </Row>
                      </Col>
                    </Row>
                  </Container>
                )}
              </div>
            </Col>
          </Container>
        )}
        <Container>
              <Row className="justify-content-center">
                <Col md={10}>
                  <Card className="about-us-card" style={{ backgroundColor: "#FFD2DD" }}>
                    <Card.Body>
                      <h5 style={{ fontSize: "18px", color: "red", fontWeight: "bold" }}>
                        <FontAwesomeIcon icon={faExclamationTriangle} /> Disclaimer
                      </h5>
                      <p style={{ fontSize: "16px" }}>
                        <br /> Psikotes ini bukan milik atau buatan penulis sendiri, namun berdasarkan referensi yang biasa digunakan di praktek klinis dan sudah divalidasi.
                        Hasil tes ini sangat bersifat objektif, untuk diagnosis diperlukan langsung dengan psikiater.
                      </p><br />
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Container>
      </Container>
      <Footer />
    </>
  );
};

export default HasilDassDepresi;
