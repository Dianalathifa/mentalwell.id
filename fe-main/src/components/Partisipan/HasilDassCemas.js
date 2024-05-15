import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Navbar from "../landing/Navbar";
import Footer from "../landing/Footer";

const HasilKlasifikasi = () => {
  const [hasilKlasifikasi, setHasilKlasifikasi] = useState(null);
  const [error, setError] = useState(null);
  const history = useHistory();

  useEffect(() => {
    // Ambil ID partisipan dari local storage
    const partisipanId = localStorage.getItem("partisipan_id");

    // Lakukan permintaan untuk mengambil hasil klasifikasi berdasarkan ID partisipan
    const ambilHasilKlasifikasi = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/dass-cemas/${partisipanId}`
        );
        setHasilKlasifikasi(response.data);
      } catch (error) {
        setError("Gagal mengambil hasil klasifikasi");
      }
    };

    // Panggil fungsi untuk mengambil hasil klasifikasi
    ambilHasilKlasifikasi();
  }, []); // Dipanggil sekali setelah komponen dimuat

  // Fungsi untuk menangani navigasi ke halaman intervensi
  const goToIntervensi = () => {
    history.push("/intervensidetail-user");
  };

  // Fungsi untuk menangani navigasi ke tes suicide
  const goToTesSuicide = () => {
    history.push("/suicidetest-user");
  };

  // Fungsi untuk menangani tombol navigasi berdasarkan klasifikasi
  const handleNavigation = () => {
    const klasifikasi = hasilKlasifikasi && hasilKlasifikasi.klasifikasi;

    if (klasifikasi === "Kecemasan Ringan" || klasifikasi === "Kecemasan Sedang") {
      goToIntervensi();
    } else if (klasifikasi === "Kecemasan Parah" || klasifikasi === "Kecemasan Sangat Parah") {
      goToTesSuicide();
    }
  };

  return (
    <>
      <Navbar />
      <Container className="mt-5">
        <div className="container text-center">
          <h6 className="section-title mb-2 tfonts"><br />Hasil Klasifikasi<br /></h6>
        </div>
        <Row>
          <Col>
            <Table striped bordered hover>
              <tbody>
                <tr>
                  <td><strong>ID Partisipan:</strong></td>
                  <td>{hasilKlasifikasi && hasilKlasifikasi.id_partisipan}</td>
                </tr>
                <tr>
                  <td><strong>Points:</strong></td>
                  <td>{hasilKlasifikasi && hasilKlasifikasi.points}</td>
                </tr>
                <tr>
                  <td><strong>Klasifikasi:</strong></td>
                  <td>{hasilKlasifikasi && hasilKlasifikasi.klasifikasi}</td>
                </tr>
                <tr>
                  <td colSpan="2">
                    {hasilKlasifikasi &&
                      (hasilKlasifikasi.klasifikasi === "Kecemasan Ringan" ||
                        hasilKlasifikasi.klasifikasi === "Kecemasan Sedang"
                        ? "Anda harus melanjutkan ke tahap intervensi."
                        : "Anda harus melanjutkan ke tahap tes suicide.")}
                  </td>
                </tr>
              </tbody>
            </Table>
            <div className="text-center">
              {hasilKlasifikasi && (
                <Button onClick={handleNavigation}>
                  {hasilKlasifikasi.klasifikasi === "Kecemasan Ringan" ||
                  hasilKlasifikasi.klasifikasi === "Kecemasan Sedang"
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
