import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Col, Button, Container, Row, Alert, Card } from 'react-bootstrap';
import { Link } from "react-router-dom/cjs/react-router-dom.min.js";
import Navbar from '../../landing/Navbar.js';
import Footer from '../../landing/Footer.js';
import cemas from "../../images/intervensi/cemas2.png"; // Import gambar
import "../../style/Intervensi.css";
import WaveSurfer from 'wavesurfer.js';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome

const Teknik54321 = () => {
    const [voiceOver, setVoiceOver] = useState(null);
    const [error, setError] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [waveSurfer, setWaveSurfer] = useState(null);

    useEffect(() => {
        fetchVoiceOverById(2); // Fetch voice-over with ID 2
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
                waveColor: 'violet',
                progressColor: 'purple',
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

    return (
        <>
            <Navbar />
            <Container style={{ marginTop: "150px" }}>
                <Container className="mt-5" style={{ padding: "50px", backgroundColor: "#C5C0FC", borderRadius: "50px", marginBottom:"10px" }}>
                    <Row className="justify-content-center">
                        <Col md={5}>
                            <h6 style={{ fontSize: "20px", marginTop: "30px", fontWeight: "bold" }}>
                                Intervensi Cemas Ringan
                            </h6>
                            <h6 style={{ fontSize: "35px", fontWeight: "bold", marginBottom:"20px" }}>
                                5-4-3-2-1 Method
                            </h6>

                            {/* Display Voice Over */}
                            {error && <Alert variant="danger">{error}</Alert>}
                            {voiceOver && (
                                <Card className="card-voice">
                                    <Card.Body>
                                        <Row className="align-items-center">
                                            <Col xs="auto">
                                                <Button
                                                    style={{marginTop:"-15px"}}
                                                    variant="light"
                                                    size="sm"
                                                    onClick={() => playPauseAudio(`http://localhost:8080/voiceovers/audio/${voiceOver.file_voice}`)}
                                                >
                                                    <i className={isPlaying ? "fas fa-pause" : "fas fa-play"}></i>
                                                </Button>
                                            </Col>
                                            <Col>
                                                <div id="waveform" style={{ width: "90%", marginTop:"-30px" }}></div>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            )}

                            <Link to="/groundingdetail-user">
                                <Button
                                    variant="light"
                                    className="custom-button"
                                    style={{
                                        marginTop: "20px",
                                        borderRadius: "50px",
                                        fontWeight: "bold",
                                        padding: '17px 20px',
                                        fontSize: '16px'
                                    }}
                                >
                                    Yuk Ikuti Langkah-langkahnya!
                                </Button>
                            </Link>
                        </Col>
                        <Col md={4} className="d-flex align-items-center justify-content-center">
                            <img src={cemas} alt="Image" style={{ maxWidth: "100%", maxHeight: "100%" }} />
                        </Col>
                    </Row>
                </Container>

                <Container className="my-5">
                    <Row style={{ marginTop: "40px", marginLeft: "55px", marginBottom:"150px" }}>
                        <Col md={4} style={{ backgroundColor: "#7F91D8", borderRadius: "20px", padding: "20px", marginLeft: "10px" }}>
                            <p style={{ fontSize: "20px", marginTop: "30px", paddingLeft: "20px" }}>
                                Jika Anda kesulitan mengatasi gejala kecemasan Anda, Anda tidak sendirian.
                                Kecemasan adalah salah satu masalah kesehatan mental yang paling umum saat ini.
                                Orang-orang mengalami berbagai jenis kecemasan mulai dari yang ringan hingga yang sangat melemahkan.
                            </p>
                        </Col>

                        <Col md={3} style={{ backgroundColor: "#BCE5EB", borderRadius: "20px", padding: "20px", marginLeft: "10px" }}>
                            <p style={{ fontSize: "20px", marginTop: "10px", marginLeft: "20px" }}>
                                Kecemasan dikaitkan dengan banyak keadaan emosi intens yang berbeda.
                                Sulit untuk fokus atau merasa terkendali ketika Anda mengalami gelombang panik atau perasaan cemas yang luar biasa.
                                Seringkali segala sesuatunya terasa kabur.
                            </p>
                        </Col>

                        <Col md={4} style={{ backgroundColor: "#F5A5AD", borderRadius: "20px", paddingleft: "20px", marginLeft: "10px" }}>
                            <p style={{ fontSize: "20px", marginTop: "45px", paddingLeft: "20px" }}>
                                Kabar baiknya adalah ada banyak cara efektif untuk mengurangi gejala kecemasan.
                                Salah satu teknik yang sangat efektif yang dapat Anda terapkan kapan saja, di mana saja,
                                adalah grounding, yang menggunakan praktik sederhana untuk mengaktifkan indra Anda sedemikian rupa
                                sehingga membantu melawan gejala kecemasan.<br /><br />
                            </p>
                        </Col>
                    </Row>
                </Container>
            </Container>
            <Footer />
        </>
    );
};

export default Teknik54321;
