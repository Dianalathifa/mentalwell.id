import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Col, Button, Alert } from "react-bootstrap";
import Navbar from "../landing/Navbar.js";
import Footer from "../landing/Footer.js";

const SRQTest = () => {
  // State untuk menyimpan daftar kuisioner, jawaban, dan hasil perhitungan skor
  const [kuisionerList, setKuisionerList] = useState([]);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState("");

  useEffect(() => {
    // Fetch data kuisioner saat komponen dimount
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/kuisioner");
        setKuisionerList(response.data);
      } catch (error) {
        console.error("Error fetching kuisioner list:", error);
      }
    };

    fetchData();
  }, []);

  // Fungsi untuk menangani jawaban ya atau tidak
  const handleAnswer = (kuisionerId, answer) => {
    setAnswers({ ...answers, [kuisionerId]: answer });
  };

  // Fungsi untuk mengirim jawaban dan menampilkan hasil
  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/jawaban", answers);
      setResult(response.data.result);
      setShowResult(true);
    } catch (error) {
      console.error("Error submitting answers:", error);
    }
  };

  return (
    <>
      <Navbar />
      <section id="psikolog-list" className="section before-content" style={{ backgroundColor: "#C4EAF4", color: "#141313", fontFamily: "Abril Fatface", marginTop: "-140px", paddingTop: "200px" }}>
        <Col md={16} className="d-flex align-items-center justify-content-center">
          <div className="container text-center">
            <h6 className="section-title mb-2 tfonts">Tes Kesehatan Mental</h6>
          </div>
        </Col>
      </section>
      <Container className="py-5">
        <h2 className="mb-6">Pertanyaan</h2>
        {kuisionerList.map((kuisioner, index) => (
          <div key={kuisioner.id_kuisioner} className="mb-5">
            <h5>{index + 1}. {kuisioner.pertanyaan}</h5>
            <div>
              <br />
              <Button
                variant={answers[kuisioner.id_kuisioner] === true ? "primary" : "outline-primary"}
                className="mr-2"
                onClick={() => handleAnswer(kuisioner.id_kuisioner, true)}
              >
                Ya
              </Button>
              <Button
                variant={answers[kuisioner.id_kuisioner] === false ? "primary" : "outline-primary"}
                onClick={() => handleAnswer(kuisioner.id_kuisioner, false)}
              >
                Tidak
              </Button>
            </div>
          </div>
        ))}
        <Col md={14} className="text-center">
          <Button
            className="btn-light mt-3"
            style={{ backgroundColor: "#FEA503", color: "white", fontWeight: "bold" }}
            onClick={handleSubmit}
          >
            Lihat Hasil Tes
          </Button>
          {showResult && (
            <Alert variant="success" className="mt-3">
              <h5>Hasil Klasifikasi Penyakit:</h5>
              <p>{result}</p>
            </Alert>
          )}
        </Col>
      </Container>
      <Footer />
    </>
  );
};

export default SRQTest;
