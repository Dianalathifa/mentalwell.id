import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Form, Button, Row, Col, Card } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Navbar from '../../landing/Navbar.js';
import Footer from '../../landing/Footer.js';
import olahraga from '../../images/activityTerapi/olahraga.png';
import joging from '../../images/activityTerapi/joging.png';
import renang from '../../images/activityTerapi/renang.png';
import fitness from '../../images/activityTerapi/fitness.png';
import badminton from '../../images/activityTerapi/badminton.png';
import basket from '../../images/activityTerapi/basket.png';
import tennis from '../../images/activityTerapi/tennis.png';
import biliard from '../../images/activityTerapi/bilyard.png';
import taekwondo from '../../images/activityTerapi/twkn.png';
import zumba from '../../images/activityTerapi/zumba.png';

const JenisOlahraga = ["Jogging/Lari", "Renang", "Bulu Tangkis", "Basket", "Fitness", "Tenis", "Biliar", "Taekwondo", "Zumba"];
const GambarOlahraga = [joging, renang, badminton, basket, fitness, tennis, biliard, taekwondo, zumba];
const DurasiOlahraga = ["30 menit", "45 menit", "1 jam", "2 jam"];

const JadwalOlahraga = () => {
  const [formDatas, setFormDatas] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [jadwalOlahraga, setJadwalOlahraga] = useState([]);

  const id_partisipan = localStorage.getItem("partisipan_id");

  useEffect(() => {
    fetchData();
  }, [id_partisipan]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/jadwal-olahraga/${id_partisipan}`);
      setJadwalOlahraga(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const newData = [...formDatas];
    newData[index] = { ...newData[index], [name]: value };
    setFormDatas(newData);
  };

  const handleSubmit = async (jenisOlahraga, index) => {
    try {
      const response = await axios.post("http://localhost:8080/api/jadwal-olahraga", {
        ...formDatas[index],
        jenis_olahraga: jenisOlahraga,
        id_partisipan: id_partisipan
      });
      setMessage(response.data.message);
      const newFormDatas = [...formDatas];
      newFormDatas[index] = {};
      setFormDatas(newFormDatas);
      setError("");
      fetchData();
    } catch (error) {
      setError("Gagal menambah jadwal olahraga");
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
              <h6 className="subtitle" style={{ fontSize: "40px", fontWeight: "bold", color: "white" }}>Jadwal Olahraga Teratur</h6>
            </div>
          </Col>
          <br /><br /><br />
          <div className="container text-center">
            <img src={olahraga} style={{ width: "700px", height: "auto", maxWidth: "100%", maxHeight: "100%" }} alt="olahraga" />
          </div>
        </div>
      </section>

      <Container className="mt-5">
        <Col md={16} className="d-flex align-items-center justify-content">
          <div className="container text-center">
            <p style={{ fontSize: "19px", fontWeight: "bold", color: "#25B7D3" }}>
              "Jaga kesehatan fisikmu dengan mengatur jadwal olahraga yang teratur!  Yuk, mulailah dengan merencanakan aktivitas fisikmu sekarang! Dengan  memiliki jadwal latihan yang teratur, kamu bisa merasakan manfaatnya  dalam meningkatkan kebugaran, vitalitas, dan kesehatan fisik secara  keseluruhan. Tidak hanya itu, dalam fitur ini, kamu juga bisa melacak  aktivitas olahragamu dari hari ke hari dan memperbaiki kualitasnya. Jangan biarkan kegiatan fisikmu terabaikan, mari prioritaskan latihan  yang konsisten untuk kesejahteraan jangka panjang. Mulai hari ini,  jadwalkan olahraga sehatmu dan rasakan perbedaannya!"
            </p>
          </div>
        </Col>
        <br /><br /><br />
      </Container>

      <Container className="mt-5">
        <Row xs={1} md={4} className="g-4 justify-content-center">
          {JenisOlahraga.map((jenis, index) => (
            <Card key={index} style={{ borderRadius: "20px", fontWeight: "bold", fontSize: "20px", height: "700px", width: "500px", backgroundColor: "#25B7D329", color: "#25B7D3", margin: "20px" }}>
              <Card.Header>{jenis}</Card.Header>
              <Card.Img variant="top" src={GambarOlahraga[index]} style={{ height: "200px", objectFit: "cover", borderRadius: "20px 20px 0 0" }} />
              <Card.Body>
                <Form onSubmit={(e) => { e.preventDefault(); handleSubmit(jenis, index); }}>
                  <Form.Group controlId={`formTanggal_${index}`}>
                    <Form.Label>Tanggal</Form.Label>
                    <Form.Control
                      type="date"
                      name="tanggal"
                      value={formDatas[index]?.tanggal || ""}
                      onChange={(e) => handleChange(e, index)}
                    /><br />
                  </Form.Group>
                  <Form.Group controlId={`formDurasi_${index}`}>
                    <Form.Label>Durasi</Form.Label>
                    <Form.Control
                      as="select"
                      name="durasi"
                      value={formDatas[index]?.durasi || ""}
                      onChange={(e) => handleChange(e, index)}
                    >
                      <option value="">Pilih Durasi</option>
                      {DurasiOlahraga.map((durasi, durasiIndex) => (
                        <option key={durasiIndex} value={durasi}>{durasi}</option>
                      ))}
                    </Form.Control>
                  </Form.Group><br />
                  <Form.Group controlId={`formCatatan_${index}`}>
                    <Form.Label>Catatan</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="catatan"
                      value={formDatas[index]?.catatan || ""}
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
          <h2 className="g-4 text-center" style={{ color: "white", fontWeight: "bold", fontSize: "25px" }}>Jadwal Olahraga Anda</h2>
          {jadwalOlahraga.length > 0 && (
            <section style={{ fontSize: "20px", backgroundColor: "#25B7D329", color: "white", fontWeight: "bold", padding: "10px", marginBottom: "10px" }}>
              <Card.Body >
                <p><strong style={{ fontSize: "20px", backgroundColor: "#25B7D329", color: "white", fontWeight: "bold" }}>Tanggal&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;</strong> {jadwalOlahraga[jadwalOlahraga.length - 1].tanggal}</p>
                <p><strong style={{ fontSize: "20px", backgroundColor: "#25B7D329", color: "white", fontWeight: "bold" }}>Jenis Olahraga&nbsp;:&nbsp;&nbsp;</strong> {jadwalOlahraga[jadwalOlahraga.length - 1].jenis_olahraga}</p>
                <p><strong style={{ fontSize: "20px", backgroundColor: "#25B7D329", color: "white", fontWeight: "bold" }}>Durasi&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;</strong> {jadwalOlahraga[jadwalOlahraga.length - 1].durasi}</p>
                <p><strong style={{ fontSize: "20px", backgroundColor: "#25B7D329", color: "white", fontWeight: "bold" }}>Catatan&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;</strong> {jadwalOlahraga[jadwalOlahraga.length - 1].catatan}</p>
              </Card.Body>
            </section>
          )}
        </Container>


      </Container>
      <br /><br /><br /><br />
      <Footer />
    </>
  );
};

export default JadwalOlahraga;
