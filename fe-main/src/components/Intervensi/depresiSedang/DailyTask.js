import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Navbar from "../../landing/Navbar.js";
import Footer from "../../landing/Footer.js";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:8080/daily-tasks-sessions/2");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching task data:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container text-center">
        <h6 className="section-title mb-2 tfonts"><br />7 Hari Tantangan Kendalikan Pikiran untuk Mengatasi Depresi<br /><br /></h6>
      </div>

      <div className="container text-left">
        <br /><br />
        <p style={{ color: "black", fontWeight: "bold", fontSize: "20px" }}>7 Hari Tantangan Kendalikan Pikiran untuk Mengatasi Depresi!</p><br />
        <p style={{ color: "black", fontSize: "20px" }}>
          Selamat datang di tantangan 7 hari kendalikan pikiran! Selama seminggu ini, kita akan fokus pada mengenali dan mengubah pola pikir negatif yang dapat berkontribusi terhadap depresi.
        </p>
        <br />
        <p style={{ color: "black", fontSize: "20px" }}>
          Setiap hari, kamu akan menerima tugas kecil yang akan membantumu:<br />
          - &nbsp;Mengenali pola pikir negatifmu sendiri<br />
          - &nbsp;Menantang pikiran negatif tersebut<br />
          - &nbsp;Mengembangkan pola pikir yang lebih positif dan realistis<br />
        </p>
        <br />
        <div className="container text-center">
          <h3 className="section-title mb-2 tfonts" style={{ borderColor: "#FFD2DD", color: "#25B7D3", fontWeight: "bold" }}><br />Yuk, mulai tantangannya!<br /></h3>
        </div>
      </div>
      <br /><br /><br /><br />

      <div className="container">
        <div className="row">
          {tasks.map((task) => (
            <TaskCard key={task.id_task} task={task} />
          ))}
        </div>
        <br /><br /><br /><br />
      </div>

      <Footer />
    </>
  );
};

const TaskCard = ({ task }) => {
  const { no_hari, judul_task, id_task } = task;
  const imageSrc = `../../images/CBT/CBT${no_hari}.png`; // Assuming each day has a corresponding image

  return (
    <div className="col-md-3 mb-4" style={{ marginLeft: "80px" }}>
      <Card style={{ width: '20rem' }}>
        <Card.Img variant="top" src={imageSrc} style={{ height: '600px' }} />
        <Card.Body>
          <Link to={`/daily-task-detail/${task.id_task}`} className="stretched-link"></Link>
          <Card.Text className="text-center" style={{ height: '50px' }}>Day {no_hari}: {judul_task}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default TaskList;
