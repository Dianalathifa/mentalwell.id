import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Col, Card, Button, Form } from "react-bootstrap";
import Navbar from '../../landing/Navbar.js';
import Footer from '../../landing/Footer.js';
import makan from '../../images/activityTerapi/makan.jpg';


const PolaMakan = () => {
  const [makanan, setMakanan] = useState([]);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    tanggal: "",
    jenis_makanan: "",
    deskripsi_makanan: "",
    kalori: "",
    karbohidrat: "",
    protein: "",
    lemak: "",
    keterangan_tambahan: ""
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const partisipanId = localStorage.getItem("partisipan_id");
    try {
      const response = await axios.get(`http://localhost:8080/api/pola-makan/${partisipanId}`);
      setMakanan(response.data);
      setError(null);
    } catch (error) {
      setError("Gagal mengambil data pola makanan");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const partisipanId = localStorage.getItem("partisipan_id");
    try {
      const response = await axios.post(`http://localhost:8080/api/pola-makan`, { ...formData, id_partisipan: partisipanId });
      setMakanan([...makanan, response.data]);
      setFormData({
        tanggal: "",
        jenis_makanan: "",
        deskripsi_makanan: "",
        kalori: "",
        karbohidrat: "",
        protein: "",
        lemak: "",
        keterangan_tambahan: ""
      });
      setError(null);
    } catch (error) {
      setError("Gagal menambah pola makanan");
    }
  };

  return (
    <>
    <Navbar/>
    
    <section className="section before-content" style={{ backgroundColor: "#25B7D3", color: "#141313", marginTop: "-10px", paddingTop: "100px", paddingBottom: "-140px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "50%", left: 0, width: "100%", height: "50%", backgroundColor: "white", zIndex: 1 }}></div>
        <div style={{ position: "relative", zIndex: 2 }}>
          <Col md={16} className="d-flex align-items-center justify-content">
            <div className="container text-center">
              <h6 className="subtitle" style={{ fontSize: "60px", fontWeight: "bold", color: "white" }}>Pola Makan</h6>
            </div>
          </Col>
          <br /><br /><br />
          <div className="container text-center">
            <img src={makan} style={{ borderRadius:"60px", width: "700px", height: "500px", maxWidth: "100%", maxHeight: "100%" }} alt="kegiatan" />
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
    <Container className="mt-5"><br/><br/>
        {/* <Col md={16} className="d-flex align-items-center justify-content">
          <div className="container text-center">
            <h6 className="subtitle" style={{ fontSize: "45px", fontWeight:"bold", color:"#25B7D3"}}>Pola Makan</h6> 
          </div>
        </Col> */}
        <br/><br/>       
        </Container>
        <Card style={{ backgroundColor: "#e0ffff" }}>
        <Card.Body>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <h3 style={{ color: "#25B7D3", fontSize: "26px", fontWeight:"bold" }}>Daftar Pola Makan</h3><br/>
          {makanan.length === 0 && <p>Belum ada pola makanan yang tersedia.</p>}
          {makanan.length > 0 && (
            <table className="table" style={{ backgroundColor: "#e0ffff", border: "2px solid #25B7D3" }}>
              <thead style={{ backgroundColor: "#25B7D3", color: "#ffffff" }}>
                <tr>
                  <th>ID Partisipan</th>
                  <th>Tanggal</th>
                  <th>Jenis Makanan</th>
                  <th>Deskripsi Makanan</th>
                  <th>Kalori</th>
                  <th>Karbohidrat</th>
                  <th>Protein</th>
                  <th>Lemak</th>
                  <th>Keterangan Tambahan</th>
                </tr>
              </thead>
              <tbody>
                {makanan.map((makananItem, index) => (
                  <tr key={index}>
                    <td>{makananItem.id_partisipan}</td>
                    <td>{makananItem.tanggal}</td>
                    <td>{makananItem.jenis_makanan}</td>
                    <td>{makananItem.deskripsi_makanan}</td>
                    <td>{makananItem.kalori}</td>
                    <td>{makananItem.karbohidrat}</td>
                    <td>{makananItem.protein}</td>
                    <td>{makananItem.lemak}</td>
                    <td>{makananItem.keterangan_tambahan}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <hr />
          <h3 style={{ color: "#25B7D3", fontSize:"26px", fontWeight:"bold" }}>Tambah Pola Makan</h3><br/>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formTanggal">
              <Form.Label style={{ color: "#25B7D3", fontWeight:"bold"  }}>Tanggal</Form.Label>
              <Form.Control
                type="date"
                placeholder="Masukkan tanggal"
                name="tanggal"
                value={formData.tanggal}
                onChange={handleInputChange}
              />
            </Form.Group><br/>
            <Form.Group controlId="formJenisMakanan">
              <Form.Label style={{ color: "#25B7D3", fontWeight:"bold"  }}>Jenis Makanan</Form.Label>
              <Form.Control
                as="select"
                name="jenis_makanan"
                value={formData.jenis_makanan}
                onChange={handleInputChange}
              >
                <option value="">Pilih Jenis Makanan</option>
                <option value="sarapan">Sarapan</option>
                <option value="makan siang">Makan Siang</option>
                <option value="makan malam">Makan Malam</option>
                <option value="camilan">Camilan</option>
              </Form.Control>
            </Form.Group><br/>
            <Form.Group controlId="formDeskripsiMakanan">
              <Form.Label style={{ color: "#25B7D3", fontWeight:"bold"  }}>Deskripsi Makanan</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan deskripsi makanan"
                name="deskripsi_makanan"
                value={formData.deskripsi_makanan}
                onChange={handleInputChange}
              />
            </Form.Group><br/>
            <Form.Group controlId="formKalori">
              <Form.Label style={{ color: "#25B7D3", fontWeight:"bold"  }}>Kalori</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan kalori"
                name="kalori"
                value={formData.kalori}
                onChange={handleInputChange}
              />
            </Form.Group><br/>
            <Form.Group controlId="formKarbohidrat">
              <Form.Label style={{ color: "#25B7D3", fontWeight:"bold"  }}>Karbohidrat</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan karbohidrat"
                name="karbohidrat"
                value={formData.karbohidrat}
                onChange={handleInputChange}
              />
            </Form.Group><br/>
            <Form.Group controlId="formProtein">
              <Form.Label style={{ color: "#25B7D3", fontWeight:"bold"  }}>Protein</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan protein"
                name="protein"
                value={formData.protein}
                onChange={handleInputChange}
              />
            </Form.Group><br/>
            <Form.Group controlId="formLemak">
              <Form.Label style={{ color: "#25B7D3", fontWeight:"bold"  }}>Lemak</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan lemak"
                name="lemak"
                value={formData.lemak}
                onChange={handleInputChange}
              />
            </Form.Group><br/>
            <Form.Group controlId="formKeteranganTambahan">
              <Form.Label style={{ color: "#25B7D3", fontWeight:"bold"  }}>Keterangan Tambahan</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan keterangan tambahan"
                name="keterangan_tambahan"
                value={formData.keterangan_tambahan}
                onChange={handleInputChange}
              />
            </Form.Group><br/>
            <Button style={{ backgroundColor:"#25B7D3",color: "white", fontWeight:"bold"  }}variant="light" type="submit">
              Tambah Pola Makan
            </Button>
          </Form><br/>
        </Card.Body>
      </Card>
    </Container>
    <br/><br/><br/><br/>
    <Footer/>
    </>
  );
};

export default PolaMakan;
