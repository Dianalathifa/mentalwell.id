import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Navbar from '../../landing/Navbar.js';
import CBT1 from '../../images/CBT/CBT2.png';
import CBT2 from '../../images/CBT/CBT2.png';
import CBT3 from '../../images/CBT/CBT2.png';
import CBT4 from '../../images/CBT/CBT2.png';
import CBT5 from '../../images/CBT/CBT2.png';
import CBT6 from '../../images/CBT/CBT2.png';
import CBT7 from '../../images/CBT/CBT2.png';
import Footer from '../../landing/Footer.js';
import "../../style/Intervensi.css";


const CBTPerasaan = () => {
    const [tasks, setTasks] = useState([]);
  
    useEffect(() => {
      fetchTasks();
    }, []);
  
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:8080/daily-tasks-sessions/3");
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching task data:", error);
      }
    };

  return (
    <>
      <Navbar />
      <div className="container text-center" style={{paddingTop:"150px"}}>
        <h6 className="section-title mb-2 tfonts-2"><br />Pahami Emosimu, Kendalikan Depresimu: Intervensi CBT Ini Untukmu!<br /><br /></h6>
      </div>

            <div className="container text-left" style={{maxWidth:"1100px"}}>
                <br></br><br></br>
                <p style={{color:"black", fontWeight:"bold", fontSize:"20px"}}>Selamat datang di tantangan 7 hari kendalikan perasaan!</p><br></br>
                <p style={{color:"black",  fontSize:"20px"}}>
                Selamat datang di tantangan 7 hari kendalikan pikiran! Selama seminggu ini, kita akan fokus pada mengenali dan mengubah pola pikir negatif yang dapat berkontribusi terhadap depresi.
                </p>

                <br/>
                <p style={{color:"black",  fontSize:"20px"}}>
                    Setiap hari, kamu akan menerima tugas kecil yang akan membantumu:<br/>
                    - &nbsp;Mengenali dan memahami emosimu<br/>
                    - &nbsp;Mengembangkan mekanisme koping yang seha<br/>
                    - &nbsp;Mengubah cara kamu memandang situasi dan peristiwa<br/>
                    </p>

                <br/>
               
                <div className="container text-center">
            <h3 className="section-title mb-2 tfonts-2" style={{ borderColor:"#FFD2DD",color:"#25B7D3", fontWeight:"bold"}}><br />Yuk, mulai tantangannya !<br /></h3>
            </div>
                                     
        </div>
            
      <div className="container justify-content-center" style={{marginLeft:"100px", marginBottom:"100px", marginTop:"30px"}}>
        <div className="row">
        {tasks.map((task) => (
            <TaskCard key={task.id_task} task={task} />
          ))}
        </div>
      </div>
      

      <Footer />
    </>
  );
};


const TaskCard = ({ task }) => {
  const { no_hari, judul_task, id_task } = task;
  const imageMap = {
    1: CBT1,
    2: CBT2,
    3: CBT3,
    4: CBT4,
    5: CBT5,
    6: CBT6,
    7: CBT7
  };
  const imageSrc = imageMap[no_hari] || CBT2; 

  return (
    <div className="col-md-auto mb-4" style={{ margin:"5px" }}>
      <Card style={{ width: '9rem', height: '18rem' }}>
        <Card.Img variant="top" src={imageSrc} style={{ height: '60%', objectFit: 'cover' }} />
        <Card.Body>
          <Link to={`/daily-task-detail/${id_task}`} className="stretched-link"></Link>
          <Card.Text className="text-center" style={{ height: '50px', fontSize: '12px' }}> {judul_task}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CBTPerasaan;
