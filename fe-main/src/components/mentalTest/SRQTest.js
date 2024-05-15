import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Button, Col } from 'react-bootstrap';
import Navbar from '../landing/Navbar';
import Footer from '../landing/Footer';
import { useHistory } from 'react-router-dom'; // Import useHistory untuk navigasi

const KuisionerPage = () => {
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
  const history = useHistory(); // Inisialisasi useHistory


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
    // Cek apakah semua jawaban sudah terisi
    const isAllAnswered = answers.every(answer => answer !== null);

    if (!isAllAnswered) {
      alert('Masih ada jawaban yang kosong. Silakan isi semua jawaban sebelum submit!');
      return;
    }

    // Tampilkan alert konfirmasi
    const confirmSubmit = window.confirm('Apakah Anda yakin ingin mengirim jawaban?');

    if (!confirmSubmit) {
      return;
    }

    try {
      setIsSubmitting(true);

      // Lakukan pengiriman data jawaban ke backend
      await axios.post('http://localhost:8080/api/jawaban-srq', {
        id_partisipan: idPartisipan,
        jawaban: answers
      });
      console.log('Jawaban berhasil dikirim:', answers);
      history.push('/hasil-klasifikasi-srq');
    } catch (error) {
      console.error('Error submitting answers:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleRunPython = async () => {
    try {
      setIsSubmitting(true);

      // Panggil API Python untuk menjalankan klasifikasi
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
      <Navbar />
      <section id="psikolog-list" className="section before-content" style={{ backgroundColor: "#C4EAF4", color: "#141313", fontFamily: "Abril Fatface", marginTop: "-140px", paddingTop: "200px" }}>
        <Col md={16} className="d-flex align-items-center justify-content-center">
          <div className="container text-center">
            <h6 className="section-title mb-2 tfonts">Tes SRQ</h6>
          </div>
        </Col>
      </section>
      <br />
      <Container>
        {questions.map((question, index) => (
          <div key={index} style={{ marginBottom: '20px' }}>
            <p style={{ fontSize: '25px' }}>{index + 1}. {question}</p>
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
          <Button style={{
            borderRadius:"50px",
            backgroundColor: "#25B7D3",
            color: "white",
            fontWeight: "bold",
            padding: '12px 25px', // Atur padding untuk mengatur ukuran tombol
            fontSize: '20px' // Atur ukuran font jika diperlukan
          }}
            variant="light" onClick={handleSubmit} disabled={isSubmitting}>Submit Jawaban</Button>
          {/* <Button onClick={handleRunPython} disabled={isSubmitting} style={{ marginLeft: '10px' }}>Jalankan Klasifikasi</Button> */}
        </div>
      </Container>
      <br /><br /><br />
      <Footer />
    </>
  );
};

export default KuisionerPage;
