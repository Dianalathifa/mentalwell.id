import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Container, Card, Form, Button, Alert, Modal } from "react-bootstrap";
import Navbar from '../../landing/Navbar.js';
import Footer from '../../landing/Footer.js';

const DailyTaskDetail = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [jawaban, setJawaban] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [hasSubmittedToday, setHasSubmittedToday] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [quote, setQuote] = useState("");
  const [specialQuote, setSpecialQuote] = useState("");

  useEffect(() => {
    fetchTask();
  }, [id]);

  useEffect(() => {
    if (task) {
      displaySubmittedAnswer(task.id_task, localStorage.getItem('partisipan_id'));
    }
  }, [task]);

  const fetchTask = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/daily-tasks/${id}`);
      setTask(response.data);
      displaySubmittedAnswer(response.data.id_task, localStorage.getItem('partisipan_id')); // Pass the task ID to displaySubmittedAnswer
    } catch (error) {
      setError("Error fetching task data. Please try again later.");
      console.error("Error fetching task data:", error);
    }
  };

  const displaySubmittedAnswer = async (taskId, participantId) => {
    try {
      const response = await axios.get(`http://localhost:8080/cbt-responses/task-participant/${taskId}/${participantId}`);
      if (response.data) {
        setJawaban(response.data.jawaban); // Set the answer retrieved from the backend to the state
        setHasSubmittedToday(true); // Indicate that the user has submitted a response for today
      } else {
        setJawaban(""); // Clear the answer if no answer has been submitted for today
        setHasSubmittedToday(false); // Indicate that the user has not submitted a response for today
      }
    } catch (error) {
      console.error('Failed to load the submitted answer:', error);
    }
  };

  const handleResponseSubmit = async (e) => {
    e.preventDefault();
    const id_partisipan = localStorage.getItem('partisipan_id');

    if (!id_partisipan) {
      setError("Participant ID not found in local storage.");
      return;
    }

    if (!jawaban.trim()) {
      setError("Please provide a response.");
      return;
    }

    if (hasSubmittedToday) {
      setError("Sorry, you have already submitted a response today. Please try again tomorrow.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/cbt-responses", {
        id_task: task.id_task,
        id_partisipan,
        jawaban,
        submission_date: new Date().toISOString().split("T")[0],
      });

      if (response.status === 400 || response.status === 300) {
        setError(response.data.message); // Update this to the actual error message format returned by your API
        return;
      }

      setSuccess("Jawaban kamu berhasil disimpan!");
      setJawaban("");
      setHasSubmittedToday(true);
      setQuote(getRandomQuote()); // Set random quote

      // Menampilkan modal jika id_task adalah 14 dan id_session adalah 4
      if (task.id_session === 4 && task.id_task === 14) {
        setShowModal(true);
        setSpecialQuote(getSpecialQuote()); // Set special quote
      }
    } catch (error) {
      console.error("Error submitting response:", error);
      console.error("Server response:", error.response);

      if (error.response && error.response.data && error.response.data.messages && error.response.data.messages.error) {
        setError(error.response.data.messages.error);
      } else {
        setError("Error submitting response. Please try again later.");
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const getRandomQuote = () => {
    const quotes = [
      "Hai, sobat! Hari ini kita akan mulai petualangan seru, Bersama MentalWell, mari kita coba cari jalan keluar dari labirin pikiranmu yang rumit!",
      "Pikiranmu seperti kebun binatang yang kacau, Tapi bersama MentalWell, kita pasti bisa membuatnya jadi lebih teratur!",
      "Depresi itu seperti badut yang suka muncul tanpa diundang, Tapi bersama MentalWell, kita bisa jadi ringmaster yang mengendalikannya!",
      "Kamu lebih kuat daripada es krim yang tahan lama di freezer, Bersama MentalWell, kita akan mencairkan segala beban yang ada!",
      "Setiap langkahmu seperti langkah kuda di arena balap, Mari bersama MentalWell, kita tunjukkan kepada dunia betapa cepatnya kita bisa bangkit kembali!",
      "Hari ini adalah awal petualangan baru dalam game kehidupan, Mari bersama MentalWell, kita ubah settingnya menjadi easy mode!",
      "Teruslah melangkah seperti pinguin yang sedang lari marathon, Bersama MentalWell, kita pasti bisa mencapai garis finish tanpa jatuh!",
      "Kamu adalah pahlawan yang sedang berjuang melawan tentara badmood, Mari bersama MentalWell, kita latih otot-otot kebahagiaan agar semakin kuat!",
      "Tidak ada yang bisa membatalkan tiketmu menuju kebahagiaan, Bersama MentalWell, kita ubah bahasa dari 'sedih' menjadi 'super happy fun time'!",
      "Hari ini, mari kita buat 'playlist' lagu-lagu semangat, Bersama MentalWell, kita pasti bisa jadi DJ yang membuat hati kita bergoyang!",
      "Kamu adalah ninja emosi yang sedang melawan pasukan kesedihan, Mari bersama MentalWell, kita latih gerakan-gerakan kungfu kebahagiaan!",
      "Tetaplah percaya pada kekuatan supermu yang tersembunyi, Bersama MentalWell, kita pasti bisa jadi superhero dalam kisah kehidupan kita sendiri!",
      "Di dalam hatimu ada lumba-lumba yang sedang melompat-lompat riang, Mari bersama MentalWell, kita pastikan bahwa setiap lompatannya membawa kebahagiaan!",
      "Hari ini, mari kita buat rencana kejahatan untuk melawan depresi, Bersama MentalWell, kita akan jadi tim penjahat yang baik hati",
      "Kamu adalah CEO dari perusahaan kehidupanmu sendiri, Mari bersama MentalWell, kita optimalkan strategi agar bisnis kebahagiaanmu semakin sukses!",
      "Langkah pertama adalah mengganti pasukan kesedihan dengan pasukan keceriaan, Bersama MentalWell, kita akan buat perangkat anti-sedih yang revolusioner!",
      "Hari ini, mari kita ubah catatan perilaku kita dari 'melamun' menjadi 'meluncur', Bersama MentalWell, kita akan menjelajahi setiap momen dengan penuh semangat!",
      "Kamu adalah desainer utama dari peristiwa-peristiwa kecil dalam hidupmu, Mari bersama MentalWell, kita kreasikan petualangan yang tak terlupakan!",
      "Tidak ada yang bisa menghalangimu untuk menjadi versi terbaik dari dirimu sendiri, Bersama MentalWell, kita buat karya seni hidup yang penuh warna!",
      "Hari ini, mari kita tinggalkan jejak kaki kita yang berani di atas pasir, Bersama MentalWell, kita buat cerita-cerita petualangan yang luar biasa!"
    ];
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  };

  const getSpecialQuote = () => {
    return "Terima kasih telah menemani perjalanan ini, Bersama MentalWell, mari kita lanjutkan menari di atas jembatan pelangi menuju kebahagiaan yang sejati!";
  };

  return (
    <>
      <Navbar />
      <Container className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "100vh", paddingTop: "150px", paddingBottom: "100px" }}>
        {task ? (
          <Container className="text-center">
            <h6 className="section-title mb-4 tfonts-2">
              Selamat Datang di {task.no_hari}
            </h6>
            <Card className="mb-4" style={{ borderRadius: "25px", color: "#4A4A4A", backgroundColor: "#C5C0FC80", fontWeight: "bold", maxWidth: "600px" }}>
              <Card.Body>
                {/* <Card.Title>{task.judul_task}</Card.Title> */}
                <Card.Text>{task.deskripsi_task}</Card.Text>
              </Card.Body>
            </Card>
            <Card className="mb-4" style={{ borderRadius: "25px", backgroundColor: "#FFD2DD", maxWidth: "600px" }}>
              <Card.Body>
                <Card.Text>{task.tips_task}</Card.Text>
              </Card.Body>
            </Card>
            <Form onSubmit={handleResponseSubmit} style={{ maxWidth: "600px", width: "100%" }}>
              <Form.Group controlId="formResponse">
                <Form.Label>Tanggapanmu :</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={jawaban}
                  onChange={(e) => setJawaban(e.target.value)}
                  readOnly={hasSubmittedToday} // Membuat textarea menjadi readonly jika sudah submit hari ini
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="mt-3 mb-5" disabled={hasSubmittedToday}>
                Kirim
              </Button>
            </Form>
            {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
            {success && <Alert variant="success" className="mt-3">{success}</Alert>}
            {/* Modal untuk menampilkan pesan selamat */}
            <Modal show={showModal} onHide={handleCloseModal} backdrop={true} backdropClassName="backdrop-modal" style={{ zIndex: 1050 }}>
              <Modal.Header closeButton>
                <Modal.Title>Selamat!</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {task.id_task === 14 && task.id_session === 4 ? (
                  <>
                    <p>{specialQuote}</p>
                  </>
                ) : (
                  <>
                    <p>{quote}</p>
                  </>
                )}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                  Close
                </Button>
                {task.id_task === 14 && task.id_session === 4 ? (
                  <Button variant="primary" href="/post-test">
                    Lanjutkan ke post-test
                  </Button>
                ) : null}
              </Modal.Footer>
            </Modal>
          </Container>
        ) : (
          <p>Loading task details...</p>
        )}
      </Container>
      <Footer />
    </>
  );
};

export default DailyTaskDetail;

