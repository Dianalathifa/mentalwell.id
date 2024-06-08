import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Button, Col, Card, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import "../style/Intervensi.css";
import Navbar from '../landing/Navbar';
import Footer from '../landing/Footer';

const KuisionerPage = () => {
  const [questions] = useState([
    "Apakah Anda tidak dapat melihat hal yang positif dari suatu kejadian?",
    "Apakah Anda merasa sepertinya tidak kuat lagi untuk melakukan suatu kegiatan",
    "Apakah Anda pesimis akan suatu hal yang akan terjadi?",
    "Apakah Anda merasa mudah sedih dan depresi?",
    "Apakah Anda merasa kehilangan minat pada banyak hal (misal: makan,ambulasi, sosialisasi)?",
    "Apakah Anda merasa diri tidak layak?",
    "Apakah Anda merasa hidup tidak berharga?",
    "Apakah Anda merasa tidak dapat menikmati hal-hal yang biasa anda lakukan?",
    "Apakah Anda merasa hilang harapan dan putus asa?",
    "Apakah Anda kesulitan untuk antusias pada banyak hal?",
    "Apakah Anda merasa tidak berharga?",
    "Apakah Anda merasa tidak ada harapan untuk masa depan",
    "Apakah Anda merasa hidup anda tidak berarti?",
    "Apakah Anda kesulitan untuk meningkatkan inisiatif dalam melakukan sesuatu?"
  ]);

  const [answers, setAnswers] = useState(new Array(questions.length).fill(null));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [idPartisipan, setIdPartisipan] = useState(null);

  const history = useHistory();

  useEffect(() => {
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
      
      const response = await axios.post('http://localhost:8080/api/dass-depresi', {
        id_partisipan: idPartisipan,
        jawaban: answers
      });
  
      console.log('Response:', response.data);

      history.push('/hasil-klasifikasi-dass-depresi');
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
            <h6 className="section-title mb-2 tfonts" style={{color:"#25B7D3", marginBottom:"20px"}}>DASS-42 Depresi</h6>
          </div>
          <Col md={10}>
                        <Card className="about-us-card" style={{ backgroundColor: "#FFD2DD"}}>
                            <Card.Body>
                                <h5 style={{ fontSize: "20px", color:"#25B7D3", fontWeight:"bold" }}>Petunjuk Tes :<br></br></h5>
                                <p style={{ fontSize: "16px" }}><br></br>1. Metode: diisi sendiri (rahasia).<br></br>
                                2. Jawablah semua pertanyaan sesuai dengan kondisi saat ini yang anda alami atau rasakan selama 7 hari terakhir.
                                <br></br>3. Setiap pertanyaan memiliki skala jawaban dari 0 hingga 3.
                                <br></br>4. Pilihlah jawaban yang paling sesuai dengan kondisi Anda dalam 7 hari terakhir.
                                <br></br>5. Setelah selesai menjawab semua pertanyaan, klik Lihat Hasil Tes untuk melihat hasilnya.
                                <br></br>&nbsp;&nbsp;&nbsp;&nbsp;Selamat Mengerjakan!
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
            <br/>
            <div>
              <Button
                variant={answers[index] === 0 ? 'primary' : 'outline-primary'}
                onClick={() => handleAnswer(index, 0)}
                disabled={isSubmitting}
                style={{ marginLeft: '15px', borderRadius: '20px'  }}
              >
                Tidak Sesuai
              </Button>
              <Button
                variant={answers[index] === 1 ? 'primary' : 'outline-primary'}
                onClick={() => handleAnswer(index, 1)}
                disabled={isSubmitting}
                style={{ marginLeft: '10px', borderRadius: '20px' }}
              >
                Kadang-kadang
              </Button>
              <Button
                variant={answers[index] === 2 ? 'primary' : 'outline-primary'}
                onClick={() => handleAnswer(index, 2)}
                disabled={isSubmitting}
                style={{ marginLeft: '10px', borderRadius: '20px' }}
              >
                Lumayan Sering
              </Button>
              <Button
                variant={answers[index] === 3 ? 'primary' : 'outline-primary'}
                onClick={() => handleAnswer(index, 3)}
                disabled={isSubmitting}
                style={{ marginLeft: '10px', borderRadius: '20px' }}
              >
                Sangat Sesuai atau Hampir Setiap Saat
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
      <br /><br /><br />
      <Footer />
    </>
  );
};

export default KuisionerPage;
