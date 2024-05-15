import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Button, Col } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

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
      <section id="psikolog-list" className="section before-content" style={{ backgroundColor: "#C4EAF4", color: "#141313", fontFamily: "Abril Fatface", marginTop: "-140px", paddingTop: "200px" }}>
        <Col md={16} className="d-flex align-items-center justify-content-center">
          <div className="container text-center">
            <h6 className="section-title mb-2 tfonts">DASS-42 <br/>Depresi</h6>
          </div>
        </Col>
      </section>
      <br />
            <Container>
       
        {questions.map((question, index) => (
          <div key={index} style={{ marginBottom: '20px' }}>
            <p style={{ fontSize: '25px' }}>{index + 1}. {question}</p>
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
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Button onClick={handleSubmit} disabled={isSubmitting}>Submit Jawaban</Button>
        </div>
      </Container>
      <br /><br /><br />
      <Footer />
    </>
  );
};

export default KuisionerPage;
