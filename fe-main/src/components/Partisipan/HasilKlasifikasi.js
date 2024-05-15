import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Alert, Button, Table } from "react-bootstrap";
import { useHistory } from "react-router-dom"; // Import useHistory
import Navbar from "../landing/Navbar";
import Footer from "../landing/Footer";

const HasilKlasifikasi = () => {
  const [hasilKlasifikasi, setHasilKlasifikasi] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const history = useHistory(); // Initialize useHistory

  useEffect(() => {
    // Ambil ID partisipan dari local storage
    const partisipanId = localStorage.getItem('partisipan_id');

    // Lakukan permintaan untuk mengambil hasil klasifikasi berdasarkan ID partisipan
    const ambilHasilKlasifikasi = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/hasil-prediksi/${partisipanId}`);
        setHasilKlasifikasi(response.data);
      } catch (error) {
        console.error('Gagal mengambil hasil klasifikasi:', error);
        // Tampilkan pesan kesalahan kepada pengguna
      }
    };

    // Panggil fungsi untuk mengambil hasil klasifikasi
    ambilHasilKlasifikasi();
  }, []); // Dipanggil sekali setelah komponen dimuat

  // Fungsi untuk menangani navigasi ke tes DASS-42
  const handleNavigation = (url) => {
    history.push(url);
  };

  const handleRunPython = async () => {
    try {
      setIsSubmitting(true);
      
      await axios.post('http://localhost:5000/start-analysis');
      console.log('Klasifikasi di Python berhasil dimulai');
    } catch (error) {
      console.error('Error running Python classification:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
    <Navbar/>
    <Container className="mt-5">
    <Container style={{ backgroundColor: '#C4EAF4' }}>
  <div className="container text-center">
    <h3 style={{ fontSize: '25px' }} className="section-title mb-2">
      <br />
      Klik Button Untuk Tahu Hasil Tes!
      <br />
    </h3>        
    <br />
    <Button 
      variant="info" // Ubah variant menjadi "info" untuk warna tosca
      onClick={handleRunPython} 
      disabled={isSubmitting} 
      style={{ marginLeft: '10px' }}
    >
      Jalankan Klasifikasi
    </Button>
  </div>
  <br />
</Container>

      <div className="container text-center">
          <h6 className="section-title mb-2 tfonts">
            <br />
            Hasil Klasifikasi
            <br />
          </h6>
        </div>
        <Row>
        <Col>
          <Card>
            <Card.Body>
              {hasilKlasifikasi ? (
                <Table bordered striped responsive>
                  <tbody>
                    <tr>
                      <td><strong>Points:</strong></td>
                      <td>{hasilKlasifikasi.points}</td>
                    </tr>
                    <tr>
                      <td><strong>Mental Disorders:</strong></td>
                      <td>{hasilKlasifikasi.mental_disorders}</td>
                    </tr>
                    <tr>
                      <td><strong>Klasifikasi:</strong></td>
                      <td>{hasilKlasifikasi.klasifikasi}</td>
                    </tr>
                  </tbody>
                </Table>
              ) : (
                <p>Loading...</p>
              )}
              {hasilKlasifikasi && hasilKlasifikasi.mental_disorders === 1 && (
                <Alert variant="danger">
                  Anda telah teridentifikasi mengidap gangguan kesehatan mental. Mohon ikuti tes lanjutan ini!
                </Alert>
              )}
              {hasilKlasifikasi && (hasilKlasifikasi.klasifikasi === "Depresi" ||
                  hasilKlasifikasi.klasifikasi === "Cemas" ||
                  hasilKlasifikasi.klasifikasi === "Stres") && (
                <Button 
                  variant="primary" 
                  onClick={() => handleNavigation(`/dass42${hasilKlasifikasi.klasifikasi.toLowerCase()}-user`)}
                >
                  Lanjutkan ke tes DASS-42 ({hasilKlasifikasi.klasifikasi})
                </Button>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    
    <br />
    <br/>
    <Footer/>
    </>
   );
};

export default HasilKlasifikasi;
