import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Form, Alert, Modal, Container, Card } from 'react-bootstrap';
import Navbar from '../../landing/Navbar.js';
import Footer from '../../landing/Footer.js';
import axios from 'axios';

const FormPage = () => {
  const [intervention, setIntervention] = useState({});
  const [userAnswer, setUserAnswer] = useState('');
  const [submittedDate, setSubmittedDate] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchIntervention();
  }, [id]);

  const fetchIntervention = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/intervensi/${id}`);
      if (response.ok) {
        const data = await response.json();
        setIntervention(data);
        displaySubmittedAnswer();
      } else {
        console.error('Gagal memuat data intervensi');
      }
    } catch (error) {
      console.error('Terjadi kesalahan:', error);
    }
  };

  const handleChange = (event) => {
    setUserAnswer(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const idPartisipan = localStorage.getItem('partisipan_id');
      const response = await fetch('http://localhost:8080/api/jawaban-intervensi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id_intervensi: id, id_partisipan: idPartisipan, respon: userAnswer })
      });
      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        console.log('Jawaban berhasil dikirim ke database');
        setSubmittedDate(new Date().toISOString().slice(0, 10));
        setIsAnswerSubmitted(true);
        showNotification('Intervensi Hari Ini', 'Jawaban Anda berhasil disimpan');
      } else if (response.status === 400) {
        const errorData = await response.json();
        console.error(errorData.message);
        setErrorMessage(errorData.message);
      } else if (response.status === 300) {
        console.error('Hari ini tidak bisa mengisi, kembali lagi besok');
        showNotification('Tidak Bisa Mengisi', 'Maaf hari ini tidak bisa mengisi, kembali lagi besok');
      } else {
        console.error('Terjadi kesalahan:', response.status);
      }
    } catch (error) {
      console.error('Terjadi kesalahan:', error);
    }
  };

  const displaySubmittedAnswer = async () => {
    const idPartisipan = localStorage.getItem('partisipan_id');
    try {
      const response = await fetch(`http://localhost:8080/api/jawaban-intervensi/${idPartisipan}`);
      if (response.ok) {
        const data = await response.json();
        const submittedAnswer = data.find(answer => answer.id_intervensi === id);
        if (submittedAnswer) {
          setUserAnswer(submittedAnswer.respon);
          setIsAnswerSubmitted(true);
        }
      } else {
        console.error('Gagal memuat jawaban yang sudah disubmit');
      }
    } catch (error) {
      console.error('Terjadi kesalahan:', error);
    }
  };

  const showNotification = (title, body) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, { body });
    } else if ('Notification' in window && Notification.permission !== 'denied') {
      Notification.requestPermission().then(function (permission) {
        if (permission === 'granted') {
          new Notification(title, { body });
        }
      });
    }
  };

  const handleCloseModal = () => setShowModal(false);

  useEffect(() => {
    if (intervention.id_intervensi === 30 && isAnswerSubmitted) {
      setShowModal(true);
    }
  }, [intervention, isAnswerSubmitted]);

  return (
    <>
      <Navbar />
      <div style={{ marginTop: "150px" }}>
        <Container >
          {intervention && (
            <div className="text-center mb-6">
              <h5 style={{ fontSize: "40px" }}>{intervention.deskripsi_challenge}</h5>
            </div>
          )}
          <Card className="mb-4" style={{ borderRadius: "25px", backgroundColor: "#25B7D3", color: "white" }}>
            <Card.Body>
              <Form.Group controlId="userAnswer">
                <Form.Control
                  as="textarea"
                  rows={6}
                  value={userAnswer}
                  onChange={handleChange}
                  placeholder="Masukkan jawaban Anda di sini"
                  style={{ minHeight: '150px', fontSize: '20px' }}
                  readOnly={isAnswerSubmitted} // Text area is read-only if the answer is submitted
                />
              </Form.Group>
              <br />
              {!isAnswerSubmitted && (
                <Button
                  variant="light"
                  onClick={handleSubmit}
                  disabled={isAnswerSubmitted} // Button is disabled if the answer is submitted
                >
                  {isAnswerSubmitted ? "Jawaban Sudah Disimpan" : "Submit"}
                </Button>
              )}
            </Card.Body>
          </Card>
        </Container>
      </div>

      {/* Modal for completing intervention */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Congratulations!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Selamat kamu telah menyelesaikan challenge intervensi 30 Days Writing Challenge. Yuk ikuti post test agar tau hasil evaluasi kamu.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" href="/post-test">
            Go to Post Test
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default FormPage;
