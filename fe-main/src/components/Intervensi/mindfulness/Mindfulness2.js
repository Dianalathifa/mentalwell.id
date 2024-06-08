import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Card, Button, Modal, Form } from "react-bootstrap";
import Navbar from '../../landing/Navbar.js';
import Footer from '../../landing/Footer.js';

const MindfulnessWeek2 = () => {
  const [error, setError] = useState(null);
  const [experience, setExperience] = useState('');
  const [completedStatus, setCompletedStatus] = useState(Array(7).fill(false));
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [quote, setQuote] = useState('');
  const [notification, setNotification] = useState('');

  const quotes = [
    "The mind is everything. What you think you become.",
    "Peace comes from within. Do not seek it without.",
    "Your calm mind is the ultimate weapon against your challenges.",
    "The quieter you become, the more you can hear.",
    "Mindfulness is the miracle by which we master and restore ourselves."
  ];

  useEffect(() => {
    const savedStatus = JSON.parse(localStorage.getItem('completedStatusWeek2'));
    if (savedStatus) {
      setCompletedStatus(savedStatus);
    }
  }, []);

  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  };

  const handleSaveDailyStatus = async (day) => {
    const idPartisipan = localStorage.getItem("partisipan_id");

    const currentDate = new Date().toISOString().split('T')[0];
    const todayEntry = localStorage.getItem('today_entry');

    if (todayEntry && todayEntry === currentDate) {
      setNotification("Maaf hari ini kamu sudah melakukan checklist progres intervensi di hari ini. Lakukan kembali besok saja ya");
      return;
    }

    try {
      await axios.post('http://localhost:8080/api/mindfulness/save-daily-status', {
        id_partisipan: idPartisipan,
        intervention_week: '2',
        intervention_day: day,
        is_completed: !completedStatus[day - 1]
      });

      console.log(`Saved daily status for Day ${day}`);
      const newCompletedStatus = [...completedStatus];
      newCompletedStatus[day - 1] = !completedStatus[day - 1];
      setCompletedStatus(newCompletedStatus);
      localStorage.setItem('completedStatusWeek1', JSON.stringify(newCompletedStatus));
      setError(null);

      setQuote(getRandomQuote());
      setShowQuoteModal(true);
      localStorage.setItem('today_entry', currentDate);

    } catch (error) {
      setError("Gagal menyimpan status harian");
    }
  };

  const handleSaveMeditationExperience = async () => {
    const idPartisipan = localStorage.getItem("partisipan_id");
    try {
      await axios.post('http://localhost:8080/api/mindfulness/save-meditation-experience', {
        id_partisipan: idPartisipan,
        intervention_week: '2',
        experience: experience
      });
      console.log('Saved meditation experience:', experience);
      setError(null);
    } catch (error) {
      setError("Gagal menyimpan pengalaman meditasi");
    }
  };

  return (
    <>
      <Navbar />
      <div className="before-content" style={{paddingTop:"50px", marginTop:"60px"}}>
      <Container className="mt-5">
        <h2 className="mb-4">Mindfulness Week 2</h2>
        <div className="mt-3">
          {[...Array(7)].map((_, index) => (
            <div key={index + 1} className="d-flex align-items-center">
              <Form.Check 
                type="checkbox"
                id={`day-${index + 1}`}
                label={`Day ${index + 1}`}
                checked={completedStatus[index]}
                onChange={() => handleSaveDailyStatus(index + 1)}
                className="mr-2 mt-2"
              />
            </div>
          ))}
        </div>
        {completedStatus[6] && (
          <>
            <br/>
            <Card>
              <Card.Body>
                <form>
                  <div className="form-group">
                    <label>Tulis pengalaman meditasimu selama 2 minggu:</label>
                    <textarea className="form-control" rows="3" value={experience} onChange={(e) => setExperience(e.target.value)} />
                  </div>
                  <Button variant="primary" onClick={handleSaveMeditationExperience}>Simpan Pengalaman</Button>
                </form>
              </Card.Body>
            </Card>
          </>
        )}
        {error && <p className="mt-3 text-danger">{error}</p>}
        {notification && <p className="mt-3 text-warning">{notification}</p>}

        <Modal show={showQuoteModal} onHide={() => setShowQuoteModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Quote of the Day</Modal.Title>
          </Modal.Header>
          <Modal.Body>{quote}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowQuoteModal(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
      </div>
      <br/><br/><br/>
      <Footer/>
    </>
  );
};

export default MindfulnessWeek2;
