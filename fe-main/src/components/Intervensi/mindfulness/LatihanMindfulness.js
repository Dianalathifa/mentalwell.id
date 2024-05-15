import React from 'react';
import { Col, Button, Container } from 'react-bootstrap';
import walking from '../../video/mindfulness-walking.mp4'; // Sesuaikan path dengan lokasi video Anda
import eating from '../../video/mindfulness-eating.mp4'; // Sesuaikan path dengan lokasi video Anda
import Navbar from '../../landing/Navbar.js';
import Footer from '../../landing/Footer.js';

const MBSR = () => {
return (
    <>
    <Navbar />
    <Container>
        <div className="container text-center">
            <h6 className="section-title mb-2 tfonts" style={{ borderColor:"#FFD2DD",color:"#25B7D3", fontWeight:"bold"}}><br />Hello Welcome to Week 2 !<br />Yuk Kita Belajar Tentang Latihan Mindfulness<br /></h6>
            </div>

            <div className="container text-left">
            <br></br><br></br>
            <p style={{color:"black", fontWeight:"bold", fontSize:"20px"}}>Latihan Mindfulness: Menemukan Ketenangan di Tengah Kesibukan</p><br></br>
            <p style={{color:"black", fontWeight:"bold", fontSize:"20px"}}>Mindfulness</p>
            <p style={{color:"black",  fontSize:"20px"}}>
            adalah sebuah praktik melatih kesadaran penuh terhadap momen saat ini. Dengan mindfulness, kita belajar untuk fokus pada apa yang sedang terjadi di sekitar kita, baik secara fisik maupun mental, tanpa menghakimi atau terbawa oleh pikiran dan emosi.
                <br></br><br></br>

                Manfaat Latihan Mindfulness<br></br> 
                - &nbsp;Mengatasi stres dan kecemasan: Mindfulness membantu kita untuk mengelola stres dan kecemasan dengan cara memfokuskan perhatian pada &nbsp;&nbsp;&nbsp;momen saat ini, sehingga kita tidak terjebak dalam kekhawatiran tentang masa depan atau penyesalan tentang masa lalu.<br></br> 
                - &nbsp;Meningkatkan fokus dan konsentrasi: Mindfulness membantu kita untuk melatih fokus dan konsentrasi dengan cara memusatkan perhatian &nbsp;&nbsp;&nbsp;pada satu hal pada satu waktu.<br></br> 
                - &nbsp;Meningkatkan kualitas tidur: Mindfulness membantu kita untuk lebih mudah rileks dan tidur lebih nyenyak.<br></br> 
                - &nbsp;Meningkatkan self-compassion: Mindfulness membantu kita untuk lebih memahami dan menerima diri sendiri, termasuk kekurangan dan &nbsp;&nbsp;&nbsp;kelemahan kita.<br></br> 

                <br></br>
                Jenis-jenis Latihan Mindfulness<br></br>
                - &nbsp;Meditasi: Meditasi adalah salah satu bentuk latihan mindfulness yang paling umum. Dalam meditasi, kita melatih diri untuk fokus pada napas &nbsp;&nbsp;&nbsp;atau mantra tertentu.<br></br>
                - &nbsp;Mindful breathing: Mindful breathing adalah latihan mindfulness yang berfokus pada pernapasan. Dalam mindful breathing, kita mengamati &nbsp;&nbsp;&nbsp;setiap tarikan dan hembusan napas tanpa berusaha untuk mengubahnya.<br></br>
                - &nbsp;Mindful walking: Mindful walking adalah latihan mindfulness yang dilakukan dengan berjalan kaki dengan penuh kesadaran. Saat mindful &nbsp;&nbsp;&nbsp;walking, kita perhatikan setiap langkah kaki dan sensasi yang muncul di tubuh.<br></br>
                - &nbsp;Mindful eating: Mindful eating adalah latihan mindfulness yang dilakukan dengan makan dengan penuh kesadaran. Saat mindful eating, kita &nbsp;&nbsp;&nbsp;perhatikan rasa, tekstur, dan aroma makanan yang kita makan.<br></br>

                <br></br>
                Latihan Mindful Walking<br></br>
                &nbsp;1. Pilih tempat yang tenang dan aman untuk berjalan kaki.<br></br>
                &nbsp;2. Berjalanlah dengan perlahan dan perhatikan setiap langkah kaki anda.<br></br>
                &nbsp;3. Rasakan sensasi kaki anda saat menyentuh tanah.<br></br>
                &nbsp;4. Perhatikan gerakan tubuh anda saat berjalan.<br></br>
                &nbsp;5. Jika pikiran anda mengembara, bawalah kembali perhatian anda ke langkah kaki anda.<br></br>
                
                <br></br>
                Latihan Mindful Eating<br></br>
                &nbsp;1. Pilih makanan yang ingin anda nikmati.<br></br>
                &nbsp;2. Perhatikanpenampilan makanan tersebut.<br></br>
                &nbsp;3. Hirup aroma makanan tersebut.<br></br>
                &nbsp;4. Rasakan tekstur makanan di mulut anda.<br></br>
                &nbsp;5. Kunyah makanan dengan perlahan dan perhatikan rasa yang muncul.<br></br>
                &nbsp;6. Telan makanan dengan penuh kesadaran.<br></br>
                
                <br></br>
                Kesimpulan:<br></br>
                Latihan mindfulness adalah cara sederhana dan efektif untuk meningkatkan kesehatan mental dan fisik. Dengan latihan mindfulness, kita dapat belajar untuk hidup lebih tenang dan bahagia di saat ini.
                </p>

        </div>
        <br></br><br></br><br></br><br></br>
        </Container>

        <section className="section before-content" style={{ backgroundColor: "#FEF2DD", color: "#141313", marginTop: "-10px", paddingTop: "100px", paddingBottom: "100px" }}>
        <Col md={16} className="d-flex align-items-center justify-content">
            <div className="container text-center">
            <h6 className="subtitle" style={{ fontSize: "30px", fontWeight:"bold", color:"#25B7D3"}}>Latihan Mindful Walking</h6> 
            </div>
        </Col>
        <br></br><br></br><br></br>
        <Col md={16} className="d-flex align-items-center justify-content">
        <div className="container text-center">

        <video src={walking} controls style={{ width: "700px", height: "auto", maxWidth: "100%", maxHeight: "100%" }} />      
        <br></br>
        </div>
        </Col>

        </section>
        <section className="section before-content" style={{ backgroundColor: "white", color: "#141313", marginTop: "-10px", paddingTop: "100px", paddingBottom: "100px" }}>
        <Col md={16} className="d-flex align-items-center justify-content">
            <div className="container text-center">
            <h6 className="subtitle" style={{ fontSize: "30px", fontWeight:"bold", color:"#25B7D3"}}>Latihan Mindful Eating</h6> 
            </div>
        </Col>
        <br></br><br></br><br></br>
        <Col md={16} className="d-flex align-items-center justify-content">
        <div className="container text-center">

        <video src={eating} controls style={{ width: "700px", height: "auto", maxWidth: "100%", maxHeight: "100%" }} />      
        <br></br><br></br><br></br>
        <Button variant="light" style={{width: "300px", height: "45px", backgroundColor:"#25B7D3", borderColor:"#25B7D3", color:"white", fontWeight:"bold", fontSize:"20px", borderRadius:"15px"}} href="/mindfulness-2" >Click For Start Challenge</Button>

        </div>
        </Col>

        </section>
        <Footer/>
      </>
    );
};
export default MBSR;
