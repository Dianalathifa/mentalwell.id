import React, { useState } from 'react';
import profileImage from '../images/partisipan.jpg';
import EditProfileForm from './EditForm';
import Navbar from '../landing/Navbar';
import Footer from '../landing/Footer';
import "../style/Profile.css";

const Profile = () => {
  // Simulasi data partisipan dari local storage
  const [partisipan, setPartisipan] = useState({
    nama_partisipan: localStorage.getItem('partisipan_nama') ,
    email_partisipan: localStorage.getItem('partisipan_email'), 
    usia: localStorage.getItem('usia') ,
    no_telp: localStorage.getItem('no_telp'),
    foto_profile: localStorage.getItem('partisipan_foto_profile') || profileImage,
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setPartisipan((prevPartisipan) => ({
      ...prevPartisipan,
      [name]: type === 'file' ? e.target.files[0] : value
    }));
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    // Simpan data profil yang sudah diubah ke local storage atau kirim ke server
    // Misalnya:
    localStorage.setItem('partisipan_nama', partisipan.nama_partisipan);
    localStorage.setItem('partisipan_email', partisipan.email_partisipan);
    localStorage.setItem('partisipan_usia', partisipan.usia);
    localStorage.setItem('partisipan_no_telp', partisipan.no_telp);
    // ...
    setIsEditing(false);
  };

  return (
    <>
      <Navbar />
      <div className="profile-container">
        <div className="profile-header">
          <h2 className="profile-title">Profile</h2>
          <div className="avatar-container">
            <img src={partisipan.foto_profile} alt="Avatar" className="avatar" />
          </div>
          <div className="welcome-message">
            <p>Selamat datang, {partisipan.nama_partisipan}!</p>
          </div>
        </div>
        <div className="profile-content">
          <div className="profile-info">
            {isEditing ? (
              <EditProfileForm
                editedPartisipan={partisipan}
                onInputChange={handleInputChange}
                onSaveClick={handleSaveClick}
                onCancelClick={() => setIsEditing(false)}
              />
            ) : (
              <>
                <p id="nama_partisipan">Nama: {partisipan.nama_partisipan}</p>
                <p id="email_partisipan">Email: {partisipan.email_partisipan}</p>
                <p id="usia">Usia: {partisipan.usia}</p>
                <p id="no_telp">No. Telp: {partisipan.no_telp}</p>
                <button className="edit-profile-button" onClick={handleEditClick}>
                  Edit Profile
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
