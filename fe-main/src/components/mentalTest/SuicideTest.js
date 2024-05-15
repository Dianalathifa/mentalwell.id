import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Button, Col } from 'react-bootstrap';
import Navbar from '../landing/Navbar';
import Footer from '../landing/Footer';
import { useHistory } from 'react-router-dom'; // Import useHistory

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
    <section id="psikolog-list" className="section before-content" style={{ backgroundColor: "#C4EAF4", color: "#141313", fontFamily: "Abril Fatface", marginTop: "-140px", paddingTop: "200px" }}>
        <Col md={16} className="d-flex align-items-center justify-content-center">
          <div className="container text-center">
            <h6 className="section-title mb-2 tfonts">Suicide Test</h6>
          </div>
        </Col>
      </section>
      <br />
      <Container>
    
      {questions.map((question, index) => (
        <div key={index} style={{ marginBottom: '20px' }}>
          <p style={{ fontSize: '25px' }}>{index + 1}. {question}</p>
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
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Button onClick={handleSubmit} disabled={isSubmitting}>Submit Jawaban</Button>
      </div>
    </Container>
    <br/><br/>
    <Footer />
    </>
  );
};

export default KuisionerPage;
