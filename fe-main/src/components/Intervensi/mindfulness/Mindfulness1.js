import React, { useState } from "react";
import axios from "axios";
import { Container, Card, Button } from "react-bootstrap";
import { BiCheck, BiX } from "react-icons/bi";
import Navbar from '../../landing/Navbar.js';
import Footer from '../../landing/Footer.js';

const MindfulnessWeek1 = () => {
  const [error, setError] = useState(null);
  const [experience, setExperience] = useState('');
  const [completedStatus, setCompletedStatus] = useState(Array(7).fill(false));

  const handleSaveDailyStatus = async (day) => {
    const idPartisipan = localStorage.getItem("partisipan_id");
    try {
      await axios.post('http://localhost:8080/api/mindfulness/save-daily-status', {
        id_partisipan: idPartisipan,
        intervention_week: '1',
        intervention_day: day,
        is_completed: !completedStatus[day - 1] // Update the completed status for the specific day
      });
      console.log(`Saved daily status for Day ${day}`);
      const newCompletedStatus = [...completedStatus];
      newCompletedStatus[day - 1] = !completedStatus[day - 1]; // Toggle the completed status for the specific day
      setCompletedStatus(newCompletedStatus);
      setError(null);
    } catch (error) {
      setError("Gagal menyimpan status harian");
    }
  };

  const handleSaveMeditationExperience = async () => {
    const idPartisipan = localStorage.getItem("partisipan_id");
    try {
      await axios.post('http://localhost:8080/api/mindfulness/save-meditation-experience', {
        id_partisipan: idPartisipan,
        intervention_week: '1',
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
    <Container className="mt-5">
      <h2 className="mb-4">Mindfulness Week 1</h2>
      <div className="mt-3">
        {[...Array(7)].map((_, index) => (
          <div key={index + 1} className="d-flex align-items-center">
            <Button 
              variant="light" 
              className="mr-2 mt-2"
              onClick={() => handleSaveDailyStatus(index + 1, true)}
            >
              <BiCheck className={completedStatus[index] === true ? "text-success" : "text-muted"} />
            </Button>
            <Button 
              variant="light" 
              className="mr-2 mt-2"
              onClick={() => handleSaveDailyStatus(index + 1, false)}
            >
              <BiX className={completedStatus[index] === false ? "text-danger" : "text-muted"} />
            </Button>
            {'Day ' + (index + 1)}
          </div>
        ))}
      </div>
      <br/>
      <Card>
        <Card.Body>
          <form>
            <div className="form-group">
              <label>Tulis pengalaman meditasimu selama 1 minggu:</label>
              <textarea className="form-control" rows="3" value={experience} onChange={(e) => setExperience(e.target.value)} />
            </div>
            <Button variant="primary" onClick={handleSaveMeditationExperience}>Simpan Pengalaman</Button>
          </form>
        </Card.Body>
      </Card>
      {error && <p className="mt-3 text-danger">{error}</p>}
    </Container>
    <br/><br/><br/>
    <Footer/>
    </>
  );
};

export default MindfulnessWeek1;
