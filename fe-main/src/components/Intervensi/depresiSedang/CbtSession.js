import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button } from "react-bootstrap";

const UserCbtSessions = () => {
  const [sessions, setSessions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const response = await axios.get("http://localhost:8080/cbt-sessions");
      setSessions(response.data);
    } catch (error) {
      setError("Error fetching session data. Please try again later.");
      console.error("Error fetching session data:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Kelola Depresi dengan Cognitive Behaviour Therapy</h2>
      <div className="row">
        {sessions.map((session) => (
          <div className="col-md-4 mb-4" key={session.id_session}>
            <Card>
              {/* Gambar dapat ditambahkan di sini */}
              <Card.Body>
                <Card.Title>{session.judul_session}</Card.Title>
                <Card.Text>{session.deskripsi_session}</Card.Text>
                <Card.Text>Durasi: {session.durasi_session} hari</Card.Text>
                <Button variant="primary">Yuk Mulai!</Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserCbtSessions;
