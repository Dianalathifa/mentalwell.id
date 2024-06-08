import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import MotivationalModal from '../MotivationModal';
import { Toast, ToastContainer } from 'react-bootstrap';

const quotes = [
    "Hebat sekali! Langkah kecil yang kamu ambil hari ini membantu menenangkan pikiran dan mendekatkanmu pada ketenangan yang sejati. Teruslah melangkah, kamu sedang membuat perubahan besar.",
    "Luar biasa! Setiap kali kamu berlatih teknik ini, kamu semakin mengendalikan kecemasanmu. Ingat, setiap hari adalah kesempatan untuk merasa lebih baik dan kamu sudah di jalur yang benar.",
    "Bagus sekali! Setiap praktik membawa ketenangan lebih dekat. Percayalah pada dirimu sendiri, kamu memiliki kekuatan untuk mengatasi ini.",
    "Kamu hebat! Menghadapi kecemasan butuh keberanian, dan kamu melakukannya dengan sangat baik. Teruskan perjuangan ini, kamu layak mendapatkan ketenangan.",
    "Teruskan! Setiap harimu menjadi lebih baik dengan langkah-langkah kecil yang kamu ambil. Jangan pernah meremehkan kemajuan yang telah kamu buat.",
    "Maju terus! Kecemasanmu tidak mendefinisikan dirimu. Kamu lebih kuat dari yang kamu pikirkan dan setiap hari adalah bukti dari kekuatanmu.",
    "Keren! Setiap ceklis adalah langkah menuju kedamaian batin. Teruskan usahamu, kamu sedang menciptakan masa depan yang lebih tenang.",
    "Kamu kuat! Kecemasan ini hanyalah sementara dan kamu memiliki kemampuan untuk mengatasinya. Setiap hari adalah kesempatan baru untuk merasa lebih baik.",
    "Fantastis! Kamu membuat kemajuan nyata hari ini. Setiap langkah kecil menuju ketenangan adalah kemenangan yang patut dirayakan.",
    "Semangat! Ketenanganmu semakin dekat dengan setiap usaha yang kamu lakukan. Jangan pernah meremehkan kekuatan dari langkah-langkah kecil yang kamu ambil.",
    "Yakinlah! Kamu menguasai hari ini dengan sangat baik. Setiap hari adalah kesempatan untuk menjadi lebih baik dan kamu sudah di jalan yang benar.",
    "Super! Kecemasanmu berkurang dengan setiap langkah yang kamu ambil. Teruskan usahamu, kamu sedang menciptakan perubahan positif dalam hidupmu.",
    "Tetap semangat! Setiap hari adalah kesempatan baru untuk merasa lebih baik. Percayalah pada dirimu sendiri, kamu memiliki kemampuan untuk mengatasi ini.",
    "Bagus! Kamu lebih kuat daripada kecemasanmu. Setiap ceklis adalah bukti dari kekuatan dan keberanianmu untuk menghadapi dan mengatasi kecemasan.",
];

const getRandomQuote = () => {
    return quotes[Math.floor(Math.random() * quotes.length)];
};

const Checklist = () => {
    const [checklist, setChecklist] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [partisipanId, setPartisipanId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [quote, setQuote] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [isDay14, setIsDay14] = useState(false);

    useEffect(() => {
        const id = localStorage.getItem('partisipan_id');
        if (id) {
            setPartisipanId(id);
            fetchChecklist(id);
        } else {
            setError('Participant ID not found');
            setLoading(false);
        }
    }, []);

    const fetchChecklist = async (id) => {
        try {
            const response = await axios.get(`http://localhost:8080/cemas/checklist`, {
                params: { id_partisipan: id }
            });
            setChecklist(response.data);
        } catch (error) {
            setError('Error fetching checklist');
        } finally {
            setLoading(false);
        }
    };

    const handleCheck = async (day) => {
        try {
            await axios.post(`http://localhost:8080/cemas/checklist/check-day`, {
                id_partisipan: partisipanId,
                hari: day,
                status: 'true'
            });
            fetchChecklist(partisipanId);
            setQuote(getRandomQuote());
            setIsDay14(day === 14);
            setShowModal(true);
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setToastMessage("Maaf, hari ini kamu sudah melakukan daily checklist untuk pencatatan progres harian intervensi. Kembali lagi besok ya.");
                setShowToast(true);
            } else {
                setError('Error updating checklist');
            }
        }
    };

    const handleClose = () => setShowModal(false);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h1>Checklist for Participant {partisipanId}</h1>
            <ul>
                {Array.from({ length: 14 }, (_, i) => i + 1).map((day) => (
                    <li key={day}>
                        <span>Day {day}</span>
                        <input
                            type="checkbox"
                            checked={checklist.some(item => item.hari === day && item.status)}
                            onChange={() => handleCheck(day)}
                            disabled={checklist.some(item => item.hari >= day)}
                        />
                    </li>
                ))}
            </ul>
            <MotivationalModal show={showModal} handleClose={handleClose} quote={quote} isDay14={isDay14} />
            <ToastContainer position="top-end" className="p-3">
                <Toast show={showToast} onClose={() => setShowToast(false)} delay={3000} autohide>
                    <Toast.Body>{toastMessage}</Toast.Body>
                </Toast>
            </ToastContainer>
        </div>
    );
};

export default Checklist;
