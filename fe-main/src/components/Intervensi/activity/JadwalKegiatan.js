import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Card, Form, Button, Row, Col, Modal } from "react-bootstrap";
import Navbar from '../../landing/Navbar.js';
import Footer from '../../landing/Footer.js';
import yoga from '../../images/activityTerapi/yoga.png';
import piknik from '../../images/activityTerapi/piknik.png';
import nobar from '../../images/activityTerapi/nobar.png';
import bersepeda from '../../images/activityTerapi/bersepeda.png';
import kuliner from '../../images/activityTerapi/kuliner.png';
import konser from '../../images/activityTerapi/konser.png';
import standUp from '../../images/activityTerapi/standUp.png';
import trekking from '../../images/activityTerapi/trekking.png';
import "../../style/Home.css";

const JenisKegiatan = ["Yoga di Taman Kota", "Piknik di Pantai", "Nobar Film Favorit", "Bersepeda Santai", "Kuliner Makanan Favorit", "Konser Musik Favorit", "Acara Stand-up Comedy", "Trekking di Gunung"];
const GambarKegiatan = [yoga, piknik, nobar, bersepeda, kuliner, konser, standUp, trekking];

const JadwalKegiatan = () => {
  const [formData, setFormData] = useState({});
  const [tanggal, setTanggal] = useState({});
  const [catatan, setCatatan] = useState({});
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [jadwalKegiatan, setJadwalKegiatan] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const id_partisipan = localStorage.getItem("partisipan_id");

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/kegiatan/${id_partisipan}`);
      setJadwalKegiatan(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id_partisipan]);

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    if (name === "tanggal") {
      setTanggal({ ...tanggal, [index]: value });
    } else if (name === "catatan") {
      setCatatan({ ...catatan, [index]: value });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (jenisKegiatan, index) => {
    try {
      const response = await axios.post("http://localhost:8080/api/kegiatan", {
        ...formData,
        tanggal: tanggal[index],
        catatan: catatan[index],
        jenis_kegiatan: jenisKegiatan,
        id_partisipan: id_partisipan
      });
      setShowAlert(true);
      setAlertType("success");
      setAlertMessage(response.data.message);
      setFormData({});
      setTanggal({ ...tanggal, [index]: "" });
      setCatatan({ ...catatan, [index]: "" });
      setError("");
      fetchData();
    } catch (error) {
      setShowAlert(true);
      setAlertType("danger");
      setAlertMessage("Gagal menambah jadwal kegiatan");
      setError("Gagal menambah jadwal kegiatan");
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
              <h6 className="tfonts-2" style={{ fontWeight: "bold", color: "white" }}>Jadwal Kegiatan Teratur</h6>
            </div>
          </Col>
          <br /><br /><br />
          <div className="container text-center">
            <img src={yoga} style={{ borderRadius: "30px", width: "350px", height: "auto", maxWidth: "100%", maxHeight: "100%" }} alt="kegiatan" />
          </div>
        </div>
      </section>

      <Container className="mt-3" style={{ maxWidth: '800px', marginBottom: "10px", marginBottom: "100px" }}>
        <Col md={16} className="d-flex align-items-center justify-content">
          <div className="container text-center">
            <p style={{ fontSize: "16px", fontWeight: "bold", color: "#25B7D3" }}>
              "Jaga kesehatan mentalmu dengan mengatur jadwal kegiatan yang menyenangkan! Yuk, mulailah dengan merencanakan kegiatan favoritmu sekarang! Dengan memiliki jadwal kegiatan yang teratur, kamu bisa merasakan manfaatnya dalam meningkatkan kesejahteraan mental dan emosional secara keseluruhan. Tidak hanya itu, dalam fitur ini, kamu juga bisa melacak kegiatan favoritmu dari hari ke hari dan memperbaiki kualitas hidupmu. Jangan biarkan waktu luangmu terbuang, mari isi dengan kegiatan yang bermanfaat untuk dirimu sendiri. Mulai hari ini, jadwalkan kegiatan favoritmu dan rasakan kebahagiaannya!"
            </p>
          </div>
        </Col>
      </Container>

      <Container className="mt-5 " style={{ backgroundColor: "#25B7D3", padding: "20px", borderRadius: "20px", maxWidth: "1090px", marginBottom: "50px" }}>
        <h2 className="g-4 text-center" style={{ color: "white", fontWeight: "bold", fontSize: "25px", marginTop: "30px" }}>Jadwal Kegiatan Anda</h2>
        {showAlert && <Modal show={showAlert} onHide={() => setShowAlert(false)} >
          <Modal.Header closeButton>
            <Modal.Title>{alertType === "success" ? "Sukses" : "Error"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{alertMessage}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowAlert(false)}>
              Tutup
            </Button>
          </Modal.Footer>
        </Modal>}
        {jadwalKegiatan.length > 0 && (
          <section style={{ fontSize: "20px", backgroundColor: "#25B7D329", color: "white", fontWeight: "bold", padding: "10px", marginBottom: "10px" }}>
            {jadwalKegiatan.map((kegiatan, index) => (
              <Card.Body key={index} style={{ padding: "40px" }}>
                <p><strong style={{ fontSize: "20px", backgroundColor: "#25B7D329", color: "white", fontWeight: "bold" }}>Tanggal&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;</strong> {kegiatan.tanggal}</p>
                <p><strong style={{ fontSize: "20px", backgroundColor: "#25B7D329", color: "white", fontWeight: "bold" }}>Jenis Kegiatan&nbsp;:&nbsp;&nbsp;</strong> {kegiatan.jenis_kegiatan}</p>
                <p><strong style={{ fontSize: "20px", backgroundColor: "#25B7D329", color: "white", fontWeight: "bold" }}>Catatan&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;</strong> {kegiatan.catatan}</p>
              </Card.Body>
            ))}
          </section>
        )}
      </Container>

      <Container className="mt-3" style={{ marginBottom: "50px", marginLeft: "100px" }}>
        <Row xs={1} md={3} className="g-4 justify-content-left">
          {JenisKegiatan.map((jenis, index) => (
            <Card key={index} style={{ padding: "15px", borderRadius: "20px", fontWeight: "bold", fontSize: "10px", height: "450px", width: "230px", backgroundColor: "#25B7D329", color: "#25B7D3", margin: "10px" }}>
              <h3 style={{ fontWeight: "bold", fontSize: "16px", marginBottom: "5px" }}>{jenis}</h3>
              <Card.Img variant="top" src={GambarKegiatan[index]} style={{ marginBottom: "10px", height: "150px", width: "auto", objectFit: "cover", borderRadius: "20px" }} />
              <Card.Body>
                <Form onSubmit={(e) => { e.preventDefault(); handleSubmit(jenis, index); }}>
                  <Form.Group controlId={`formTanggal_${index}`}>
                    <Form.Label>Tanggal</Form.Label>
                    <Form.Control
                      type="date"
                      name="tanggal"
                      value={tanggal[index] || ""}
                      onChange={(e) => handleChange(e, index)} />
                  </Form.Group>
                  <Form.Group controlId={`formCatatan_${index}`}>
                    <Form.Label>Catatan</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="catatan"
                      value={catatan[index] || ""}
                      onChange={(e) => handleChange(e, index)}
                    /><br />
                  </Form.Group>
                  <Button style={{ backgroundColor: "#25B7D3", color: "white", fontWeight: "bold" }} variant="light" type="submit">
                    Jadwalkan
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          ))}
        </Row>

        {message && <p className="text-success">{message}</p>}
        {error && <p className="text-danger">{error}</p>}

      </Container>
    </>
  );
};

export default JadwalKegiatan;

