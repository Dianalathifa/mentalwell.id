import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Button, Col, Modal, Card, Row } from 'react-bootstrap';
import Navbar from '../landing/Navbar';
import Footer from '../landing/Footer';
import { useHistory } from 'react-router-dom';
import { Element, scroller } from 'react-scroll';
import "../style/Intervensi.css";

const KuisionerPage = () => {
  const questions = [
    "Apakah Anda sering merasa sakit kepala?",
    "Apakah Anda kehilangan nafsu makan?",
    "Apakah tidur Anda tidak nyenyak?",
    "Apakah Anda mudah merasa takut?",
    "Apakah Anda merasa cemas, tegang, atau khawatir?",
    "Apakah tangan Anda gemetar?",
    "Apakah Anda mengalami gangguan pencernaan?",
    "Apakah Anda merasa sulit berpikir jernih?",
    "Apakah Anda merasa tidak bahagia?",
    "Apakah Anda lebih sering menangis?",
    "Apakah Anda merasa sulit untuk menikmati aktivitas sehari-hari?",
    "Apakah Anda merasa kesulitan untuk mengambil keputusan?",
    "Apakah aktivitas-tugas sehari-hari Anda terbengkalai?",
    "Apakah Anda merasa tidak mampu berperan dalam kehidupan ini?",
    "Apakah Anda kehilangan minat terhadap banyak hal?",
    "Apakah Anda merasa tidak berharga?",
    "Apakah Anda mempunyai pikiran untuk mengakhiri hidup Anda?",
    "Apakah Anda merasa lelah sepanjang waktu?",
    "Apakah Anda merasa tidak enak di perut?",
    "Apakah Anda mudah lelah?"
  ];

  const [answers, setAnswers] = useState(new Array(questions.length).fill(null));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [idPartisipan, setIdPartisipan] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const partisipanId = localStorage.getItem('partisipan_id');
    setIdPartisipan(partisipanId);
  }, []);

  const handleAnswer = (index, answer) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = answer;
    setAnswers(updatedAnswers);

    const nextSection = Math.floor((index + 1) / 10) * 10 + 1;
    if ((index + 1) % 10 === 0 && nextSection < questions.length) {
      scrollToSection(`section-${nextSection}`);
    }
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

      await axios.post('http://localhost:8080/api/jawaban-srq', {
        id_partisipan: idPartisipan,
        jawaban: answers
      });
      console.log('Jawaban berhasil dikirim:', answers);
      setShowModal(true);
    } catch (error) {
      console.error('Error submitting answers:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRunPython = async () => {
    try {
      setIsSubmitting(true);

      await axios.post('http://localhost:5000/start-analysis');
      console.log('Klasifikasi di Python berhasil dimulai');
      history.push('/hasil-klasifikasi-srq');
    } catch (error) {
      console.error('Error running Python classification:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseModal = () => setShowModal(false);

  const scrollToSection = (section) => {
    scroller.scrollTo(section, {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart'
    });
  };

  const renderQuestionsSection = (start, end) => (
    <Element name={`section-${start}`}>
      {questions.slice(start, end).map((question, index) => (
        <div key={start + index} style={{ marginBottom: '20px' }}>
          <p style={{ fontSize: '20px' }}>{start + index + 1}. {question}</p>
          <div>
            <Button
              variant={answers[start + index] === 1 ? 'primary' : 'outline-primary'}
              onClick={() => handleAnswer(start + index, 1)}
              disabled={isSubmitting}
              style={{ marginLeft: '26px', width: '150px', borderRadius: '20px' }}
            >
              YA
            </Button>
            <Button
              variant={answers[start + index] === 0 ? 'danger' : 'outline-danger'}
              onClick={() => handleAnswer(start + index, 0)}
              disabled={isSubmitting}
              style={{ marginLeft: '10px', width: '150px', borderRadius: '20px' }}
            >
              TIDAK
            </Button>
          </div>
        </div>
      ))}
    </Element>
  );

  return (
    <>
      <Navbar />
      <section id="psikolog-list" className="section before-content mt-5" style={{ color: "#141313",  marginTop: "50px" }}>
        <Col md={20} className="d-flex align-items-center justify-content-center">
          <Container className="my-6">
            <Row className="justify-content-center">
              <div className="container text-center">
                <h6 className="section-title mb-2 tfonts" style={{color:"#25B7D3", marginBottom:"30px"}}>Tes SRQ</h6>
              </div>
              <div style={{marginLeft:"240px"}}>
                <Col md={10}>
                  <Card className="about-us-card" style={{ backgroundColor: "#FFD2DD"}}>
                    <Card.Body>
                      <h5 style={{ fontSize: "20px", color:"#25B7D3", fontWeight:"bold" }}>Petunjuk Tes :<br></br></h5>
                      <p style={{ fontSize: "16px" }}>
                        <br></br>1. Metode : diisi sendiri (rahasia).
                        <br></br>2. Jawablah semua pertanyaan sesuai dengan kondisi saat ini yang anda alami atau rasakan selama 30 hari terakhir.
                        <br></br>3. Setiap jawaban yang dijawab akan mendapatkan skor.
                        <br></br>4. Semakin sesuai yang anda alami maka hasil tes ini akan semakin akurat dan benar.
                        <br></br>5. Pastikan semua pertanyaan sudah terjawab, dan jika sudah semua terjawab baru kemudian klik Lihat Hasil Test untuk memperoleh hasil test.
                        <br/>&nbsp;&nbsp;&nbsp;&nbsp;Selamat Mengerjakan!
                      </p>
                    </Card.Body>
                  </Card>
                </Col>
              </div>
            </Row>
          </Container>
        </Col>
      </section>
      <Container style={{marginLeft:"200px"}}>
        {renderQuestionsSection(0, 10)}
        {renderQuestionsSection(10, 20)}
        <div style={{ marginTop: '10px', marginBottom:"100px" }}>
          <Button
            variant="light"
            className="custom-button"
            style={{
              borderRadius: "50px",
              fontWeight: "bold",
              padding: '15px 25px',
              fontSize: '17px'
            }}
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            Submit Jawaban
          </Button>
        </div>
      </Container>
      <Footer />

      {/* Modal untuk Jalankan Klasifikasi */}
      <Modal show={showModal} onHide={handleCloseModal} centered backdrop keyboard={false} style={{ zIndex: 1050 }}>
        <Modal.Header closeButton>
          <Modal.Title>Jalankan Klasifikasi</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Apakah Anda ingin menjalankan klasifikasi sekarang?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Tutup</Button>
          <Button variant="primary" onClick={handleRunPython} disabled={isSubmitting}>
            Jalankan Klasifikasi
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default KuisionerPage;
