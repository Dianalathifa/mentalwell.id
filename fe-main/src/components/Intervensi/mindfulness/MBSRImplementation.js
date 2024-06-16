import React, { useState, useEffect } from "react";
import axios from "axios";
import { Col, Button, Container, Card, Row, Modal } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import Navbar from '../../landing/Navbar.js';
import Footer from '../../landing/Footer.js';
import breathing1 from '../../video/mindfulness-breathing1.mp4';
import bodyscan1 from '../../video/mindfulness-bodyscan1.mp4';
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import checklistImage from '../../images/checklist-stress.png';

const MBSR4 = () => {
  const [error, setError] = useState(null);
  const [experience, setExperience] = useState('');
  const [completedStatus, setCompletedStatus] = useState(Array(7).fill(false));
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [quote, setQuote] = useState('');
  const [notification, setNotification] = useState('');
  const [showCongratulationsModal, setShowCongratulationsModal] = useState(false);

  const history = useHistory();

  const quotes = [
    "Luar biasa! Setiap tarikan napas membawa ketenangan dalam tubuhmu.",
    "Hebat! Kamu telah menemukan kedamaian dalam setiap tarikan napas dan sensasi tubuhmu.",
    "Bagus sekali! Hari ini kamu telah merasakan kedamaian dalam setiap bagian tubuhmu.",
    "Keren! Mindful body scan membantu melepaskan beban pikiran dan tubuhmu.",
    "Setiap napas yang kamu ambil membawa kedamaian dalam dirimu.",
    "Teruslah berlatih mindful body scan dan breathing. Setiap napas adalah langkah menuju ketenangan.",
    "Kamu hebat! Hari ini kamu telah merasakan kedamaian dalam setiap tarikan napas dan sensasi tubuhmu."
  ];

  useEffect(() => {
    const fetchDailyStatuses = async () => {
      const idPartisipan = localStorage.getItem("partisipan_id");
      try {
        const response = await axios.get(`http://localhost:8080/api/mindfulness/daily-statuses/${idPartisipan}`);
        const dailyStatuses = response.data;

        const newCompletedStatus = [...completedStatus];
        dailyStatuses.forEach(status => {
          const day = parseInt(status.intervention_day);
          if (status.intervention_week === '4' && day >= 1 && day <= 7) {
            newCompletedStatus[day - 1] = true;
          }
        });

        setCompletedStatus(newCompletedStatus);
      } catch (error) {
        console.error('Failed to fetch daily statuses:', error);
      }
    };

    fetchDailyStatuses();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  };

  const handleSaveDailyStatus = async (day) => {
    const idPartisipan = localStorage.getItem("partisipan_id");

    try {
      const response = await axios.post('http://localhost:8080/api/mindfulness/save-daily-status', {
        id_partisipan: idPartisipan,
        intervention_category: 'mindfulness',
        intervention_week: '4',
        intervention_day: day,
        is_completed: !completedStatus[day - 1]
      });

      console.log(response.data.message);
      const newCompletedStatus = [...completedStatus];
      newCompletedStatus[day - 1] = !completedStatus[day - 1];
      setCompletedStatus(newCompletedStatus);
      localStorage.setItem('completedStatusWeek4', JSON.stringify(newCompletedStatus));
      setError(null);

      setQuote(getRandomQuote());
      setShowQuoteModal(true);

    } catch (error) {
      console.error('Error saving daily status:', error);
      setError("Gagal menyimpan status harian");
      if (error.response && error.response.data && error.response.data.messages && error.response.data.messages.error) {
        setNotification(error.response.data.messages.error);
      } else {
        setNotification("Terjadi kesalahan saat menyimpan status harian");
      }
    }
  };

  const handleSaveMeditationExperience = async () => {
    const idPartisipan = localStorage.getItem("partisipan_id");
    try {
      await axios.post('http://localhost:8080/api/mindfulness/save-meditation-experience', {
        id_partisipan: idPartisipan,
        intervention_week: '4',
        experience: experience
      });
      console.log('Saved meditation experience:', experience);
      setError(null);
    } catch (error) {
      setError("Gagal menyimpan pengalaman meditasi");
    }
  };

  const handleRedirectToSRQTest = () => {
    history.push("/post-test");
  };

  return (
    <>
      <Navbar />
      <Container>
        <div className="container text-center" style={{ marginTop: "100px" }}>
          <h6 className="section-title mb-2" style={{ color: "#EBBCBC", fontWeight: "bold", fontSize: "35px" }}>
            <br />Selamat Datang di Minggu Keempat !<br />Yuk Kita Belajar Tentang Latihan Mindfulness Breathing dan Body Scan<br /></h6>
        </div>
        <Row className="justify-content-center">
          <Col md={5}>
            <Card className="about-us-card" style={{ backgroundColor: "#EBBCBC", marginTop: "50px", padding: "47px" }}>
              <Card.Body>
                <h5 style={{ fontSize: "18px", color: "white", fontWeight: "bold" }}>
                  <FontAwesomeIcon icon={faInfoCircle} style={{ marginRight: "10px", textAlign: "left" }} />
                  Latihan Mindfulness Breathing:
                  <br></br>
                </h5>
                <p style={{ fontSize: "14px", textAlign: "justify", }}>
                  <br></br>
                  1. &nbsp;Cari posisi yang nyaman, bisa duduk atau berbaring.<br></br>
                  2. &nbsp;Tutup mata atau biarkan pandangan lembut ke bawah.<br></br>
                  3. &nbsp;Fokuskan perhatian pada sensasi napas. Rasakan udara masuk melalui hidung dan keluar melalui mulut atau hidung.<br></br>
                  4. &nbsp;Perhatikan perut yang naik turun saat bernapas.<br></br>
                  5. &nbsp;Pikiran akan mengembara, itu wajar. Lembut saja arahkan perhatian kembali ke napas saat Anda tersadar.<br />
                  6. &nbsp;Lakukan selama 5-10 menit atau lebih lama jika nyaman.<br />
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={5}>
            <Card className="about-us-card" style={{ backgroundColor: "#EBBCBC", marginTop: "50px", padding: "5px" }}>
              <Card.Body>
                <h5 style={{ fontSize: "18px", color: "white", fontWeight: "bold" }}>
                  <FontAwesomeIcon icon={faInfoCircle} style={{ marginRight: "10px", textAlign: "left" }} />
                  Latihan Mindfulness Body Scan:
                  <br></br>
                </h5>
                <p style={{ fontSize: "14px", textAlign: "justify" }}>
                  <br></br>
                  1. &nbsp;Posisi sama seperti mindful breathing.<br></br>
                  2. &nbsp;Tarik napas dalam dan embuskan perlahan.<br></br>
                  3. &nbsp;Mulailah fokuskan perhatian pada bagian atas kepala. Rasakan sensasi apapun yang ada, seperti kehangatan, kesemutan, atau relaksasi. Tidak perlu ada penilaian.<br></br>
                  4. &nbsp;Perlahan pindaikan perhatian ke seluruh tubuh, area demi area. Leher, bahu, lengan, dada, punggung, dan seterusnya hingga ke ujung jari kaki.<br></br>
                  5. &nbsp;Saat Anda menemukan area yang tegang, coba bayangkan napas mengalir ke sana dan melunakkan ketegangan tersebut.<br />
                  6. &nbsp;Lanjutkan pemindaian hingga seluruh tubuh tercakup.<br />
                  7. &nbsp;Setelah selesai, luangkan waktu sejenak untuk merasakan keseluruhan tubuh Anda.<br />
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <section className="section before-content" style={{ color: "#141313", marginTop: "5px", paddingTop: "10px", paddingBottom: "100px" }}>
        <Container>
          <h6 className="mb-4 tfonts-2 text-center" style={{ color: "white" }}>Latihan Mindfulness Body Scan & Breathing </h6>
          <Row style={{ marginLeft: "5px" }}>
            <Col md={5} className="d-flex align-items-center justify-content-center" style={{ marginLeft: "100px" }}>
              <video src={breathing1} controls style={{ width: "100%", height: "auto", maxWidth: "600px", maxHeight: "100%", marginBottom: "60px" }} />
            </Col>
            <Col md={5} className="d-flex align-items-center justify-content-center">
              <video src={bodyscan1} controls style={{ width: "100%", height: "auto", maxWidth: "600px", maxHeight: "100%", marginBottom: "60px" }} />
            </Col>
          </Row>
          <section className="section before-content" style={{ color: "#141313", marginTop: "5px", paddingTop:"30px"}}>          

          <Row className="justify-content-center">
          <h6 className="mb-4 text-center">Selesaikan intervensi dan isi checklist berikut!</h6>

            <Col md={3}>
              <h6 className="mb-4" style={{ marginLeft: "50px", marginTop: "30px" }}>
                "Ayo, mari kita praktikkan sekarang! Ikuti intervensi ini selama 7 hari. Setiap hari, praktikkan Mindfulness dan centang pengalamanmu di daily checklist di bawah ini!"
              </h6><div className="text-center mb-3">
              
                <img src={checklistImage} alt="Checklist Mindfulness" style={{ maxWidth: "70%", height: "auto" }} />
              </div>
            </Col>
            <Col md={5} style={{marginTop:"100px"}}>
              <Container className="mt-5">
                {[...Array(7)].map((_, index) => (
                  <Button
                    key={index + 1}
                    variant="outline-light"
                    className="mb-3 mx-2"
                    onClick={() => handleSaveDailyStatus(index + 1)}
                    disabled={completedStatus[index]}
                    style={{ marginTop: "15px", outlineColor: "black", backgroundColor: "#EBBCBC" }}
                  >
                    {`Day ${index + 1}`}
                  </Button>
                ))}
              </Container>

              {completedStatus[6] && (
                <>
                  <br />
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
                </>
              )}
              {error && <p className="mt-3 text-danger">{error}</p>}
              {notification && <p className="mt-3">{notification}</p>}

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

              <Modal show={showCongratulationsModal} onHide={() => setShowCongratulationsModal(false)}>
                <Modal.Header closeButton>
                  <Modal.Title>Congratulations!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  Terima kasih telah mengikuti intervensi kecemasan bersama MentalWell dengan belajar MBSR! Kamu telah menunjukkan komitmen yang luar biasa. Semoga latihan mindfulness ini membawa lebih banyak ketenangan dan kesejahteraan dalam hidupmu.
                  Ingat, setiap momen mindfulness yang kamu praktikkan adalah langkah penting untuk meredakan kecemasan.
                  Tetaplah berlatih dan percaya bahwa kamu memiliki kekuatan untuk menghadapi setiap tantangan. Kami di MentalWell selalu mendukung perjalananmu menuju kesejahteraan.
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={() => setShowCongratulationsModal(false)}>
                    Tutup
                  </Button>
                  <Button variant="primary" onClick={handleRedirectToSRQTest}>
                    Lanjut ke Tes SRQ
                  </Button>
                </Modal.Footer>
              </Modal>
            </Col>
          </Row>
          </section>

        </Container>
      </section>
    </>
  );
};

export default MBSR4;