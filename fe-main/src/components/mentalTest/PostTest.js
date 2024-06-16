import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Button, Col, Row, Card } from 'react-bootstrap';
import Navbar from '../landing/Navbar';
import Footer from '../landing/Footer';
import { useHistory } from 'react-router-dom';
import "../style/Intervensi.css";


const PostTestSRQPage = () => {
  const [questions] = useState([
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

      await axios.post('http://localhost:8080/save-answer', {
        id_partisipan: idPartisipan,
        jawaban: answers
      });
      console.log('Jawaban berhasil dikirim:', answers);

      history.push('/hasil-post-test');
    } catch (error) {
      console.error('Error submitting answers:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
     
      <section id="psikolog-list" className="section before-content" style={{ color: "#25B7D3",  marginTop: "110px" }}>
        <Col md={20} className="d-flex align-items-center justify-content-center">
          <div className="container text-center">
            <h6 className="section-title mb-2 tfonts">Post-Test SRQ</h6>
          </div>
        </Col>
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
      </section>
      <br />
      <Container style={{marginLeft:"200px"}}>
        {questions.map((question, index) => (
          <div key={index} style={{ marginBottom: '20px' }}>
            <p style={{ fontSize: '18px' }}>{index + 1}. {question}</p>
            <div>
              <br />
              <Button
                variant={answers[index] === 1 ? 'primary' : 'outline-primary'}
                onClick={() => handleAnswer(index, 1)}
                disabled={isSubmitting}
                style={{ marginLeft: '26px', width: '150px', borderRadius: '20px' }}
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
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Button
            variant="light"
            className="custom-button"
            style={{
              borderRadius: "50px",
              fontWeight: "bold",
              padding: '15px 25px',
              fontSize: '17px',
              marginRight:'200px'
            }}
            onClick={handleSubmit}
            disabled={isSubmitting}>
            {isSubmitting ? 'Menyimpan Jawaban...' : 'Submit Jawaban'}
          </Button>
        </div>
      </Container>
      <br /><br /><br />
      <Footer />
    </>
  );
};

export default PostTestSRQPage;
