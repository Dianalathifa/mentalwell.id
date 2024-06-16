import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import MotivationalModal from '../MotivationModal';
import Navbar from "../../landing/Navbar.js";
import Footer from "../../landing/Footer.js";
import { Toast, ToastContainer, Card, Button, Col, Row, Container, CardBody, Image } from 'react-bootstrap';
import checklistImage from '../../images/checklist-cemas.png'; // Adjust the path as needed
import { Link } from "react-router-dom";
import { useInView } from 'react-intersection-observer';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../../style/Intervensi.css'; // Import global CSS
import cemas from '../../video/cemas-ringan.mp4'; // Adjust the path as needed

const quotes = [
    "Hebat sekali! Langkah kecil yang kamu ambil hari ini membantu menenangkan pikiran dan mendekatkanmu pada ketenangan yang sejati. Teruslah melangkah, kamu sedang membuat perubahan besar.",
    "Luar biasa! Setiap kali kamu berlatih teknik ini, kamu semakin mengendalikan kecemasanmu. Ingat, setiap hari adalah kesempatan untuk merasa lebih baik dan kamu sudah di jalur yang benar.",
    "Bagus sekali! Setiap praktik membawa ketenangan lebih dekat. Percayalah pada dirimu sendiri, kamu memiliki kekuatan untuk mengatasi ini.",
    "Kamu hebat! Menghadapi kecemasan butuh keberanian, dan kamu melakukannya dengan sangat baik. Teruskan perjuangan ini, kamu layak mendapatkan ketenangan.",
    "Teruskan! Setiap harimu menjadi lebih baik dengan langkah-langkah kecil yang kamu ambil. Jangan pernah meremehkan kemajuan yang telah kamu buat.",
    "Maju terus! Kecemasanmu tidak mendefinisikan dirimu. Kamu lebih kuat dari yang kamu pikirkan dan setiap hari adalah bukti dari kekuatanmu.",
    "Keren! Setiap ceklis adalah langkah menuju kedamaian batin. Teruskan usahamu, kamu sedang menciptakan masa depan yang lebih tenang.",
    "Kamu kuat! Kecemasan ini hanyalah sementara dan kamu memiliki kemampuan untuk mengatasinya. Setiap hari adalah kesempatan baru untuk merasa lebih baik.",
    "Fantastis! Kamu membuat kemajuan nyata hari ini. Setiap langkah kecil menuju ketenangan adalah kemenangan yang patut dirayakan.",
    "Semangat! Ketenanganmu semakin dekat dengan setiap usaha yang kamu lakukan. Jangan pernah meremehkan kekuatan dari langkah-langkah kecil yang kamu ambil.",
    "Yakinlah! Kamu menguasai hari ini dengan sangat baik. Setiap hari adalah kesempatan untuk menjadi lebih baik dan kamu sudah di jalan yang benar.",
    "Super! Kecemasanmu berkurang dengan setiap langkah yang kamu ambil. Teruskan usahamu, kamu sedang menciptakan perubahan positif dalam hidupmu.",
    "Tetap semangat! Setiap hari adalah kesempatan baru untuk merasa lebih baik. Percayalah pada dirimu sendiri, kamu memiliki kemampuan untuk mengatasi ini.",
    "Bagus! Kamu lebih kuat daripada kecemasanmu. Setiap ceklis adalah bukti dari kekuatan dan keberanianmu untuk menghadapi dan mengatasi kecemasan.",
];

const getRandomQuote = () => {
    return quotes[Math.floor(Math.random() * quotes.length)];
};

const Checklist = ({ partisipanId, handleCheck, checklist, setShowModal, setQuote, setIsDay14 }) => {
    return (
        <Card className="text-center" style={{ backgroundColor: "#C5C0FC", marginTop: "20px" }}>
            <Card.Body>
                <Card.Title className="mb-3 tfonts-2" style={{ color: "white" }}>Daily Checklist</Card.Title>
                <CardBody>
                <p style={{color:"white", fontWeight:"bold"}}>
                    Selesaikan intervensi dan checklist ketika kamu sudah melakukannya!
                  </p>
                </CardBody>
                  
                {Array.from({ length: 14 }, (_, i) => i + 1).map((day) => (
                    <Button
                        key={day}
                        variant="outline-light"
                        className="mb-3 mx-2"
                        onClick={() => handleCheck(day)}
                        disabled={checklist.some(item => item.hari >= day)}
                        style={{ marginTop: "15px", outlineColor: "white", backgroundColor: "#7F91D8" }}
                    >
                        Day {day} Checklist
                    </Button>
                ))}
            </Card.Body>
        </Card>
    );
};

const Teknik54321 = () => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const [checklist, setChecklist] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [partisipanId, setPartisipanId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [quote, setQuote] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [isDay14, setIsDay14] = useState(false);

    useEffect(() => {
        const id = localStorage.getItem('partisipan_id');
        if (id) {
            setPartisipanId(id);
            fetchChecklist(id);
        } else {
            setError('Participant ID not found');
            setLoading(false);
        }
    }, []);

    const fetchChecklist = async (id) => {
        try {
            const response = await axios.get(`http://localhost:8080/cemas/checklist`, {
                params: { id_partisipan: id }
            });
            setChecklist(response.data);
        } catch (error) {
            setError('Error fetching checklist');
        } finally {
            setLoading(false);
        }
    };

    const handleCheck = async (day) => {
        try {
            await axios.post(`http://localhost:8080/cemas/checklist/check-day`, {
                id_partisipan: partisipanId,
                hari: day,
                status: 'true'
            });
            fetchChecklist(partisipanId);
            setQuote(getRandomQuote());
            setIsDay14(day === 14);
            setShowModal(true);
        } catch (error) {
          if (error.response && error.response.status === 400) {
            setToastMessage("Maaf, hari ini kamu sudah melakukan daily checklist untuk pencatatan progres harian intervensi. Kembali lagi besok ya.");
            setShowToast(true);
        } else {
            setError('Error updating checklist');
        }
    }
};

const handleClose = () => setShowModal(false);

if (loading) return <div>Loading...</div>;
if (error) return <div>{error}</div>;

return (
    <>
        <Navbar />
        <Container >
            <div className="container text-center" style={{ marginTop: "150px" }}>
                <h6 className="section-title mb-2 tfonts-2" style={{ borderColor: "#FFD2DD", color: "#25B7D3", fontWeight: "bold" }}>
                    Ayo Kita Mulai Grounding 5-4-3-2-1 <br />untuk Mengatasi Kecemasan<br />
                </h6>
            </div>
            <br />
            <Col md={16} className="d-flex align-items-center justify-content">
            <div className="container text-center">
                <div ref={ref}>
                    {inView && (
                        <video src={cemas} controls style={{ width: "700px", height: "auto", maxWidth: "100%", maxHeight: "100%" }} />
                    )}
                </div>
                <br /><br /><br />
            </div>
        </Col>
        </Container>
        <Container className="my-6">
            <Row className="justify-content-center">
                <Col md={5} className="d-flex justify-content-center align-items-center">
                    <div>
                        <p>
                            "Ayo, mari kita praktikkan bersama sekarang! Ikuti intervensi ini selama 14 hari. Setiap hari, praktikkan teknik '5-4-3-2-1' dan ceklis pengalamanmu di daily checklist disamping !"
                        </p>
                        <Image src={checklistImage} alt="Intervensi Cemas" className="img-fluid" style={{ maxWidth: '250px' }} />
                    </div>
                </Col>
                <Col md={7}>
                    <Card className="text-center" style={{ backgroundColor: "#C5C0FC" }}>
                        <Card.Body>
                            <Card.Title className="mb-3 tfonts-2" style={{ color: "white" }}>Daily Checklist</Card.Title>
                            <CardBody>
                            <p style={{color:"white", fontWeight:"bold"}}>
                                Selesaikan intervensi dan checklist ketika kamu sudah melakukannya!
                              </p>
                            </CardBody>
                              
                            {Array.from({ length: 14 }, (_, i) => i + 1).map((day) => (
                                <Button
                                    key={day}
                                    variant="outline-light"
                                    className="mb-3 mx-2"
                                    onClick={() => handleCheck(day)}
                                    disabled={checklist.some(item => item.hari >= day)}
                                    style={{ marginTop: "15px", outlineColor: "white", backgroundColor: "#7F91D8" }}
                                >
                                    Day {day} Checklist
                                </Button>
                            ))}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
        <MotivationalModal show={showModal} handleClose={handleClose} quote={quote} isDay14={isDay14} />

        <ToastContainer position="top-end" className="p-3">
            <Toast show={showToast} onClose={() => setShowToast(false)} delay={3000} autohide>
                <Toast.Body>{toastMessage}</Toast.Body>
            </Toast>
        </ToastContainer>
    </>
);
};

export default Teknik54321;
