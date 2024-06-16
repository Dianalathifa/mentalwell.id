import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Form, Modal, Container, Card } from 'react-bootstrap';
import Navbar from '../../landing/Navbar.js';
import Footer from '../../landing/Footer.js';

const FormPage = () => {
  const [intervention, setIntervention] = useState({});
  const [userAnswer, setUserAnswer] = useState('');
  const [submittedDate, setSubmittedDate] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [quote, setQuote] = useState('');
  const [specialQuote, setSpecialQuote] = useState('');
  const [showQuoteModal, setShowQuoteModal] = useState(false);

  useEffect(() => {
    fetchIntervention();
  }, [id]);

  useEffect(() => {
    if (isAnswerSubmitted) {
      if (intervention.id_intervensi === '30') {
        fetchSpecialQuote();
        setShowModal(true); // Show modal immediately when day 30 is submitted
      } else {
        setQuote(getRandomQuote());
        setShowQuoteModal(true); // Show quote modal
      }
    }
  }, [isAnswerSubmitted]);

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
  
        // Show modal with additional information
        setShowModal(true);
        
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

  const getRandomQuote = () => {
    const quotes = [
          "Menulis setiap hari, hatimu jadi lega,  Teruslah berusaha, stres akan sirna jua.",
    "Kapal berlayar di laut biru, Terus menulis, hati pun tak pilu.",
    "Mentari pagi menyinari desa, Tulisanmu hari ini sungguh luar biasa!",
    "Bunga mawar harum semerbak, Teruslah menulis, semangatmu takkan retak.",
    "Ikan berenang di dalam kolam, Dengan menulis, stres jadi hilang.",
    "Angin sepoi berhembus manja, Setiap kata yang ditulis, membawa bahagia.",
    "Langit biru cerah menawan, Tulisanmu hari ini sangat menakjubkan!",
    "Burung berkicau di pagi hari, Menulis dengan hati, membuatmu berseri.",
    "Pohon rindang di tepi jalan, Setiap tulisanmu, menjadi harapan.",
    "Pantai indah di senja hari, Dengan menulis, stres pun pergi.",
    "Bintang gemerlap di langit malam, Menulis setiap hari, hatimu jadi tentram.",
    "Awan putih berarak perlahan, Teruslah menulis, jangan pernah bosan.",
    "Hujan turun membasahi bumi, Setiap tulisanmu, membawa damai di hati.",
    "Pagi cerah tanpa mendung, Menulis setiap hari, hatimu jadi tenang.",
    "Burung pipit terbang riang, Terus menulis, semangatmu kian terang.",    
    "Padi menguning di sawah luas, Setiap kata yang kau tulis, membawa keikhlasan.",
    "Senja indah di ufuk barat, Menulis setiap hari, stres pun terangkat.",
    "Nelayan melaut di pagi hari, Tulisanmu hari ini sangat menginspirasi!",
    "Embun pagi menyegarkan bunga, Menulis dengan hati, membawa ketenangan jiwa.",
    "Rembulan terang di malam hening, Setiap tulisanmu, membawa ketenangan yang menenangkan.",
    "Pohon tinggi menjulang ke langit, Menulis setiap hari, membuatmu semakin kuat.",
    "Kupu-kupu hinggap di bunga, Tulisanmu hari ini penuh warna dan makna.",
    "Rawa-rawa dengan pepohonan hijau, Terus menulis, stres akan menjauh.",
    "Bukit hijau di kala sore, Menulis setiap hari, hatimu jadi sejuk dan segar.",
    "Kicau burung di pagi yang damai, Tulisanmu hari ini sangat menenangkan hati.",
    "Ombak kecil di pantai berdesir, Terus menulis, semangatmu terus mengalir.",
    "Ladang luas menghijau sejuk, Menulis dengan hati, hidup jadi penuh berkah.",
    "Bunga mekar di taman indah, Setiap tulisanmu, membawa semangat yang melimpah.",
    "Matahari terbit di pagi cerah, Teruslah menulis, semangatmu takkan pernah goyah",
    ];
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  };

  const fetchSpecialQuote = () => {
    const specialQuotes = [
      "Terima kasih telah mengikuti writing challenge ini, Setiap tulisanmu membawa kedamaian dan inspirasi. Tetap semangat, kamu hebat! Teruslah menulis, Stres akan pergi, kedamaian akan datang mengiringi."
    ];
    const randomIndex = Math.floor(Math.random() * specialQuotes.length);
    setSpecialQuote(specialQuotes[randomIndex]);
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

  const handleCloseModal = () => {
    setShowModal(false);
    setShowQuoteModal(false); // Close quote modal if open
  };

  return (
    <>
      <Navbar />
      <div style={{ marginTop: "150px" }}>
        <Container>
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

      <Modal show={showQuoteModal} onHide={() => setShowQuoteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Motivasi untukmu hari ini</Modal.Title>
        </Modal.Header>
        <Modal.Body>{quote}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowQuoteModal(false)}>
            Tutup
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for completing intervention */}
      <Modal show={showModal} onHide={handleCloseModal}centered backdrop keyboard={false} style={{ zIndex: 1050 }}>
        <Modal.Header closeButton>
          <Modal.Title>{intervention.id_intervensi === '30' ? "Congratulations!" : "Success!"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {intervention.id_intervensi === '30' ? (
            <>
              Selamat kamu telah menyelesaikan challenge intervensi 30 Days Writing Challenge. Yuk ikuti post test agar tau hasil evaluasi kamu.
              <br />
              <strong>{specialQuote}</strong>
            </>
          ) : (
            <>
              Jawaban Anda berhasil disimpan.
              <br />
              Ada pantun untukmu nih: <strong>{quote}</strong>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          {intervention.id_intervensi === '30' && (
            <Button variant="primary" href="/post-test">
              Go to Post Test
            </Button>
          )}
        </Modal.Footer>
      </Modal>

      <Footer />
    </>
  );
};

export default FormPage;
