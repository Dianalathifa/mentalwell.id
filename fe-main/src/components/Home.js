import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileAlt, faSun, faUserMd } from "@fortawesome/free-solid-svg-icons";
import Footer from "./landing/Footer.js";
import Navbar from "./landing/Navbar.js";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import mentalwelltes from "./images/mw-tes.png";
import daily from "./images/d-insight.png";
import psikolist from "./images/psikolog-list.png";
import illustrasi from "./images/background.png";
import intervensi from "./images/intervention.png";
import doctorConsulting from "./images/konsultasii.png";
import { FaArrowRight } from 'react-icons/fa';
import "./style/Home.css";

const Home = () => {
  const [psikologs, setPsikologs] = useState([]);
  const [cemasHistory, setCemasHistory] = useState(null);
  const [depresiHistory, setDepresiHistory] = useState(null);
  const [stressHistory, setStressHistory] = useState(null);
  const [suicideHistory, setSuicideHistory] = useState(null);
  const [postTestResult, setPostTestResult] = useState(null);
  const [method54321, setMethod54321] = useState(null);
  const [mindfulness, setMindfulness] = useState(null);
  const [coping, setCoping] = useState(null);
  const [writing, setWriting] = useState(null);
  const [jadwal, setJadwal] = useState(null);
  const [cbt, setCBT] = useState(null);

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


  useEffect(() => {
    const fetchCemasHistory = async () => {
      try {
        const partisipanId = localStorage.getItem('partisipan_id');
        const response = await axios.get(`http://localhost:8080/api/dass-cemas/${partisipanId}`);
        setCemasHistory(response.data);
      } catch (error) {
        console.error('Gagal mengambil riwayat tes:', error);
      }
    };

    fetchCemasHistory();
  }, []);

  useEffect(() => {
    const fetchDepresiHistory = async () => {
      try {
        const partisipanId = localStorage.getItem('partisipan_id');
        const response = await axios.get(`http://localhost:8080/api/dass-depresi/${partisipanId}`);
        setDepresiHistory(response.data);
      } catch (error) {
        console.error('Gagal mengambil riwayat tes:', error);
      }
    };

    fetchDepresiHistory();
  }, []);

  useEffect(() => {
    const fetchStressHistory = async () => {
      try {
        const partisipanId = localStorage.getItem('partisipan_id');
        const response = await axios.get(`http://localhost:8080/api/dass-stress/${partisipanId}`);
        setStressHistory(response.data);
      } catch (error) {
        console.error('Gagal mengambil riwayat tes:', error);
      }
    };

    fetchStressHistory();
  }, []);

  useEffect(() => {
    const fetchSuicideHistory = async () => {
      try {
        const partisipanId = localStorage.getItem('partisipan_id');
        const response = await axios.get(`http://localhost:8080/api/suicide/${partisipanId}`);
        setSuicideHistory(response.data);
      } catch (error) {
        console.error('Gagal mengambil riwayat tes:', error);
      }
    };

    fetchSuicideHistory();
  }, []);

  useEffect(() => {
    const fetchPostTestResult = async () => {
      try {
        const partisipanId = localStorage.getItem('partisipan_id');
        const response = await axios.get(`http://localhost:8080/hasil-prediksi/partisipan/${partisipanId}`);
        setPostTestResult(response.data);
      } catch (error) {
        console.error('Gagal mengambil hasil prediksi post-test SRQ:', error);
      }
    };
    fetchPostTestResult();
  }, []);

  useEffect(() => {
    const fetchMethod54321 = async () => {
      try {
        const partisipanId = localStorage.getItem('partisipan_id');
        const response = await axios.get(`http://localhost:8080/cemas/checklist/participant/${partisipanId}`);
        setMethod54321(response.data);
      } catch (error) {
        console.error('Gagal mengambil hasil intervensi 54321 Method:', error);
      }
    };
    fetchMethod54321();
  }, []);

  useEffect(() => {
    const fetchMindfulness = async () => {
      try {
        const partisipanId = localStorage.getItem('partisipan_id');
        const response = await axios.get(`http://localhost:8080/api/mindfulness/daily-statuses/${partisipanId}`);
        setMindfulness(response.data);
      } catch (error) {
        console.error('Gagal mengambil hasil intervensi Mindfulness Method:', error);
      }
    };
    fetchMindfulness();
  }, []);

  useEffect(() => {
    const fetchCoping = async () => {
      try {
        const partisipanId = localStorage.getItem('partisipan_id');
        const response = await axios.get(`http://localhost:8080/stress/checklist/participant/${partisipanId}`);
        setCoping(response.data);
      } catch (error) {
        console.error('Gagal mengambil hasil intervensi Stress Coping Method:', error);
      }
    };
    fetchCoping();
  }, []);

  useEffect(() => {
    const fetchWriting = async () => {
      try {
        const partisipanId = localStorage.getItem('partisipan_id');
        const response = await axios.get(`http://localhost:8080/api/jawaban-intervensi/${partisipanId}`);
        setWriting(response.data);
      } catch (error) {
        console.error('Gagal mengambil hasil intervensi Writing Method:', error);
      }
    };
    fetchWriting();
  }, []);

  useEffect(() => {
    const fetchJadwal = async () => {
      try {
        const partisipanId = localStorage.getItem('partisipan_id');
        const response = await axios.get(`http://localhost:8080/depresi/checklist/participant/${partisipanId}`);
        setJadwal(response.data);
      } catch (error) {
        console.error('Gagal mengambil hasil intervensi Activity Method:', error);
      }
    };
    fetchJadwal();
  }, []);

  useEffect(() => {
    const fetchCBT = async () => {
      try {
        const partisipanId = localStorage.getItem('partisipan_id');
        const response = await axios.get(`http://localhost:8080/cbt-responses/${partisipanId}`);
        setCBT(response.data);
      } catch (error) {
        console.error('Gagal mengambil hasil intervensi CBT Method:', error);
      }
    };
    fetchCBT();
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <>
      <Navbar />
      <section
      id="psikolog-list"
      className="section before-content"
      style={{ backgroundColor: 'white', color: '#141313', padding: '50px 0', textAlign: 'center' }}
    >
      <div className="d-flex align-items-center justify-content-center">
        <div className="container text-left" style={{ marginLeft: '60px' }}>
          <h2
            className="section-title mb-4"
            style={{
              fontSize: '36px', // Slightly larger font for more emphasis
              fontWeight: 'bold',
              color: '#2F3E88',
              textAlign: 'left',
              lineHeight: '1.45',
              margin: '15px 0', // Adds top and bottom margin for better spacing
              padding: '0 20px', // Adds horizontal padding for better alignment
              textShadow: '1px 1px 3px rgba(0, 0, 0, 0.1)', // Adds subtle shadow for better readability
            }}
          >
            Ketahui kesehatan mentalmu di MentalWell!
          </h2>
          <h1
          style={{
           
            color: '#2F3E88',
            textAlign: 'left',
            lineHeight: '1.75',
            margin: '15px 0', // Adds top and bottom margin for better spacing
            padding: '0 20px', // Adds horizontal padding for better alignment
            textShadow: '1px 1px 3px rgba(0, 0, 0, 0.1)', // Adds subtle shadow for better readability
          }}
          >
            Mari lakukan cek kesehatan mental dan dapatkan intervensi sesuai kondisi yang sedang kamu alami
          </h1>
          <Button
            variant="light"
            style={{
              marginLeft: '20px',
              fontSize: '16px',
              marginTop: '20px',
              borderRadius: '50px',
              padding: '14px 30px',
              backgroundColor: '#F59E1D',
              borderColor: '#F59E1D', // Ubah warna border agar sesuai dengan background
              fontWeight: 'bold',
              color: '#FFF3DD',
              boxShadow: '0px 10px 15px rgba(0.15, 0, 0, 0.15)',
            }}
            href="/mentalwelltest-user"
          >
            Tes Sekarang
            <FaArrowRight style={{ marginLeft: '10px' }} />
          </Button>
        </div>
        <img
          src={illustrasi}
          alt="Logo"
          style={{ width: '800px', height: 'auto', maxWidth: '100%', maxHeight: '100%', marginLeft: '5px' }} // Sesuaikan margin kiri
        />
      </div>
    </section>

      {/* Doctor Consulting Section */}
      <section  >
        <Row className="justify-content-center" style={{}}>
        <h1 className="section-title mb-4 text-center" style={{ fontSize: "30px", fontWeight: "bold" }}>
              <span style={{ color: "#FEA503" }}>Tes </span>Skrining
            </h1>
          <Col md={4} className="d-flex align-items-center justify-content-center">
            <img src={doctorConsulting} alt="Doctor Consulting" style={{ maxWidth: "100%", maxHeight: "100%" }} />
          </Col>
          <Col md={7}>
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
                <p>Dapatkan solusi berdasarkan hasil skrining kondisi mental kamu</p>
              </div>
            </div>
          </Col>
        </Row>
      </section>

      {/* Intervention Slider Section */}
      <Container style={{ marginTop: "50px" }}>
        <Row >
        <h1 className="section-title mb-4 text-center" style={{ fontSize: "30px", fontWeight: "bold" }}>
              <span style={{ color: "#FEA503" }}>Riwayat </span>Intervensi
            </h1>
          <Slider {...sliderSettings}>
            {method54321 && method54321.length > 0 && method54321.map((item, index) => (
              <div key={index}>
                <Card>
                  <Card.Body>
                    <Card.Title style={{color:"#25B7D3"}}>54321 Method - Hari ke {item.hari}</Card.Title>
                    <Table style={{color:"#25B7D3"}}>
                      <tbody>
                        <tr>
                          <td><strong>Tanggal Intervensi:</strong></td>
                          <td>{item.tanggal}</td>
                        </tr>
                        <tr>
                          <td><strong>Tanggapan :</strong></td>
                          <td>{item.status === 1 ? "Sudah dilakukan" : "Sudah dilakukan"}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
              </div>
            ))}
            {mindfulness && mindfulness.length > 0 && mindfulness.map((item, index) => (
              <div key={index}>
                <Card>
                  <Card.Body>
                    <Card.Title style={{color:"#25B7D3"}}>Mindfulness - Week ke {item.intervention_week}</Card.Title>
                    <Table style={{color:"#25B7D3"}}>
                      <tbody>
                        <tr>
                          <td><strong>Hari ke :</strong></td>
                          <td>{item.intervention_day}</td>
                        </tr>
                        <tr>
                          <td><strong>Tanggal Intervensi:</strong></td>
                          <td>{item.created_at}</td>
                        </tr>
                        <tr>
                          <td><strong>Status:</strong></td>
                          <td>{item.is_completed === 1 ? "Sudah dilakukan" : "Sudah dilakukan"}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
              </div>
            ))}
            {coping && coping.length > 0 && coping.map((item, index) => (
              <div key={index}>
                <Card>
                  <Card.Body>
                    <Card.Title style={{color:"#25B7D3"}}>Coping Stress - Hari ke {item.hari}</Card.Title>
                    <Table  style={{color:"#25B7D3"}}>
                      <tbody>
                        <tr>
                          <td><strong>Tanggal Intervensi:</strong></td>
                          <td>{item.tanggal}</td>
                        </tr>
                        <tr>
                          <td><strong>Tanggapan :</strong></td>
                          <td>{item.status === 1 ? "Sudah dilakukan" : "Sudah dilakukan"}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
              </div>
            ))}
            {writing && writing.length > 0 && writing.map((item, index) => (
              <div key={index}>
                <Card>
                  <Card.Body>
                    <Card.Title style={{color:"#25B7D3"}}>30 Days Writing - Hari ke {item.id_intervensi}</Card.Title>
                    <Table style={{color:"#25B7D3"}}>
                      <tbody>
                        <tr>
                          <td><strong>Tanggal Intervensi:</strong></td>
                          <td>{item.tanggal_submit}</td>
                        </tr>
                        <tr>
                          <td><strong>Tanggapan :</strong></td>
                          <td>{item.respon}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
              </div>
            ))}
            {jadwal && jadwal.length > 0 && jadwal.map((item, index) => (
              <div key={index}>
                <Card>
                  <Card.Body>
                    <Card.Title style={{color:"#25B7D3"}}>Jadwal Kegiatan - Hari ke {item.hari}</Card.Title>
                    <Table style={{color:"#25B7D3"}}>
                      <tbody>
                        <tr>
                          <td><strong>Tanggal Intervensi:</strong></td>
                          <td>{item.tanggal}</td>
                        </tr>
                        <tr>
                          <td><strong>Tanggapan :</strong></td>
                          <td>{item.status === 1 ? "Sudah dilakukan" : "Sudah dilakukan"}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
              </div>
            ))}
            {cbt && cbt.length > 0 && cbt.map((item, index) => (
              <div key={index}>
                <Card>
                  <Card.Body>
                    <Card.Title style={{color:"#25B7D3"}}>CBT - {item.judul_session}</Card.Title>
                    <Table  style={{color:"#25B7D3"}}>
                      <tbody >
                        <tr>
                          <td ><strong>Hari Ke-:</strong></td>
                          <td>{item.no_hari}</td>
                        </tr>
                        <tr>
                          <td><strong>Tangal Intervensi:</strong></td>
                          <td>{item.submission_date}</td>
                        </tr>
                        <tr>
                          <td><strong>Tanggapan :</strong></td>
                          <td>{item.jawaban}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
              </div>
            ))}

          </Slider>
        </Row>
      </Container>
      <Link to="/partisipan-profile" style={{ textDecoration: 'none' }}>
        <Button
          variant="light"
          style={{
            fontSize: "14px",
            marginTop: "50px",
            borderRadius: "50px",
            padding: "16px 30px",
            backgroundColor: "white",
            borderColor: "#2F3E88",
            fontWeight: "bold",
            color: "#2F3E88",
            marginLeft: "580px",
            boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Lanjutkan Intervensimu
          <FaArrowRight style={{ marginLeft: "10px" }} />
        </Button>
      </Link>


      {/* Rekomendasi Psikolog Section */}
      <Container className="my-5" >
      <h1 className="section-title mb-4  text-center" style={{ marginTop:"50px",fontSize: "30px", fontWeight: "bold" }}>
              <span style={{ color: "#FEA503" }}>Rekomendasi </span>Psikolog
            </h1>
        <Row style={{ maxWidth: "1000px", marginLeft: "150px", marginTop: "40px" }}>
          {psikologs.map((psikolog, index) => (
            <Col md={4} className="mb-4" key={index}>
              <a href={psikolog.url_psikolog} className="psikolog-card-link">
                <Card>
                  <Card.Img
                    src={`http://localhost:8080/images/psikolog/${psikolog.image_psikolog}`}
                    alt="Psikolog Image"
                    style={{ width: "80%", height: "200px", objectFit: "cover", borderRadius: "10px", marginLeft: "26px" }}
                  />                <Card.Body>
                    <Card.Title>{psikolog.nama_psikolog}</Card.Title>
                    <Card.Text style={{ fontSize: "12px" }}>
                      {psikolog.deskripsi_psikolog.length > 50 ? psikolog.deskripsi_psikolog.substring(0, 100) + "..." : psikolog.deskripsi_psikolog}
                    </Card.Text>
                    <Button variant="light" style={{ backgroundColor: "#25B7D3", borderColor: "#25B7D3", color: "white", fontWeight: "bold", width: "100%" }}>Lihat Profil</Button>
                  </Card.Body>
                </Card>
              </a>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Layanan Mental Well Section */}
      <section
        id="layanan-mentalwell"
        className="section before-content"
        style={{ backgroundColor: "white", color: "#141313", padding: "50px 0", textAlign: "center" }} // Tambahkan gaya text-align untuk memusatkan
      >
        <Col md={16} className="d-flex align-items-center justify-content-center">
          <div className="container text-center">
            <h1 className="section-title mb-4 text-center" style={{ fontSize: "25px", fontWeight: "bold" }}>
              <span style={{ color: "#FEA503" }}>Temukan Lebih Banyak </span>Layanan Mental Well
            </h1>
            <h6 className="subtitle-home" style={{ fontSize: "16px", lineHeight: "1.6", maxWidth: "800px", margin: "auto" }}>
              Berikut layanan-layanan terbaik yang dapat mendukung kesehatan mental kamu!
            </h6>
          </div>
        </Col>
      </section>
      {/* LAYANAN 1 */}

      <Container className="my-5">
        <Row className="justify-content-center">
          <Col md={3} className="d-flex align-items-center justify-content-center">
            <img src={mentalwelltes} alt="Image" style={{ maxWidth: "100%", maxHeight: "100%" }} /> {/* Panggil gambar dengan variabel */}
          </Col>
          <Col md={6}>
            <h5 style={{ marginTop:"30px",fontSize: "18px", fontWeight: "bold" }}>
              <br />Mental Well Test<br />
            </h5>
            <p style={{ fontSize: "16px" }}>
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
          <Col md={6}>
            <h5 style={{ marginTop:"45px",fontSize: "18px", fontWeight: "bold" }}>
              <br />Daily Insight<br />
            </h5>
            <p style={{ fontSize: "16px" }}>
              <br />Daily Insight merupakan layanan yang dirancang untuk memberikan pengguna akses konten harian bermutu yang mendukung peningkatan kesehatan mental. Fitur ini menyediakan artikel, materi, dan panduan yang membahas berbagai aspek kesehatan mental, memberikan wawasan, dan memberikan dukungan untuk meningkatkan diri.
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
          <Col md={6}>
            <h5 style={{ marginTop:"30px",fontSize: "18px", fontWeight: "bold" }}>
              <br />Psikolog List<br />
            </h5>
            <p style={{ fontSize: "16" }}>
              <br />Psikolog List menyediakan informasi psikologi ahli yakni berisi terkait nama, lokasi dan foto dari profile psikolog. Layanan ini sebagai rekomendasi rujukan bagi penderita yang butuh penanganan oleh ahli.
            </p>
          </Col>
        </Row>
      </Container>

      {/*Layanan 4 */}

      <Container className="my-5" >
        <Row className="justify-content-center" style={{ marginTop: "70px" }}>
          <Col md={3} className="d-flex align-items-center justify-content-center">
            <img src={intervensi} alt="Image" style={{ maxWidth: "100%", maxHeight: "100%" }} /> {/* Panggil gambar dengan variabel */}
          </Col>
          <Col md={6}>
            <h5 style={{ marginTop:"30px",fontSize: "18px", fontWeight: "bold" }}>
              <br />Rekomendasi Intervensi<br />
            </h5>
            <p style={{ fontSize: "16px" }}>
              <br />Rekomendasi Intervensi ini akan menampilkan solusi yang tepat berdasarkan hasil test yang telah kamu dapatkan. Layanan intervensi yang telah direkomendasikan perlu kamu ikuti guna meningkatkan kesehatan mental kamu.
            </p>
          </Col>
        </Row>
      </Container>
      <br />
      <br />

      <Footer />
    </>

  );
};

export default Home;
