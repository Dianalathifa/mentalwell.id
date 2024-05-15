import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "../landing/Navbar.js";
import Footer from "../landing/Footer.js";

const DailyInsightDetail = () => {
  const [daily_insight, setDailyInsight] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchDailyInsight = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/daily_insight/${id}`);
        setDailyInsight(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching daily insight detail:", error);
        setError(error);
        setLoading(false);
      }
    };
  
    fetchDailyInsight();
  }, [id]);
  

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <Navbar />
      <div className="container">
        <h2>{daily_insight.judul_content}</h2>
        <p>{daily_insight.deskripsi}</p>
      </div>
      <Footer />
    </div>
  );
};

export default DailyInsightDetail;
