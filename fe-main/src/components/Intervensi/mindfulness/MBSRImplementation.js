import React from 'react';
import { Col, Button, Container } from 'react-bootstrap';
import Navbar from '../../landing/Navbar.js';
import Footer from '../../landing/Footer.js';

const MBSR = () => {
return (
    <>
    <Navbar />
    <Container>
        <div className="container text-center">
            <h6 className="section-title mb-2 tfonts" style={{ borderColor:"#FFD2DD",color:"#25B7D3", fontWeight:"bold"}}><br />Hello Welcome to Week 4 !<br />Penerapan MBSR (Mindfulness-Based Stress Reduction)<br /></h6>
            </div>

            <div className="container text-left">
            <br></br><br></br>
            <p style={{color:"black", fontWeight:"bold", fontSize:"20px"}}>MBSR (Mindfulness-Based Stress Reduction) dalam Kehidupan Sehari-hari</p><br></br>
            <p style={{color:"black",  fontSize:"20px"}}>
            MBSR (Mindfulness-Based Stress Reduction) adalah program latihan meditasi yang dirancang untuk membantu individu mengelola stres dan meningkatkan kesejahteraan. 
            Program ini menggabungkan teknik mindfulness, seperti meditasi kesadaran diri dan pemindaian tubuh, dengan latihan kesadaran dalam aktivitas sehari-hari.               
            <br></br><br></br>

            <p style={{color:"black", fontWeight:"bold", fontSize:"20px"}}>Cara Menerapkan MBSR dalam Kehidupan Sehari-hari:</p>
                - &nbsp;Latihan formal: Dedikasikan waktu 10-30 menit setiap hari untuk meditasi formal, seperti mindful breathing atau body scan.<br></br> 
                - &nbsp;Kesadaran dalam aktivitas:  mindfulness dalam aktivitas sehari-hari, seperti makan, berjalan, atau mandi. Perhatikan sensasi fisik, suara, dan &nbsp;&nbsp;&nbsp;pikiran tanpa penilaian.<br></br> 
                - &nbsp;Komunikasi mindful: Saat berkomunikasi, dengarkan dengan penuh perhatian dan tanpa terdistraksi. Berbicaralah dengan tenang dan penuh &nbsp;&nbsp;&nbsp;kesadaran.<br></br> 
                - &nbsp;Menangani stres: Gunakan teknik mindfulness untuk mengelola stres saat muncul. Tarik napas dalam, akui perasaan Anda, dan tanggapi situasi &nbsp;&nbsp;&nbsp;dengan penuh kesadaran.<br></br> 
                - &nbsp;Apresiasi momen: Luangkan waktu untuk menghargai momen-momen kecil dalam hidup. Perhatikan keindahan alam, rasa makanan, atau &nbsp;&nbsp;&nbsp;kebersamaan dengan orang terkasih.<br></br> 

                <br></br>
                <p style={{color:"black", fontWeight:"bold", fontSize:"20px"}}>Mengatasi Hambatan dalam Mempraktikkan MBSR:</p>
                - &nbsp;Kurangnya waktu: Sisihkan waktu singkat setiap hari, bahkan 5 menit, untuk latihan mindfulness.<br></br>
                - &nbsp;Pikiran yang mengembara: Ini wajar. Lembut saja arahkan perhatian kembali ke fokus meditasi.<br></br>
                - &nbsp;Ketidaknyamanan: Perhatikan sensasi ketidaknyamanan tanpa penilaian. Biarkan sensasi tersebut berlalu tanpa terikat.<br></br>
                - &nbsp;Keraguan diri: Percayalah pada kemampuan Anda untuk belajar dan berkembang dalam latihan mindfulness.<br></br>

                <br></br>
                <p style={{color:"black", fontWeight:"bold", fontSize:"20px"}}>Tips untuk Mempertahankan Kebiasaan Mindfulness:</p>
                - &nbsp;Bergabung dengan komunitas: Bergabunglah dengan kelompok meditasi atau ikuti kelas online untuk mendapatkan dukungan dan motivasi.<br></br>
                - &nbsp;Gunakan pengingat: Gunakan aplikasi pengingat atau atur alarm untuk mengingatkan Anda untuk berlatih mindfulness.<br></br>
                - &nbsp;Temukan partner: Berlatihlah mindfulness bersama teman atau keluarga untuk saling menyemangati.<br></br>
                - &nbsp;Bersabarlah: Membangun kebiasaan mindfulness membutuhkan waktu dan latihan. Jangan berkecil hati jika Anda mengalami kemunduran.<br></br>
                
                </p>

        </div>
        <br></br><br></br><br></br><br></br>
        </Container>
        <Col md={16} className="d-flex align-items-center justify-content">
            <div className="container text-center">
                <Button variant="light" style={{width: "300px", height: "45px", backgroundColor:"#25B7D3", borderColor:"#25B7D3",color:"white", fontWeight:"bold", fontSize:"20px", borderRadius:"15px"}} href="/mindfulness-4" >Click For Start Challenge</Button>
            </div>
        </Col>
        <br></br><br></br><br></br><br></br>
        <Footer/>
      </>
    );
};
export default MBSR;
