import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Card, Form, Button, Row, Col } from "react-bootstrap";
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

const JenisKegiatan = ["Yoga di Taman Kota", "Piknik di Pantai", "Nobar Film Favorit", "Bersepeda Santai", "Kuliner Makanan Favorit", "Konser Musik Favorit", "Acara Stand-up Comedy", "Trekking di Gunung"];
const GambarKegiatan = [yoga, piknik, nobar, bersepeda, kuliner, konser, standUp, trekking];

const JadwalKegiatan = () => {
  const [formData, setFormData] = useState({});
  const [tanggal, setTanggal] = useState({}); // Menyimpan tanggal yang dipilih untuk setiap jenis kegiatan
  const [catatan, setCatatan] = useState({}); // Menyimpan catatan yang diisi untuk setiap jenis kegiatan
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [jadwalKegiatan, setJadwalKegiatan] = useState([]);

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
      setTanggal({ ...tanggal, [index]: value }); // Simpan tanggal yang dipilih untuk jenis kegiatan dengan indeks tertentu
    } else if (name === "catatan") {
      setCatatan({ ...catatan, [index]: value }); // Simpan catatan yang diisi untuk jenis kegiatan dengan indeks tertentu
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (jenisKegiatan, index) => {
    try {
      const response = await axios.post("http://localhost:8080/api/kegiatan", {
        ...formData,
        tanggal: tanggal[index], // Gunakan tanggal yang dipilih untuk jenis kegiatan dengan indeks tertentu
        catatan: catatan[index], // Gunakan catatan yang diisi untuk jenis kegiatan dengan indeks tertentu
        jenis_kegiatan: jenisKegiatan,
        id_partisipan: id_partisipan
      });
      setMessage(response.data.message);
      setFormData({});
      setTanggal({ ...tanggal, [index]: "" }); // Reset tanggal setelah submit berhasil untuk jenis kegiatan dengan indeks tertentu
      setCatatan({ ...catatan, [index]: "" }); // Reset catatan setelah submit berhasil untuk jenis kegiatan dengan indeks tertentu
      setError("");
      fetchData(); // Ambil data terbaru setelah menambah jadwal kegiatan
    } catch (error) {
      setError("Gagal menambah jadwal kegiatan");
    }
  };

  return (
    <>
      <Navbar />
      <section className="section before-content" style={{ backgroundColor: "#25B7D3", color: "#141313", marginTop: "-10px", paddingTop: "100px", paddingBottom: "-140px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "50%", left: 0, width: "100%", height: "50%", backgroundColor: "white", zIndex: 1 }}></div>
        <div style={{ position: "relative", zIndex: 2 }}>
          <Col md={16} className="d-flex align-items-center justify-content">
            <div className="container text-center">
              <h6 className="subtitle" style={{ fontSize: "40px", fontWeight: "bold", color: "white" }}>Jadwal Kegiatan Teratur</h6>
            </div>
          </Col>
          <br /><br /><br />
          <div className="container text-center">
            <img src={yoga} style={{ width: "700px", height: "auto", maxWidth: "100%", maxHeight: "100%" }} alt="kegiatan" />
          </div>
        </div>
      </section>

      <Container className="mt-5">
        <Col md={16} className="d-flex align-items-center justify-content">
          <div className="container text-center">
            <p style={{ fontSize: "19px", fontWeight: "bold", color: "#25B7D3" }}>
              "Jaga kesehatan mentalmu dengan mengatur jadwal kegiatan yang menyenangkan! Yuk, mulailah dengan merencanakan kegiatan favoritmu sekarang! Dengan memiliki jadwal kegiatan yang teratur, kamu bisa merasakan manfaatnya dalam meningkatkan kesejahteraan mental dan emosional secara keseluruhan. Tidak hanya itu, dalam fitur ini, kamu juga bisa melacak kegiatan favoritmu dari hari ke hari dan memperbaiki kualitas hidupmu. Jangan biarkan waktu luangmu terbuang, mari isi dengan kegiatan yang bermanfaat untuk dirimu sendiri. Mulai hari ini, jadwalkan kegiatan favoritmu dan rasakan kebahagiaannya!"
            </p>
          </div>
        </Col>
        <br /><br /><br />
      </Container>

      <Container className="mt-5">
        <Row xs={1} md={3} className="g-4 justify-content-center">
          {JenisKegiatan.map((jenis, index) => (
            <Card key={index} style={{ borderRadius: "20px", fontWeight: "bold", fontSize: "20px", height: "600px", width: "500px", backgroundColor: "#25B7D329", color: "#25B7D3", margin: "20px" }}>
              <Card.Header>{jenis}</Card.Header>
              <Card.Img variant="top" src={GambarKegiatan[index]} style={{ height: "200px", objectFit: "cover", borderRadius: "20px 20px 0 0" }} />
              <Card.Body>
                <Form onSubmit={(e) => { e.preventDefault(); handleSubmit(jenis, index); }}>
                  <Form.Group controlId={`formTanggal_${index}`}>
                    <Form.Label>Tanggal</Form.Label>
                    <Form.Control
                      type="date"
                      name="tanggal"
                      value={tanggal[index] || ""} // Gunakan tanggal yang dipilih untuk jenis kegiatan dengan indeks tertentu
                      onChange={(e) => handleChange(e, index)}
                    /><br />
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

        <Container className="mt-5 " style={{ backgroundColor: "#25B7D3", padding: "20px", borderRadius: "20px" }}>
          <h2 className="g-4 text-center" style={{ color: "white", fontWeight: "bold", fontSize: "25px" }}>Jadwal Kegiatan Anda</h2>
          {jadwalKegiatan.length > 0 && (
            <section style={{ fontSize: "20px", backgroundColor: "#25B7D329", color: "white", fontWeight: "bold", padding: "10px", marginBottom: "10px" }}>
              {jadwalKegiatan.map((kegiatan, index) => (
                <Card.Body key={index}>
                  <p><strong style={{ fontSize: "20px", backgroundColor: "#25B7D329", color: "white", fontWeight: "bold" }}>Tanggal&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;</strong> {kegiatan.tanggal}</p>
                  <p><strong style={{ fontSize: "20px", backgroundColor: "#25B7D329", color: "white", fontWeight: "bold" }}>Jenis Kegiatan&nbsp;:&nbsp;&nbsp;</strong> {kegiatan.jenis_kegiatan}</p>
                  <p><strong style={{ fontSize: "20px", backgroundColor: "#25B7D329", color: "white", fontWeight: "bold" }}>Catatan&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;</strong> {kegiatan.catatan}</p>
                </Card.Body>
              ))}
            </section>
          )}
        </Container>
      </Container>
      <br /><br /><br /><br />
      <Footer />
    </>
  );
};

export default JadwalKegiatan;
