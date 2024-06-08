// import React from 'react';
// import { Col, Button, Container, Row } from 'react-bootstrap';
// import { Link } from "react-router-dom/cjs/react-router-dom.min.js";
// import Navbar from '../../landing/Navbar.js';
// import Footer from '../../landing/Footer.js';
// import LazyLoad from 'react-lazyload';
// import stress from "../../images/intervensi/strees2.png";
// import alone from "../../images/intervensiStress/alone.jpg";
// import writing from "../../images/intervensiStress/writing.png";
// import challenge from "../../images/intervensiStress/challenge.jpg";
// import question1 from "../../images/intervensiStress/question1.png";
// import "../../style/Intervensi.css";

// const ChallengeDetail = () => {
//   return (
//     <>
//       <Navbar />
//       <div style={{marginTop:"150px"}}>
//         <Container className="mt-5" style={{ padding: "100px", backgroundColor: "#D9D9D9", borderRadius: "50px" }}>
//           <Row className="justify-content-center">
//             <Col md={5}>
//               <h6 style={{ fontSize: "35px", marginTop: "30px", fontWeight: "bold" }}>
//                 Intervensi Stress Sedang
//               </h6>
//               <h6 style={{ fontSize: "50px", fontWeight: "bold" }}>
//                 30 Day Writing Challenge
//               </h6>
//               <Link to="/intervensi30days-user">
//                 <Button
//                   variant="light"
//                   className="custom-button"
//                   style={{
//                     marginTop: "20px",
//                     borderRadius: "50px",
//                     backgroundColor: "#7F91D8",
//                     fontWeight: "bold",
//                     padding: '17px 20px',
//                     fontSize: '16px'
//                   }}
//                 >
//                   Yuk Ikuti Langkah-langkahnya!
//                 </Button>
//               </Link>
//             </Col>
//             <Col md={4} className="d-flex align-items-center justify-content-center">
//               <LazyLoad height={200} offset={100}>
//                 <img src={stress} alt="Image" style={{ maxWidth: "100%", maxHeight: "100%" }} />
//               </LazyLoad>
//             </Col>
//           </Row>
//         </Container>
//         </div>

//         <Container className="my-5">
//           <Row className="justify-content-center" style={{ marginTop: "100px" }}>
//             <Col md={6}>
//               <p style={{ fontSize: "20px", marginTop: "20px" }}>
//                 Selamat datang di program 30 Day Writing Challenge, sebuah intervensi yang dirancang khusus untuk kamu yang sedang merasakan stres.
//                 Hidup sebagai remaja sering kali penuh dengan berbagai tekanan, baik dari sekolah, lingkungan sosial, maupun keluarga.
//                 Semua itu bisa membuat kamu merasa kewalahan dan kelelahan. Tapi jangan khawatir, kamu tidak sendiri.
//               </p>
//             </Col>
//             <Col md={4} className="d-flex align-items-center justify-content-center">
//               <LazyLoad height={200} offset={100}>
//                 <img src={alone} alt="Image" style={{ maxWidth: "100%", maxHeight: "100%", borderRadius: "20px", width: "300px", height: "200px" }} />
//               </LazyLoad>
//             </Col>
//           </Row>
//         </Container>

//         <Container className="my-5">
//           <Row className="justify-content-center">
//             <Col md={4} className="d-flex align-items-center justify-content-center">
//               <LazyLoad height={200} offset={100}>
//                 <img src={writing} alt="Image" style={{ marginTop: "30px", borderRadius: "20px", width: "300px", height: "200px" }} />
//               </LazyLoad>
//             </Col>
//             <Col md={6}>
//               <h5 style={{ fontSize: "25px", fontWeight: "bold", marginTop: "10px" }}>
//                 <br></br>30 Days Challenge: Penjelasan Singkat<br></br>
//               </h5>
//               <p style={{ fontSize: "20px", marginTop: "15px" }}>
//                 Melalui program ini, kamu memiliki kesempatan untuk mengenali diri sendiri dan menjadi lebih peduli dengan dirimu.
//                 Salah satu cara yang efektif mengurangi stres adalah dengan telling story atau bercerita.
//                 Dengan bercerita, kamu bisa mengekspresikan perasaan,
//                 pikiran, dan pengalaman yang mungkin sulit diungkapkan secara lisan.
//                 Metode ini tidak hanya membantu mengurangi beban emosional, tetapi juga memberikan ruang untuk refleksi dan pengembangan diri.
//               </p>
//             </Col>
//           </Row>
//         </Container>

//         <Container className="my-6">
//           <Row className="justify-content-center">
//             <Col md={{ span: 2, offset: 0.5 }}>
//               <h1 style={{ fontSize: "18px", fontWeight: "bold", color: "#0C38B5" }}>
//                 <br></br><br></br>Telling story dalam bentuk 30 Day Writing Challenge.
//               </h1>
//               <p style={{ fontSize: "16px", color: "#0C38B5" }}>
//                 Setiap harinya, selama 30 hari ke depan, kamu akan diberikan satu pertanyaan yang bisa kamu jawab melalui tulisan.
//               </p>
//             </Col>
//             <Col md={3} className="d-flex align-items-center">
//               <LazyLoad height={200} offset={100}>
//                 <img src={question1} alt="Image" style={{ maxWidth: "100%", maxHeight: "100%" }} />
//               </LazyLoad>
//             </Col>
//             <Col md={3} className="d-flex align-items-center">
//               <LazyLoad height={200} offset={100}>
//                 <img src={challenge} alt="Image" style={{ maxWidth: "100%", maxHeight: "100%" }} />
//               </LazyLoad>
//             </Col>
//             <Col md={{ span: 2, offset: 0.5 }}>
//               <h1 style={{ fontSize: "18px", fontWeight: "bold", color: "#0C38B5" }}>
//                 <br></br>Tidak perlu terburu-buru atau khawatir tentang tata bahasa.
//               </h1>
//               <p style={{ fontSize: "16px", color: "#0C38B5" }}>
//                 Dengan mengikuti tantangan ini, kamu akan menemukan cara yang positif menghadapi stres, sekaligus meningkatkan kesejahteraan emosional.
//               </p>
//             </Col>
//           </Row>
//         </Container>

//         <Col md={14} className="text-center" style={{ marginBottom: "100px" }}>
//           <Link to="/intervensi30days-user">
//             <Button
//               variant="light"
//               className="custom-button"
//               style={{
//                 marginTop: "20px",
//                 borderRadius: "50px",
//                 backgroundColor: "#7F91D8",
//                 fontWeight: "bold",
//                 padding: '17px 20px',
//                 fontSize: '16px'
//               }}
//             >
//               Yuk Ikuti Langkah-langkahnya!
//             </Button>
//           </Link>
//         </Col>
//       <Footer />
//     </>
//   );
// };

// export default ChallengeDetail;
