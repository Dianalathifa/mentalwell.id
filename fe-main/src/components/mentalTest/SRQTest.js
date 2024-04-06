import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Col, Form, Button, Alert } from "react-bootstrap";
import Navbar from "../landing/Navbar.js";
import Footer from "../landing/Footer.js";

const SRQTest = () => {
  // State untuk menyimpan daftar kuisioner, jawaban, dan hasil perhitungan skor
  const [kuisionerList, setKuisionerList] = useState([]);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState({});

  useEffect(() => {
    // Fetch data kuisioner saat komponen dimount
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/kuisioner");
        // Mengurutkan daftar kuisioner berdasarkan nomor pertanyaan
        const sortedKuisionerList = response.data.sort((a, b) => a.id_kuisioner - b.id_kuisioner);
        setKuisionerList(sortedKuisionerList);
      } catch (error) {
        console.error("Error fetching kuisioner list:", error);
      }
    };

    fetchData();
  }, []);

  // Fungsi untuk menangani jawaban ya atau tidak
  const handleAnswer = (kuisionerId, answer) => {
    // Simpan jawaban ke dalam state
    setAnswers({ ...answers, [kuisionerId]: answer });
  };

  // Fungsi untuk mengirim jawaban dan menampilkan hasil
  // Fungsi untuk mengirim jawaban dan menampilkan hasil
const handleSubmit = () => {
    // Lakukan perhitungan skor
    const scores = {
      depresi: [2, 3, 8, 9, 10, 11, 12, 14, 15, 16, 17, 18, 20],
      kecemasan: [4, 5, 6, 16],
      somatoform: [1, 7, 19],
      neurotik: [3, 8, 13, 18, 20]
    };
  
    // Set nilai default untuk pertanyaan yang tidak dijawab
    const answeredQuestions = Object.keys(answers).map(Number);
    const unansweredQuestions = kuisionerList.filter(kuisioner => !answeredQuestions.includes(kuisioner.id_kuisioner));
    unansweredQuestions.forEach(kuisioner => {
      setAnswers({ ...answers, [kuisioner.id_kuisioner]: false }); // Menganggap jawaban "tidak" untuk pertanyaan yang tidak dijawab
    });
  
    const result = {
      depresi: 0,
      kecemasan: 0,
      somatoform: 0,
      neurotik: 0
    };
  
    Object.keys(answers).forEach((key) => {
      const kuisionerId = parseInt(key);
      Object.keys(scores).forEach((condition) => {
        if (scores[condition].includes(kuisionerId) && answers[key]) {
          result[condition]++;
        }
      });
    });
  
    // Set hasil perhitungan skor dan tampilkan
    setResult(classifyDisease(result));
    setShowResult(true);
  };
  

  // Fungsi untuk melakukan klasifikasi penyakit
  const classifyDisease = (result) => {
    const { depresi, tidak } = result;

    if (depresi >= 6) {
      return 'Depresi';
    } else if (tidak >= 3) {
      return 'Kecemasan';
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
        <h2 className="mb-4">Daftar Kuisioner</h2>
        {kuisionerList.map((kuisioner, index) => (
          <div key={kuisioner.id_kuisioner} className="mb-4">
            <h5>{index + 1}. {kuisioner.pertanyaan}</h5>
            <Form.Check
              type="radio"
              label="Ya"
              name={`answer_${kuisioner.id_kuisioner}`}
              id={`answer_yes_${kuisioner.id_kuisioner}`}
              onChange={() => handleAnswer(kuisioner.id_kuisioner, true)}
            />
            <Form.Check
              type="radio"
              label="Tidak"
              name={`answer_${kuisioner.id_kuisioner}`}
              id={`answer_no_${kuisioner.id_kuisioner}`}
              onChange={() => handleAnswer(kuisioner.id_kuisioner, false)}
            />
          </div>
        ))}
        <Button variant="light" style={{backgroundColor:"#FEA503", color:"white", fontWeight:"bold"}} onClick={handleSubmit}>
          Kirim Jawaban
        </Button>
        {showResult && (
          <Alert variant="success" className="mt-3">
            <h5>Hasil Klasifikasi Penyakit:</h5>
            <p>{result}</p>
          </Alert>
        )}
      </Container>

      <Footer />
    </>
  );
};

export default SRQTest;
