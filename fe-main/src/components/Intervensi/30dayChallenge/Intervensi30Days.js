import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Col, Button, Container, Row, Alert, Card } from 'react-bootstrap';
import { Link } from "react-router-dom/cjs/react-router-dom.min.js";
import Navbar from '../../landing/Navbar.js';
import Footer from '../../landing/Footer.js';
import stress from "../../images/intervensi/strees2.png"; // Import gambar
import "../../style/Intervensi.css";
import WaveSurfer from 'wavesurfer.js';
import '@fortawesome/fontawesome-free/css/all.min.css';

const ThirtyInterventions = () => {
  const [interventions, setInterventions] = useState([]);
  const [voiceOver, setVoiceOver] = useState(null);
  const [error, setError] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [waveSurfer, setWaveSurfer] = useState(null);
  const [submissions, setSubmissions] = useState(new Set());

  useEffect(() => {
    fetchVoiceOverById(10); // Fetch voice-over with ID 2
  }, []);

  useEffect(() => {
    if (waveSurfer) {
      waveSurfer.on('finish', () => {
        setIsPlaying(false);
      });
    }
  }, [waveSurfer]);

  const fetchVoiceOverById = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8080/voiceovers/${id}`);
      setVoiceOver(response.data);
    } catch (error) {
      setError("Error fetching voice-over data. Please try again later.");
      console.error("Error fetching voice-over data:", error);
    }
  };

  const playPauseAudio = (url) => {
    if (waveSurfer) {
      if (isPlaying) {
        waveSurfer.pause();
        setIsPlaying(false);
      } else {
        waveSurfer.play();
        setIsPlaying(true);
      }
    } else {
      const newWaveSurfer = WaveSurfer.create({
        container: `#waveform`,
        waveColor: '#D0DEEE',
        progressColor: '#25B7D3',
        height: 80,
        barWidth: 2,
        responsive: true
      });

      newWaveSurfer.load(url);

      setWaveSurfer(newWaveSurfer);
      setIsPlaying(true);

      newWaveSurfer.on('ready', () => {
        newWaveSurfer.play();
      });

      newWaveSurfer.on('finish', () => {
        setIsPlaying(false);
      });
    }
  };

  useEffect(() => {
    fetchInterventions();
  }, []);

  const fetchInterventions = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/intervensi');
      if (response.ok) {
        const data = await response.json();
        setInterventions(data);
        fetchSubmissions();
      } else {
        console.error('Gagal memuat data intervensi');
      }
    } catch (error) {
      console.error('Terjadi kesalahan:', error);
    }
  };

  const fetchSubmissions = async () => {
    const idPartisipan = localStorage.getItem('partisipan_id');
    try {
      const response = await axios.get(`http://localhost:8080/api/jawaban-intervensi/${idPartisipan}`);
      if (response.status === 200) {
        const data = response.data;
        const submissionsSet = new Set();
        data.forEach(submission => {
          submissionsSet.add(submission.id_intervensi);
        });
        setSubmissions(submissionsSet);
      } else {
        console.error('Failed to fetch submissions');
      }
    } catch (error) {
      console.error('Error fetching submissions:', error);
    }
  };

  return (
    <>
      <Navbar />
      <Container style={{ marginTop: "150px" }}>
        <Container className="mt-5" style={{ padding: "50px", backgroundColor: "#D0DEEE", borderRadius: "50px", marginBottom: "10px" }}>
          <Row className="justify-content-center">
            <Col md={5}>
              <h6 style={{ fontSize: "20px", marginTop: "30px", fontWeight: "bold" }}>
                Intervensi Stress Sedang
              </h6>
              <h6 style={{ fontSize: "35px", fontWeight: "bold", marginBottom: "20px" }}>
                30 Days Writing Challenge
              </h6>

              {/* Display Voice Over */}
              {error && <Alert variant="danger">{error}</Alert>}
              {voiceOver && (
                <Card className="card-voice">
                  <Card.Body>
                    <Row className="align-items-center">
                      <Col xs="auto">
                        <Button
                          style={{ marginTop: "-15px" }}
                          variant="light"
                          size="sm"
                          onClick={() => playPauseAudio(`http://localhost:8080/voiceovers/audio/${voiceOver.file_voice}`)}
                        >
                          <i className={isPlaying ? "fas fa-pause" : "fas fa-play"}></i>
                        </Button>
                      </Col>
                      <Col>
                        <div id="waveform" style={{ width: "90%", marginTop: "-30px" }}></div>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              )}
            </Col>
            <Col md={4} className="d-flex align-items-center justify-content-center">
              <img src={stress} alt="Image" style={{ maxWidth: "100%", maxHeight: "100%" }} />
            </Col>
          </Row>
        </Container>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {interventions.map((intervention) => (
            <InterventionCard
              key={intervention.id_intervensi}
              intervention={intervention}
              isSubmitted={submissions.has(intervention.id_intervensi)}
            />
          ))}
        </div>
      </Container>
      <Footer />
    </>
  );
};

const InterventionCard = ({ intervention, isSubmitted }) => {
  const cardStyle = {
    width: '10rem',
    margin: '10px',
    filter: isSubmitted ? 'grayscale(100%)' : 'none'
  };

  return (
    <Card style={cardStyle}>
      <Card.Img variant="top" src={`http://localhost:8080/images/intervensi/${intervention.image_challenge}`} style={{ height: '250px' }} />
      <Card.Body>
        <Link to={`/formstress-user/${intervention.id_intervensi}`}>
          <Button variant="link" disabled={isSubmitted}>Tulis Sekarang</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default ThirtyInterventions;
