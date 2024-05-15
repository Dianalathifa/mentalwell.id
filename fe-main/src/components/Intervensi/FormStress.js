import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Button, Form } from 'react-bootstrap';
import Navbar from '../landing/Navbar.js';

const FormPage = () => {
  const [intervention, setIntervention] = useState({});
  const [userAnswer, setUserAnswer] = useState('');
  const { id } = useParams();

  useEffect(() => {
    fetchIntervention();
  }, [id]);

  const fetchIntervention = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/intervensi/${id}`);
      if (response.ok) {
        const data = await response.json();
        setIntervention(data); // Mendapatkan intervensi berdasarkan ID
      } else {
        console.error('Gagal memuat data intervensi');
      }
    } catch (error) {
      console.error('Terjadi kesalahan:', error);
    }
  };

  const handleChange = (event) => {
    setUserAnswer(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      // Ambil id_partisipan dari localStorage
      const idPartisipan = localStorage.getItem('partisipan_id');
      
      const response = await fetch('http://localhost:8080/api/jawaban-intervensi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id_intervensi: id, id_partisipan: idPartisipan, respon: userAnswer }) // Mengirim jawaban beserta ID intervensi dan id_partisipan
      });
      if (response.ok) {
        console.log('Jawaban berhasil dikirim ke database');
        // Reset field jawaban setelah dikirim
        setUserAnswer('');
      } else {
        console.error('Gagal mengirim jawaban ke database');
      }
    } catch (error) {
      console.error('Terjadi kesalahan:', error);
    }
  };

  return (
    <>
      <Navbar />
      {/* <div className="container text-center">
        <h6 className="section-title mb-2 tfonts"><br />30 Days Writing Challenge<br /><br /></h6>
      </div> */}
      <br/><br/><br/><br/>
      {intervention && (
        <div className="container text-center mb-6">
          <h5 style={{fontSize:"40px"}}>{intervention.deskripsi_challenge}</h5>
        </div>
      )}
      <div className="container text-center">
      <Form>
      <Form.Group controlId="userAnswer">
        <Form.Control 
          as="textarea" 
          rows={6}  // Ubah jumlah baris menjadi 6 untuk membuat form lebih besar
          value={userAnswer} 
          onChange={handleChange} 
          placeholder="Masukkan jawaban Anda di sini" 
          style={{ minHeight: '150px', fontSize: '20px' }} // Atur tinggi minimal dan ukuran font
        />
      </Form.Group>
      <br/><br/>
      <Button 
  style={{ 
    backgroundColor:"#25B7D3", 
    color:"white", 
    fontWeight:"bold", 
    padding: '12px 25px', // Atur padding untuk mengatur ukuran tombol
    fontSize: '20px' // Atur ukuran font jika diperlukan
  }} 
  variant="light" 
  onClick={handleSubmit}>Submit </Button>
    </Form>

      </div>
    </>
  );
};

export default FormPage;
