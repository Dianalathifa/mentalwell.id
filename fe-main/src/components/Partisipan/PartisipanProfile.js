import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Image, Nav, Tab, Card, Table } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Navbar from '../landing/Navbar';
import Footer from '../landing/Footer';
import profileImage from '../images/partisipan.jpg';
import SRQ from '../images/SRQ.jpg';
import StressImage from '../images/Stress.jpg';
import Suicide from '../images/Suicide.jpg';
import Depresi from '../images/Depresi.jpg';
import Cemas from '../images/Cemas.jpg';
import '../style/Profile.css';

const Profile = () => {
  const [partisipan, setPartisipan] = useState({
    nama_partisipan: localStorage.getItem('partisipan_nama') || '',
    email_partisipan: localStorage.getItem('partisipan_email') || '',
    usia: localStorage.getItem('usia') || '',
    no_telp: localStorage.getItem('no_telp') || '',
    foto_profile: localStorage.getItem('partisipan_foto_profile') || profileImage,
  });

  const [klasifikasiHistory, setKlasifikasiHistory] = useState(null);
  const [cemasHistory, setCemasHistory] = useState(null);
  const [depresiHistory, setDepresiHistory] = useState(null);
  const [stressHistory, setStressHistory] = useState(null);
  const [suicideHistory, setSuicideHistory] = useState(null);
  const [postTestResult, setPostTestResult] = useState(null);
  const [initialSRQResult, setInitialSRQResult] = useState(null);
  const [method54321, setMethod54321] = useState(null);
  const [mindfulness, setMindfulness] = useState(null);
  const [coping, setCoping] = useState(null);
  const [writing, setWriting] = useState(null);
  const [jadwal, setJadwal] = useState(null);
  const [cbt, setCBT] = useState(null);
  const history = useHistory();


  useEffect(() => {
    const fetchKlasifikasiHistory = async () => {
      try {
        const partisipanId = localStorage.getItem('partisipan_id');
        const response = await axios.get(`http://localhost:5000/hasil-prediksi/${partisipanId}`);
        setKlasifikasiHistory(response.data);
      } catch (error) {
        console.error('Gagal mengambil riwayat tes:', error);
      }
    };

    fetchKlasifikasiHistory();
  }, []);

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
        console.error('Gagal mengambil hasil intervensi Mindfulness Method:', error);
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
        console.error('Gagal mengambil hasil intervensi Mindfulness Method:', error);
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
        console.error('Gagal mengambil hasil intervensi Mindfulness Method:', error);
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
        console.error('Gagal mengambil hasil intervensi Mindfulness Method:', error);
      }
    };
    fetchCBT();
  }, []);

  useEffect(() => {
    const fetchInitialSRQResult = async () => {
      try {
        const partisipanId = localStorage.getItem('partisipan_id');
        const response = await axios.get(`http://localhost:5000/hasil-prediksi/${partisipanId}`);
        setInitialSRQResult(response.data);
      } catch (error) {
        console.error('Gagal mengambil hasil tes SRQ awal:', error);
      }
    };
    fetchInitialSRQResult();
  }, []);

  // Function to compare initial SRQ result with post-test SRQ result
  const compareSRQResults = (initialResult, postTestResult) => {
    if (initialResult && postTestResult) {
      // Compare the points
      if (postTestResult.points < initialResult.points) {
        return 'Kondisi pasien membaik.';
      } else if (postTestResult.points > initialResult.points) {
        return 'Kondisi pasien memburuk.';
      } else {
        return 'Kondisi pasien tetap.';
      }
    } else {
      return 'Belum ada hasil tes.';
    }
  };

  return (
    <>
      <Navbar />
      <Container className="profile-container" style={{ marginTop: "150px" }}>
        <Row className="profile-header">
          <Col xs={12} md={3}>
            <Image src={partisipan.foto_profile} roundedCircle className="profile-avatar" />
          </Col>
          <Col xs={12} md={6}>
            <h2>Username: {partisipan.nama_partisipan}</h2>
            <p>Email: {partisipan.email_partisipan}</p>
            <p>Usia: {partisipan.usia}</p>
            <p>Telephone: {partisipan.no_telp}</p>
          </Col>
          <Col xs={6} md={3} style={{ marginLeft: "-350px" }}>
            <Card>
              <Card.Body style={{ backgroundColor: '#f8f9fa' }}>
                <h5 style={{ marginBottom: '20px' }}>Evaluasi</h5>
                <Table bordered striped responsive style={{ borderColor: '#25B7D3' }}>
                  <tbody>
                  {postTestResult && initialSRQResult && (
                      <>
                        <tr>
                          <td><strong>Perubahan:</strong></td>
                          <td>{compareSRQResults(initialSRQResult, postTestResult)}</td>
                        </tr>
                      </>
                    )}  
                      <tr>
                        <td colSpan="2">Maaf, belum ada evaluasi untukmu. Segera selesaikan intervensinya!</td>
                      </tr>
                    
                  </tbody>
                </Table>
              </Card.Body>

            </Card>
          </Col>
        </Row>
        <Row xs={2} md={5} style={{ marginBottom: "50px" }}>
          <Card>
            <Card.Body>
              <Card.Title>Hasil Skrining SRQ-20</Card.Title>
              <Table bordered striped responsive>
                <tbody>
                  {klasifikasiHistory ? (
                    <>
                      <tr>
                        <td><strong>Points:</strong></td>
                        <td>{klasifikasiHistory.points}</td>
                      </tr>
                      <tr>
                        <td><strong>Mental Disorders:</strong></td>
                        <td>{klasifikasiHistory.mental_disorders}</td>
                      </tr>
                      <tr>
                        <td><strong>Klasifikasi:</strong></td>
                        <td>{klasifikasiHistory.klasifikasi}</td>
                      </tr>
                    </>
                  ) : (
                    <tr>
                      <td colSpan="2">Belum ada riwayat tes.</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>Hasil Dass Depresi</Card.Title>
              <Table bordered striped responsive>
                <tbody>
                  {depresiHistory ? (
                    <>
                      <tr>
                        <td><strong>Points:</strong></td>
                        <td>{depresiHistory.points}</td>
                      </tr>
                      <tr>
                        <td><strong>Klasifikasi:</strong></td>
                        <td>{depresiHistory.klasifikasi}</td>
                      </tr>
                    </>
                  ) : (
                    <tr>
                      <td colSpan="2">Belum ada riwayat tes depresi.</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>Hasil Tes Suicide</Card.Title>
              <Table bordered striped responsive>
                <tbody>
                  {suicideHistory ? (
                    <>
                      <tr>
                        <td><strong>Points:</strong></td>
                        <td>{suicideHistory.points}</td>
                      </tr>
                      <tr>
                        <td><strong>Klasifikasi:</strong></td>
                        <td>{suicideHistory.klasifikasi}</td>
                      </tr>
                    </>
                  ) : (
                    <tr>
                      <td colSpan="2">Belum ada riwayat tes suicide.</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>Hasil Tes Dass Cemas</Card.Title>
              <Table bordered striped responsive>
                <tbody>
                  {cemasHistory ? (
                    <>
                      <tr>
                        <td><strong>Points:</strong></td>
                        <td>{cemasHistory.points}</td>
                      </tr>
                      <tr>
                        <td><strong>Klasifikasi:</strong></td>
                        <td>{cemasHistory.klasifikasi}</td>
                      </tr>
                    </>
                  ) : (
                    <tr>
                      <td colSpan="2">Belum ada riwayat tes cemas.</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>Hasil Tes Dass Stress</Card.Title>
              <Table bordered striped responsive>
                <tbody>
                  {stressHistory ? (
                    <>
                      <tr>
                        <td><strong>Points:</strong></td>
                        <td>{stressHistory.points}</td>
                      </tr>
                      <tr>
                        <td><strong>Klasifikasi:</strong></td>
                        <td>{stressHistory.klasifikasi}</td>
                      </tr>
                    </>
                  ) : (
                    <tr>
                      <td colSpan="2">Belum ada riwayat tes stress.</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Row>
        <Tab.Container id="left-tabs-example" defaultActiveKey="home">
          <Nav variant="tabs" className="profile-tabs">
            <Nav.Item>
              <Nav.Link eventKey="Cemas Ringan">Cemas Ringan</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="Cemas Sedang">Cemas Sedang</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="Stress Ringan">Stress Ringan</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="Stress Sedang">Stress Sedang</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="Depresi Ringan">Depresi Ringan</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="Depresi Sedang">Depresi Sedang</Nav.Link>
            </Nav.Item>
          </Nav>

          <Tab.Content>
  <Tab.Pane eventKey="Cemas Ringan">
    <Row className="profile-content">
      <h5 style={{ fontSize: "35px", fontWeight: "bold", marginBottom: "50px" }}>Perjalanan Intervensi Teknik Grounding 5-4-3-2-1</h5>
      <Row xs={10} md={10} style={{ marginBottom: "100px" }}>
        {method54321 && method54321.length > 0 ? (
          method54321.map((item, index) => (
            <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-3">
              <Card>
                <Card.Body>
                  <Card.Title>54321 Method - Hari ke-{item.hari}</Card.Title>
                  <Table bordered striped responsive>
                    <tbody>
                      <tr>
                        <td><strong>Tanggal Intervensi:</strong></td>
                        <td>{item.tanggal}</td>
                      </tr>
                      <tr>
                        <td><strong>Status:</strong></td>
                        <td>{item.status === 1 ? "Sudah dilakukan" : "Sudah dilakukan"}</td>
                      </tr>
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
              {/* Add button for the last day */}
              {index === (method54321 && method54321.length - 1) && (
                <div className="mt-3">
                  <button className="btn btn-primary">
                    Yuk lanjutkan intervensimu sampai selesai
                  </button>
                </div>
              )}
            </Col>
          ))
        ) : (
          <Card>
            <Card.Body>
              <p>Oops! Sepertinya kamu tidak melakukan intervensi ini.</p>
            </Card.Body>
          </Card>
        )}
      </Row>
    </Row>
  </Tab.Pane>
</Tab.Content>

<Tab.Content>
  <Tab.Pane eventKey="Cemas Sedang">
    <Row className="profile-content">
      <h5 style={{ fontSize: "35px", fontWeight: "bold", marginBottom: "50px" }}>Perjalanan Intervensi Mindfulness-Based Stress Reduction</h5>
      <Row xs={10} md={10} style={{ marginBottom: "100px" }}>
        {mindfulness && mindfulness.length > 0 ? (
          mindfulness.map((item, index) => (
            <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-3">
              <Card>
                <Card.Body>
                  <Card.Title>Mindfulness - Week ke {item.intervention_week}</Card.Title>
                  <Table bordered striped responsive>
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
              {/* Add button for the last day */}
              {index === (mindfulness && mindfulness.length - 1) && (
                <div className="mt-3">
                  <button className="btn btn-primary">
                    Yuk lanjutkan intervensimu sampai selesai
                  </button>
                </div>
              )}
            </Col>
          ))
        ) : (
          <Card>
            <Card.Body>
              <p>Oops! Sepertinya kamu tidak melakukan intervensi ini.</p>
            </Card.Body>
          </Card>
        )}
      </Row>
    </Row>
  </Tab.Pane>
</Tab.Content>

<Tab.Content>
  <Tab.Pane eventKey="Stress Ringan">
    <Row className="profile-content">
      <h5 style={{ fontSize: "35px", fontWeight: "bold", marginBottom: "50px" }}>Perjalanan Intervensi Coping Strategis</h5>
      <Row xs={10} md={10} style={{ marginBottom: "100px" }}>
        {coping && coping.length > 0 ? (
          coping.map((item, index) => (
            <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-3">
              <Card>
                <Card.Body>
                  <Card.Title>Mindfulness - Hari ke {item.hari}</Card.Title>
                  <Table bordered striped responsive>
                    <tbody>
                      <tr>
                        <td><strong>Tanggal Intervensi:</strong></td>
                        <td>{item.tanggal}</td>
                      </tr>
                      <tr>
                        <td><strong>Status:</strong></td>
                        <td>{item.status === 1 ? "Sudah dilakukan" : "Sudah dilakukan"}</td>
                      </tr>
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
              {/* Add button for the last day */}
              {index === (coping && coping.length - 1) && (
                <div className="mt-3">
                  <button className="btn btn-primary">
                    Yuk lanjutkan intervensimu sampai selesai
                  </button>
                </div>
              )}
            </Col>
          ))
        ) : (
          <Card>
            <Card.Body>
              <p>Oops! Sepertinya kamu tidak melakukan intervensi ini.</p>
            </Card.Body>
          </Card>
        )}
      </Row>
    </Row>
  </Tab.Pane>
</Tab.Content>

<Tab.Content>
  <Tab.Pane eventKey="Stress Sedang">
    <Row className="profile-content">
      <h5 style={{ fontSize: "35px", fontWeight: "bold", marginBottom: "50px" }}>Perjalanan Intervensi 30 Days Writing Challenge</h5>
      <Row xs={10} md={10} style={{ marginBottom: "100px" }}>
        {writing && writing.length > 0 ? (
          writing.map((item, index) => (
            <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-3">
              <Card>
                <Card.Body>
                  <Card.Title>30 Days Writing - Hari ke {item.id_intervensi}</Card.Title>
                  <Table bordered striped responsive>
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
              {/* Add button for the last day */}
              {index === (writing && writing.length - 1) && (
                <div className="mt-3">
                  <button className="btn btn-primary">
                    Yuk lanjutkan intervensimu sampai selesai
                  </button>
                </div>
              )}
            </Col>
          ))
        ) : (
          <Card>
            <Card.Body>
              <p>Oops! Sepertinya kamu tidak melakukan intervensi ini.</p>
            </Card.Body>
          </Card>
        )}
      </Row>
    </Row>
  </Tab.Pane>
</Tab.Content>

<Tab.Content>
  <Tab.Pane eventKey="Depresi Ringan">
    <Row className="profile-content">
      <h5 style={{ fontSize: "35px", fontWeight: "bold", marginBottom: "50px" }}>Perjalanan Intervensi Activity Therapy</h5>
      <Row xs={10} md={10} style={{ marginBottom: "100px" }}>
        {jadwal && jadwal.length > 0 ? (
          jadwal.map((item, index) => (
            <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-3">
              <Card>
                <Card.Body>
                  <Card.Title>Activity Therapy - Hari ke {item.hari}</Card.Title>
                  <Table bordered striped responsive>
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
              {/* Add button for the last day */}
              {index === (jadwal && jadwal.length - 1) && (
                <div className="mt-3">
                  <button className="btn btn-primary">
                    Yuk lanjutkan intervensimu sampai selesai
                  </button>
                </div>
              )}
            </Col>
          ))
        ) : (
          <Card>
            <Card.Body>
              <p>Oops! Sepertinya kamu tidak melakukan intervensi ini.</p>
            </Card.Body>
          </Card>
        )}
      </Row>
    </Row>
  </Tab.Pane>
</Tab.Content>

<Tab.Content>
  <Tab.Pane eventKey="Depresi Sedang">
    <Row className="profile-content">
      <h5 style={{ fontSize: "35px", fontWeight: "bold", marginBottom: "50px" }}>Perjalanan Intervensi Cognitive Behavior Therapy (CBT) </h5>
      <Row xs={10} md={10} style={{ marginBottom: "100px" }}>
        {cbt && cbt.length > 0 ? (
          cbt.map((item, index) => (
            <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-3">
              <Card>
                <Card.Body>
                  <Card.Title>CBT - {item.judul_session}</Card.Title>
                  <Table bordered striped responsive>
                    <tbody>
                      <tr>
                        <td><strong>Hari Ke-:</strong></td>
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
              {/* Add button for the last day */}
              {index === (cbt && cbt.length - 1) && (
                <div className="mt-3">
                  <button className="btn btn-primary">
                    Yuk lanjutkan intervensimu sampai selesai
                  </button>
                </div>
              )}
            </Col>
          ))
        ) : (
          <Card>
            <Card.Body>
              <p>Oops! Sepertinya kamu tidak melakukan intervensi ini.</p>
            </Card.Body>
          </Card>
        )}
      </Row>
    </Row>
  </Tab.Pane>
</Tab.Content>



        </Tab.Container>
      </Container>
      <Footer />
    </>
  );
};

export default Profile;
