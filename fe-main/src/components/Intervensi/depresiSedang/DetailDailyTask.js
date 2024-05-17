import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";
import Navbar from '../../landing/Navbar.js';
import Footer from '../../landing/Footer.js';

const DailyTaskDetail = () => {
  const { id } = useParams(); // Get task ID from URL parameters
  const [task, setTask] = useState(null); // State to store task details
  const [response, setResponse] = useState(""); // State to store user response
  const [error, setError] = useState(null); // State to store error messages
  const [success, setSuccess] = useState(null); // State to store success messages

  useEffect(() => {
    fetchTask(); // Fetch task details when component mounts
  }, [id]); // Dependency array to trigger useEffect when task ID changes

  const fetchTask = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/daily-tasks/${id}`);
      setTask(response.data); // Set task details in state
    } catch (error) {
      setError("Error fetching task data. Please try again later.");
      console.error("Error fetching task data:", error);
    }
  };

  const handleResponseSubmit = async (e) => {
    e.preventDefault();
    const id_partisipan = localStorage.getItem('partisipan_id'); // Get id_partisipan from localStorage

    if (!id_partisipan) {
      setError("Participant ID not found in local storage.");
      return;
    }

    try {
      await axios.post("http://localhost:8080/cbt-responses", {
        id_task: task.id_task,
        id_partisipan,
        response,
        submission_date: new Date().toISOString().split("T")[0],
      });
      setSuccess("Response submitted successfully!");
      setResponse(""); // Clear response input after submission
    } catch (error) {
      setError("Error submitting response. Please try again later.");
      console.error("Error submitting response:", error);
    }
  };

  return (
    <>
        <Navbar/>
        <Container>
      {task ? (
        
        <Container>
          <div className="container text-center">
          <h6 className="section-title mb-2 tfonts" style={{marginTop:"60px", marginBottom:"100px"}}>Welcome to Day {task.no_hari}</h6>
          </div>
          <Card className="mb-4" style={{borderRadius:"25px", backgroundColor:"#25B7D3", color:"white"}}>
            <Card.Body >
              <Card.Title>{task.judul_task}</Card.Title>
              <Card.Text>{task.deskripsi_task}</Card.Text>
            </Card.Body>
          </Card>
          <Card className="mb-4" style={{borderRadius:"25px", backgroundColor:"#FFD2DD"}}>
            <Card.Body>
              <Card.Title>Tips</Card.Title>
              <Card.Text>{task.tips_task}</Card.Text>
            </Card.Body>
          </Card>
          <Form onSubmit={handleResponseSubmit}>
            <Form.Group controlId="formResponse">
              <Form.Label>Your Response</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={response}
                onChange={(e) => setResponse(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit" style={{marginBottom:"60px", marginTop:"30px"}}>
              Submit
            </Button>
          </Form>
          {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
          {success && <Alert variant="success" className="mt-3">{success}</Alert>}
          </Container>
      ) : (
        <p>Loading task details...</p>
      )}           
    </Container>
    <Footer/>

    </>

  );
};

export default DailyTaskDetail;
