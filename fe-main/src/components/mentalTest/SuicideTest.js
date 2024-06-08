import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Button, Col, Card, Row } from 'react-bootstrap';
import Navbar from '../landing/Navbar';
import Footer from '../landing/Footer';
import { useHistory } from 'react-router-dom'; // Import useHistory
import "../style/Intervensi.css";


const KuisionerPage = () => {
  const [questions] = useState([
    "S-ex : laki-laki",
    "A-ge : kurang dari 19 tahun atau lebih dari 45 tahun",
    "D-epression : pasien MRS dengan depresi atau penurunan konsentrasi, gangguan tidur, gangguan pola makan, dan/atau gangguan libido",
    "P-revious suicide : ada riwayat percobaan bunuh diri atau perawatan psikiatri",
    "E-xcessive alcohol : ketergantungan alkohol atau pemakai narkoba",
    "R-ational thinking loss : kehilangan pikiran rasional : psikosis, organic brain syndrome",
    "S-eparated : bercerai atau janda",
    "O-rganized plan : menunjukkan rencana bunuh diri yang terorganisasi atau niat yang serius",
    "N-o social support : tidak ada pendukung",
    "S-ickness : menderita penyakit kronis"
  ]);

  const [answers, setAnswers] = useState(new Array(questions.length).fill(null));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [idPartisipan, setIdPartisipan] = useState(null);
  const history = useHistory(); // Initialize useHistory

  useEffect(() => {
    // Ambil id_partisipan dari localStorage
    const partisipanId = localStorage.getItem('partisipan_id');
    setIdPartisipan(partisipanId);
  }, []);

  const handleAnswer = (index, answer) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = answer;
    setAnswers(updatedAnswers);
  };

  const handleSubmit = async () => {
    const isAllAnswered = answers.every(answer => answer !== null);

    if (!isAllAnswered) {
      alert('Masih ada jawaban yang kosong. Silakan isi semua jawaban sebelum submit!');
      return;
    }

    const confirmSubmit = window.confirm('Apakah Anda yakin ingin mengirim jawaban?');

    if (!confirmSubmit) {
      return;
    }

    try {
      setIsSubmitting(true);
      
      // Lakukan pengiriman data jawaban ke backend
      const response = await axios.post('http://localhost:8080/api/suicide', {
        id_partisipan: idPartisipan,
        jawaban: answers
      });
      history.push('/hasil-test-suicide');
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error submitting answers:', error.response.data);
    } finally {
      setIsSubmitting(false);
    }
  };
  

  return (
    <>
    <Navbar />
    <section id="psikolog-list" className="section before-content" style={{ color: "#141313", paddingTop: "100px" }}>
        <Col md={16} className="d-flex align-items-center justify-content-center">
        <Container className="my-6">
        <Row className="justify-content-center">
          <div className="container text-center">
            <h6 className="section-title mb-2 tfonts" style={{color:"#25B7D3", marginBottom:"20px"}}>Tes Suicide</h6>
          </div>
          <Col md={10}>
                        <Card className="about-us-card" style={{ backgroundColor: "#FFD2DD"}}>
                            <Card.Body>
                            <h5 style={{ fontSize: "20px", color:"#25B7D3", fontWeight: "bold" }}>Petunjuk Pengisian :</h5><br></br>
                            <p style={{ fontSize: "16px" }}>
                              1. Dapat dijawab oleh petugas/keluarga/teman atau user yang mengerti dengan pertanyaan yang tertera pada kuisioner &nbsp;&nbsp;&nbsp;&nbsp;dibawah ini.
                              <br />
                              2. Jawablah semua pertanyaan sesuai dengan kondisi saat ini yang anda alami atau rasakan.
                              <br />
                              3. Setiap jawaban yang dijawab akan mendapatkan skor.
                              <br />
                              4. Hasil dari penilaian akan digunakan sebagai dasar untuk menentukan langkah-langkah intervensi atau tindakan lebih lanjut.
                              &nbsp;&nbsp;&nbsp;&nbsp;Selamat Mengerjakan!
                            </p>
                            </Card.Body>
                        </Card>
                    </Col>
                    </Row>
      </Container>
        </Col>
      </section>

      <Container style={{marginLeft:"200px"}}>    
      {questions.map((question, index) => (
        <div key={index} style={{ marginBottom: '20px' }}>
          <p style={{ fontSize: '20px' }}>{index + 1}. {question}</p>
          <div>
            <br/>
          <Button
              variant={answers[index] === 1 ? 'primary' : 'outline-primary'}
              onClick={() => handleAnswer(index, 1)}
              disabled={isSubmitting}
              style={{ marginLeft: '15px', width: '150px', borderRadius: '20px' }}
            >
              YA
            </Button>
            <Button
              variant={answers[index] === 0 ? 'danger' : 'outline-danger'}
              onClick={() => handleAnswer(index, 0)}
              disabled={isSubmitting}
              style={{ marginLeft: '10px', width: '150px', borderRadius: '20px' }}
            >
              TIDAK
            </Button>
            
          </div>
        </div>
      ))}
      <br/>
      <div style={{ marginLeft:"350px", marginTop: '60px', marginBottom:"60px" }}>
          <Button 
          variant="light"
          className="custom-button" // Tambahkan kelas custom-button di sini
          style={{
            borderRadius: "50px",
            fontWeight: "bold",
            padding: '15px 25px', // Atur padding untuk mengatur ukuran tombol
            fontSize: '17px'}} 
            onClick={handleSubmit} disabled={isSubmitting}>Submit Jawaban</Button>
      </div>
    </Container>
    <br/><br/>
    <Footer />
    </>
  );
};

export default KuisionerPage;
