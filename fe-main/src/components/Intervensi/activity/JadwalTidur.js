import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Col, Form, Button, Row, Card } from "react-bootstrap";
import Navbar from '../../landing/Navbar.js';
import tidur from '../../images/activityTerapi/tidur-sehat.png';

const JadwalTidurSehat = () => {
  const [latestSleepSchedule, setLatestSleepSchedule] = useState([]);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    tanggal: "",
    waktu_tidur: "",
    waktu_bangun: "",
    gangguan_tidur: ""
  });

  useEffect(() => {
    fetchLatestSleepSchedule();
  }, []);

  const fetchLatestSleepSchedule = async () => {
    const partisipanId = localStorage.getItem("partisipan_id");
    try {
      const response = await axios.get(`http://localhost:8080/api/jadwal-tidur/${partisipanId}`);
      if (response.data.length === 0) {
        setError("Belum ada jadwal tidur sehat. Silakan tambahkan jadwal tidur.");
      } else {
        const latestSchedule = response.data[response.data.length - 1];
        setLatestSleepSchedule([latestSchedule]);
      }
    } catch (error) {
      setError("Belum ada jadwal tidur sehat");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const partisipanId = localStorage.getItem("partisipan_id");
    try {
      const response = await axios.post(
        `http://localhost:8080/api/jadwal-tidur`,
        { ...formData, id_partisipan: partisipanId }
      );
      alert("Jadwal tidur berhasil ditambahkan.");
  
      // Menampilkan data baru langsung setelah konfirmasi alert
      const isAlreadyAdded = latestSleepSchedule.some(schedule => schedule.id === response.data.id);
      if (!isAlreadyAdded) {
        setLatestSleepSchedule([response.data, ...latestSleepSchedule]);
      }
  
      setFormData({
        tanggal: "",
        waktu_tidur: "",
        waktu_bangun: "",
        gangguan_tidur: ""
      });
    } catch (error) {
      console.error("Gagal menambah jadwal tidur:", error);
      setError("Gagal menambah jadwal tidur");
    }
  };
  
  

  return (
    <>
      <Navbar />
      <section className="section before-content" style={{ backgroundColor: "#25B7D3", color: "#141313", marginTop: "100px", paddingTop: "100px", padding: "70px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "50%", left: 0, width: "100%", height: "50%", backgroundColor: "white", zIndex: 1 }}></div>
        <div style={{ position: "relative", zIndex: 2 }}>
          <Col md={16} className="d-flex align-items-center justify-content">
            <div className="container text-center">
              <h6 className="tfonts-2" style={{ fontWeight: "bold", color: "white" }}>Jadwal Tidur Sehat</h6>
            </div>
          </Col>
          <br /><br /><br />
          <div className="container text-center">
            <img src={tidur} style={{ borderRadius:"30px", width: "350px", height: "auto", maxWidth: "100%", maxHeight: "100%" }} alt="tidur-sehat" />
          </div>
        </div>
      </section>

      <Container className="mt-3" style={{ maxWidth: '800px', marginBottom:"100px" }}>
        <Col md={16} className="d-flex align-items-center justify-content" style={{ marginBottom:"100px" }}>
          <div className="container text-center">
            <p style={{ fontSize: "16px", fontWeight: "bold", color: "#25B7D3" }}>
              "Jaga kualitas tidurmu, karena istirahat yang cukup adalah kunci untuk kesehatan dan kesejahteraanmu. 
              Yuk, mulailah dengan mengatur jadwal tidur sehatmu sekarang! Dengan memiliki jadwal tidur yang teratur, kamu bisa merasakan manfaatnya dalam meningkatkan energi, produktivitas, dan kesehatan secara keseluruhan. 
              Tidak hanya itu, dalam fitur ini, kamu juga bisa melacak kualitas tidurmu dari hari ke hari dan memperbaiki kualitasnya. 
              Jangan biarkan kelelahan mengganggu hari-harimu, mari prioritaskan tidur yang berkualitas untuk kebahagiaan dan keberhasilan jangka panjang. 
              Mulai hari ini, jadwalkan tidur sehatmu dan rasakan perbedaannya!"
            </p>
          </div>
        </Col>
        <Row>
          <Col>
            <Card className="container text-center " style={{ padding:"40px",borderRadius: "40px", fontWeight: "bold", fontSize: "20px", height: "500px", backgroundColor: "#25B7D329", color: "#25B7D3" }}>
              <Card.Body>
                <br />
                <Card.Title style={{ fontSize: "25px", fontWeight: "bold" }}>Daftar Jadwal Tidur</Card.Title><br /><br />
                {error ? (
                  <p>{error}</p>
                ) : (
                  <>
                    {latestSleepSchedule.length === 0 && (
                      <p>Belum ada jadwal tidur sehat yang tersedia.</p>
                    )}
                    {latestSleepSchedule.map((schedule, index) => (
                      <div key={index}>
                        <p>
                          <strong>Tanggal&nbsp;: &nbsp;&nbsp;&nbsp;</strong> {schedule.tanggal}
                        </p>
                        <p>
                          <strong>Jam Tidur&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;</strong> {schedule.waktu_tidur}
                        </p>
                        <p>
                          <strong>Jam Bangun&nbsp;:&nbsp;&nbsp;&nbsp;</strong>{" "}
                          {schedule.waktu_bangun}
                        </p>
                        <p>
                          <strong>Gangguan Tidur&nbsp;:&nbsp;&nbsp;&nbsp;</strong>{" "}
                          {schedule.gangguan_tidur}
                        </p>
                      </div>
                    ))}
                  </>
                )}
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card style={{ borderRadius: "40px", height: "500px", fontWeight: "bold", backgroundColor: "#25B7D329", color: "#25B7D3", padding:"10px" }}>
              <Card.Body>
                <Card.Title className="container text-center" style={{ fontSize: "20px", fontWeight: "bold", marginBottom:"15px" }}>Tambah Jadwal Tidur</Card.Title>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="formTanggal">
                    <Form.Label>Tanggal</Form.Label>
                    <Form.Control
                      type="date"
                      name="tanggal"
                      value={formData.tanggal}
                      onChange={handleInputChange}
                    /><br />
                  </Form.Group>
                  <Form.Group controlId="formJamTidur">
                    <Form.Label>Jam Tidur</Form.Label>
                    <Form.Control
                      type="time"
                      name="waktu_tidur"
                      value={formData.waktu_tidur}
                      onChange={handleInputChange}
                    /><br />
                  </Form.Group>
                  <Form.Group controlId="formJamBangun">
                    <Form.Label>Jam Bangun</Form.Label>
                    <Form.Control
                      type="time"
                      name="waktu_bangun"
                      value={formData.waktu_bangun}
                      onChange={handleInputChange}
                    /><br />
                  </Form.Group>
                  <Form.Group controlId="formGangguanTidur">
                    <Form.Label>Gangguan Tidur</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Masukkan gangguan tidur"
                      name="gangguan_tidur"
                      value={formData.gangguan_tidur}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  <Button variant="light" type="submit" style={{ marginTop:"10px",backgroundColor: "#25B7D3", color: "white", fontWeight: "bold" }}>
                    Tambah
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default JadwalTidurSehat;
