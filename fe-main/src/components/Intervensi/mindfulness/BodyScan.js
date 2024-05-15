import React from 'react';
import { Col, Button, Container } from 'react-bootstrap';
import breathing1 from '../../video/mindfulness-breathing1.mp4'; // Sesuaikan path dengan lokasi video Anda
import bodyscan1 from '../../video/mindfulness-bodyscan1.mp4'; // Sesuaikan path dengan lokasi video Anda
// import breathing2 from '../../video/mindfulness-breathing2.mp4'; // Sesuaikan path dengan lokasi video Anda
// import breathing3 from '../../video/mindfulness-breathing3.mp4'; // Sesuaikan path dengan lokasi video Anda
// import bodyscan2 from '../../video/mindfulness-bodyscan2.mp4'; // Sesuaikan path dengan lokasi video Anda
// import bodyscan3 from '../../video/mindfulness-bodyscan3.mp4'; // Sesuaikan path dengan lokasi video Anda
import Navbar from '../../landing/Navbar.js';
import Footer from '../../landing/Footer.js';

const MBSR = () => {
return (
    <>
    <Navbar />
    <Container>
        <div className="container text-center">
            <h6 className="section-title mb-2 tfonts" style={{ borderColor:"#FFD2DD",color:"#25B7D3", fontWeight:"bold"}}><br />Hello Welcome to Week 3 !<br />Yuk Kita Belajar Tentang Mindful Body Scan dan Mindful Breathing <br /></h6>
            </div>

            <div className="container text-left">
            <br></br><br></br>
            <p style={{color:"black", fontWeight:"bold", fontSize:"20px"}}>Mindful body scan dan mindful breathing adalah teknik meditasi yang bisa dipraktekkan untuk meningkatkan kesadaran diri dan mengurangi stres.</p><br></br>
            <p style={{color:"black",  fontSize:"20px"}}>
            - &nbsp;Mindful breathing berfokus pada perhatian terhadap sensasi napas. Anda mengamati napas masuk dan keluar, tanpa berusaha mengatur pola &nbsp;&nbsp;&nbsp;pernapasan.<br></br>
            - &nbsp;Mindful body scan adalah meditasi yang melibatkan pemindaian mental terhadap seluruh tubuh. Anda mengarahkan perhatian ke berbagai &nbsp;&nbsp;&nbsp;bagian tubuh, merasakan sensasi yang ada tanpa penilaian                
            <br></br><br></br>

            <p style={{color:"black", fontWeight:"bold", fontSize:"20px"}}>Manfaat Mindful Body Scan dan Mindful Breathing</p>
                - &nbsp;Mengurangi stres dan kecemasan<br></br> 
                - &nbsp;Meningkatkan relaksasi<br></br> 
                - &nbsp;Meningkatkan kesadaran diri<br></br> 
                - &nbsp;Membantu mengelola rasa sakit kronis<br></br> 
                - &nbsp;Meningkatkan kualitas tidur<br></br> 
                - &nbsp;Menurunkan tekanan darah<br></br> 

                <br></br>
                <p style={{color:"black", fontWeight:"bold", fontSize:"20px"}}>Cara Melakukan Mindful Body Scan dan Mindful Breathing<br></br>Mindful Breathing:</p>
                &nbsp;1. Cari posisi yang nyaman, bisa duduk atau berbaring.<br></br>
                &nbsp;2. Tutup mata atau biarkan pandangan lembut ke bawah.<br></br>
                &nbsp;3. Fokuskan perhatian pada sensasi napas. Rasakan udara masuk melalui hidung dan keluar melalui mulut atau hidung.<br></br>
                &nbsp;4. Perhatikan perut yang naik turun saat bernapas.<br></br>
                &nbsp;5. Pikiran akan mengembara, itu wajar. Lembut saja arahkan perhatian kembali ke napas saat Anda tersadar.<br></br>
                &nbsp;6. Lakukan selama 5-10 menit atau lebih lama jika nyaman.<br></br>

                <br></br>
                <p style={{color:"black", fontWeight:"bold", fontSize:"20px"}}>Mindful Body Scan:</p>
                &nbsp;1. Posisi sama seperti mindful breathing.<br></br>
                &nbsp;2. Tarik napas dalam dan embuskan perlahan.<br></br>
                &nbsp;3. Mulailah fokuskan perhatian pada bagian atas kepala. Rasakan sensasi apapun yang ada, seperti kehangatan, kesemutan, atau relaksasi. <br></br>&nbsp;&nbsp;&nbsp;&nbsp;Tidak perlu ada penilaian.<br></br>
                &nbsp;4. Perlahan pindaikan perhatian ke seluruh tubuh, area demi area. Leher, bahu, lengan, dada, punggung, dan seterusnya hingga ke ujung jari kaki.<br></br>
                &nbsp;5. Saat Anda menemukan area yang tegang, coba bayangkan napas mengalir ke sana dan melunakkan ketegangan tersebut.<br></br>
                &nbsp;6. Lanjutkan pemindaian hingga seluruh tubuh tercakup.<br></br>
                &nbsp;7. Setelah selesai, luangkan waktu sejenak untuk merasakan keseluruhan tubuh Anda.<br></br>
                
            
                </p>

        </div>
        <br></br><br></br><br></br><br></br>
        </Container>

        <section className="section before-content" style={{ backgroundColor: "#FEF2DD", color: "#141313", marginTop: "-10px", paddingTop: "100px", paddingBottom: "100px" }}>
        <Col md={16} className="d-flex align-items-center justify-content">
            <div className="container text-center">
            <h6 className="subtitle" style={{ fontSize: "40px", fontWeight:"bold", color:"#25B7D3"}}>Latihan Mindful Breathing</h6> 
            </div>
        </Col>
        <br></br><br></br><br></br>
        <Col md={12} className="d-flex align-items-center justify-content">
        <div className="container text-center">

        <video src={breathing1} controls style={{ width: "600px", height: "auto", maxWidth: "100%", maxHeight: "100%" }} />    
        {/* <video src={breathing2} controls style={{ width: "400px", height: "auto", maxWidth: "100%", maxHeight: "100%" }} /> &nbsp;&nbsp;&nbsp;&nbsp;     
        <video src={breathing3} controls style={{ width: "400px", height: "auto", maxWidth: "100%", maxHeight: "100%" }} /> &nbsp;&nbsp;&nbsp;&nbsp;      */}
        
        <br></br><br></br><br></br><br></br>
        </div>
        </Col>

        </section>
        <section className="section before-content" style={{ backgroundColor: "white", color: "#141313", marginTop: "-10px", paddingTop: "100px", paddingBottom: "100px" }}>
        <Col md={16} className="d-flex align-items-center justify-content">
            <div className="container text-center">
            <h6 className="subtitle" style={{ fontSize: "40px", fontWeight:"bold", color:"#25B7D3"}}>Latihan Mindful Scan</h6> 
            </div>
        </Col>
        <br></br><br></br><br></br>
        <Col md={12} className="d-flex align-items-center justify-content">
        <div className="container text-center">

        <video src={bodyscan1} controls style={{ width: "600px", height: "auto", maxWidth: "100%", maxHeight: "100%" }} />    
        {/* <video src={bodyscan2} controls style={{ width: "400px", height: "auto", maxWidth: "100%", maxHeight: "100%" }} /> &nbsp;&nbsp;&nbsp;&nbsp;     
        <video src={bodyscan3} controls style={{ width: "400px", height: "auto", maxWidth: "100%", maxHeight: "100%" }} /> &nbsp;&nbsp;&nbsp;&nbsp;      */}
       
        <br></br><br></br><br></br><br></br>
        <Button variant="light" style={{width: "300px", height: "45px", backgroundColor:"#25B7D3", borderColor:"#25B7D3", color:"white", fontWeight:"bold", fontSize:"20px", borderRadius:"15px"}} href="/mindfulness-3" >Click For Start Challenge</Button>

        </div>
        </Col>

        </section>
        <Footer/>
      </>
    );
};
export default MBSR;
