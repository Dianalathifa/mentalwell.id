import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button, Table } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Navbar from "../landing/Navbar";
import Footer from "../landing/Footer";

const HasilSuicide = () => {
  const [hasilSuicide, setHasilSuicide] = useState(null);
  const [error, setError] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const partisipanId = localStorage.getItem("partisipan_id");

    const ambilHasilSuicide = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/suicide/${partisipanId}`
        );
        setHasilSuicide(response.data);
      } catch (error) {
        setError("Gagal mengambil hasil tes suicide");
      }
    };

    ambilHasilSuicide();
  }, []);

  const goToIntervensi = () => {
    history.push("/intervensidetail-user");
  };

  const goToListPsikolog = () => {
    history.push("/psikolog-list");
  };

  const handleNavigation = () => {
    if (hasilSuicide) {
      const klasifikasi = hasilSuicide.klasifikasi;
      if (klasifikasi === "Resiko Bunuh Diri Rendah" || klasifikasi === "Tidak Ada Resiko Bunuh Diri") {
        goToIntervensi();
      } else {
        goToListPsikolog();
      }
    }
  };

  return (
    <>
      <Navbar />
      <Container className="mt-5">
        <div className="container text-center">
          <h6 className="section-title mb-2 tfonts">
            <br />
            Hasil Suicide
            <br />
          </h6>
        </div>
        <Row>
          <Col>
            <Card>
              <Card.Body>
                {error ? (
                  <p>{error}</p>
                ) : (
                  <div>
                    <Table bordered striped responsive>
                      <tbody>
                        <tr>
                          <td><strong>ID Partisipan:</strong></td>
                          <td>{hasilSuicide && hasilSuicide.id_partisipan}</td>
                        </tr>
                        <tr>
                          <td><strong>Klasifikasi:</strong></td>
                          <td>{hasilSuicide && hasilSuicide.klasifikasi}</td>
                        </tr>
                        <tr>
                          <td colSpan="2">
                            {hasilSuicide &&
                              (hasilSuicide.klasifikasi === "Resiko Bunuh Diri Rendah" ||
                                hasilSuicide.klasifikasi === "Tidak Ada Resiko Bunuh Diri"
                                  ? "Anda tidak memiliki resiko bunuh diri."
                                  : "Anda memiliki resiko bunuh diri.")}
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                    {hasilSuicide && (
                      <Button onClick={handleNavigation}>
                        {hasilSuicide.klasifikasi === "Resiko Bunuh Diri Rendah" ||
                        hasilSuicide.klasifikasi === "Tidak Ada Resiko Bunuh Diri"
                          ? "Lanjutkan ke Intervensi"
                          : "Temui Psikolog"}
                      </Button>
                    )}
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <br />
      <br />
      <Footer />
    </>
  );
};

export default HasilSuicide;
