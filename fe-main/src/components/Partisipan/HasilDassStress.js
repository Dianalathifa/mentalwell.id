import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button, Table } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Navbar from "../landing/Navbar";
import Footer from "../landing/Footer";

const HasilKlasifikasi = () => {
  const [hasilKlasifikasi, setHasilKlasifikasi] = useState(null);
  const [error, setError] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const partisipanId = localStorage.getItem("partisipan_id");

    const ambilHasilKlasifikasi = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/dass-stress/${partisipanId}`
        );
        setHasilKlasifikasi(response.data);
      } catch (error) {
        setError("Gagal mengambil hasil klasifikasi");
      }
    };

    ambilHasilKlasifikasi();
  }, []);

  const goToIntervensi = () => {
    history.push("/intervensidetail-user");
  };

  const goToTesSuicide = () => {
    history.push("/suicidetest-user");
  };

  const handleNavigation = () => {
    const klasifikasi = hasilKlasifikasi && hasilKlasifikasi.klasifikasi;
  
    if (klasifikasi === "Stress Ringan" || klasifikasi === "Stress Sedang") {
      goToIntervensi();
    } else {
      goToTesSuicide();
    }
  };
  

  return (
    <>
      <Navbar />
      <Container className="mt-5">
        <div className="container text-center">
          <h6 className="section-title mb-2 tfonts">
            <br />
            Hasil Klasifikasi
            <br />
          </h6>
        </div>
        <Row>
          <Col>
            <Table striped bordered hover>
              <tbody>
                <tr>
                  <td>
                    <strong>ID Partisipan:</strong>
                  </td>
                  <td>{hasilKlasifikasi && hasilKlasifikasi.id_partisipan}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Points:</strong>
                  </td>
                  <td>{hasilKlasifikasi && hasilKlasifikasi.points}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Klasifikasi:</strong>
                  </td>
                  <td>
                    {hasilKlasifikasi && hasilKlasifikasi.klasifikasi}
                  </td>
                </tr>
                <tr>
                  <td colSpan="2">
                    {hasilKlasifikasi &&
                      (hasilKlasifikasi.klasifikasi === "Stress Ringan" ||
                        hasilKlasifikasi.klasifikasi === "Stress Sedang"
                        ? "Anda harus melanjutkan ke tahap intervensi."
                        : "Anda harus melanjutkan ke tes suicide.")}
                  </td>
                </tr>
              </tbody>
            </Table>
            <div className="text-center">
              {hasilKlasifikasi && (
                <Button onClick={handleNavigation}>
                  {hasilKlasifikasi.klasifikasi === "Stress Ringan" ||
                  hasilKlasifikasi.klasifikasi === "Stress Sedang"
                    ? "Lanjutkan ke Intervensi"
                    : "Lanjutkan ke Tes Suicide"}
                </Button>
              )}
            </div>
          </Col>
        </Row>
      </Container>
      <br />
      <br />
      <Footer />
    </>
  );
};

export default HasilKlasifikasi;
