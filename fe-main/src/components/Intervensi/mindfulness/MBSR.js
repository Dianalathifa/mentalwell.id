import React from 'react';
import { Col, Button, Container } from 'react-bootstrap';
import week1 from '../../video/mindfulness-week1.mp4'; // Sesuaikan path dengan lokasi video Anda
import Navbar from '../../landing/Navbar.js';
import Footer from '../../landing/Footer.js';

const MBSR = () => {
return (
    <>
    <Navbar />
    <Container>
        <div className="container text-center">
            <h6 className="section-title mb-2 tfonts" style={{ borderColor:"#FFD2DD",color:"#25B7D3", fontWeight:"bold"}}><br />Hello Welcome to Week 1 !<br />Yuk Kita Belajar Apa itu MBSR?<br /></h6>
            </div>

            <div className="container text-left">
            <br></br><br></br>
            <p style={{color:"black", fontWeight:"bold", fontSize:"20px"}}>Mindfulness-Based Stress Reduction (MBSR)</p><br></br>
            <p style={{color:"black",  fontSize:"20px"}}>
                Apa itu MBSR?<br></br>
                MBSR adalah singkatan dari Mindfulness-Based Stress Reduction, sebuah program pelatihan meditasi yang dirancang untuk
                membantu orang mengelola stres dan meningkatkan kesehatan mental. Program ini dikembangkan oleh Jon Kabat-Zinn 
                di University of Massachusetts Medical School pada tahun 1979.
                <br></br><br></br>

                Manfaat MBSR untuk mengatasi neurotik<br></br> 
                - &nbsp;Meningkatkan kesadaran diri: MBSR membantu Anda untuk lebih menyadari pikiran, perasaan, dan sensasi tubuh Anda. Hal ini dapat membantu &nbsp;&nbsp;&nbsp;Anda untuk lebih memahami diri sendiri dan bagaimana Anda bereaksi terhadap stres.<br></br> 
                - &nbsp;Mengurangi stres dan kecemasan: MBSR membantu Anda untuk mengelola stres dan kecemasan dengan lebih baik. Anda akan belajar bagaimana &nbsp;&nbsp;&nbsp;untuk mengidentifikasi dan melepaskan pikiran dan perasaan negatif, dan bagaimana untuk merespon stres dengan cara yang lebih tenang dan &nbsp;&nbsp;&nbsp;konstruktif.<br></br> 
                - &nbsp;Meningkatkan kemampuan untuk fokus dan berkonsentrasi: MBSR membantu Anda untuk meningkatkan kemampuan untuk fokus dan &nbsp;&nbsp;&nbsp;berkonsentrasi. Anda akan belajar bagaimana untuk mengarahkan perhatian Anda dan untuk tidak terjebak dalam pikiran dan perasaan yang &nbsp;&nbsp;&nbsp;mengganggu.<br></br> 
                - &nbsp;Meningkatkan kualitas tidur: MBSR dapat membantu Anda untuk meningkatkan kualitas tidur. Anda akan belajar bagaimana untuk rileks dan &nbsp;&nbsp;&nbsp;melepaskan stres sebelum tidur, dan bagaimana untuk tidur lebih nyenyak.<br></br> 
                - &nbsp;Meningkatkan self-compassion: MBSR membantu Anda untuk mengembangkan self-compassion, yaitu kemampuan untuk menerima diri &nbsp;&nbsp;&nbsp;sendiri dengan segala kekurangan dan kelemahan. Hal ini dapat membantu Anda untuk lebih berdamai dengan diri sendiri dan untuk &nbsp;&nbsp;&nbsp;mengurangi kritik diri.<br></br> 
                - &nbsp;Meningkatkan kemampuan untuk mengelola emosi: MBSR membantu Anda untuk mengelola emosi Anda dengan lebih baik. Anda akan belajar &nbsp;&nbsp;&nbsp;bagaimana untuk mengidentifikasi dan menerima emosi Anda, dan bagaimana untuk mengekspresikan emosi Anda dengan cara yang sehat.<br></br> 

                <br></br>
                Cara mempraktikkan MBSR<br></br>
                MBSR diajarkan dalam format kelompok selama 4 minggu. Peserta belajar berbagai teknik meditasi dan mindfulness, seperti:<br></br>
                - &nbsp;Meditasi pernapasan: Anda akan belajar untuk fokus pada pernapasan Anda dan untuk mengamati pikiran dan perasaan Anda tanpa &nbsp;&nbsp;&nbsp;menghakimi.<br></br>
                - &nbsp;Body scan: Anda akan belajar untuk memindai tubuh Anda dengan perhatian dan untuk merasakan sensasi tubuh Anda.<br></br>
                - &nbsp;Mindful walking: Anda akan belajar untuk berjalan dengan penuh perhatian dan untuk menyadari lingkungan Anda.<br></br>
                - &nbsp;Mindful eating: Anda akan belajar untuk makan dengan penuh perhatian dan untuk menyadari rasa dan tekstur makanan Anda.<br></br>

                <br></br>
                Latihan meditasi singkat<br></br>
                Berikut adalah contoh latihan meditasi singkat yang dapat Anda lakukan di rumah:<br></br>
                - &nbsp;Duduklah dengan nyaman di kursi atau di lantai dengan punggung tegak.<br></br>
                - &nbsp;Tutup mata Anda atau arahkan pandangan Anda ke bawah.<br></br>
                - &nbsp;Fokuskan perhatian Anda pada pernapasan Anda. Rasakan sensasi napas yang masuk dan keluar dari hidung Anda.<br></br>
                - &nbsp;Jika pikiran Anda mengembara, dengan lembut bawa kembali perhatian Anda ke pernapasan Anda.<br></br>
                - &nbsp;Ikuti alur meditasi dibawah.
                </p>
        </div>
        <br></br><br></br><br></br><br></br>
        </Container>

        <section className="section before-content" style={{ backgroundColor: "#FEF2DD", color: "#141313", marginTop: "-10px", paddingTop: "100px", paddingBottom: "100px" }}>
        <Col md={16} className="d-flex align-items-center justify-content">
            <div className="container text-center">
            <h6 className="subtitle" style={{ fontSize: "25px", fontWeight:"bold", color:"#25B7D3"}}>Mari kita temukan kedamaian dalam keheningan. <br></br>Ayo mulai sesi meditasi untuk menenangkan pikiran dan menyegarkan jiwa kita bersama!</h6> 
            </div>
        </Col>
        <br></br><br></br><br></br>
        <Col md={16} className="d-flex align-items-center justify-content">
        <div className="container text-center">

        <video src={week1} controls style={{ width: "700px", height: "auto", maxWidth: "100%", maxHeight: "100%" }} />      
        <br></br><br></br><br></br>
        <Button variant="light" style={{width: "300px", height: "45px", backgroundColor:"white", borderColor:"white",color:"#25B7D3", fontWeight:"bold", fontSize:"20px", borderRadius:"15px"}} href="/mindfulness-1" >Click For Start Challenge</Button>

        </div>
        </Col>

        </section>
        <Footer/>
      </>
    );
};
export default MBSR;
