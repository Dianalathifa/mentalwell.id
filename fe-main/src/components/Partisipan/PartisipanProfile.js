import React, { useState } from 'react';
import profileImage from '../images/partisipan.jpg'; // Ubah sesuai path gambar partisipan
import EditProfileForm from './EditForm';

const Profile = () => {
  const partisipan = {
    nama_partisipan: localStorage.getItem('partisipan_nama') || 'Nama Partisipan',
    email_partisipan: localStorage.getItem('partisipan_email') || 'example@example.com',
    usia: localStorage.getItem('partisipan_usia') || '0',
    no_telp: localStorage.getItem('partisipan_no_telp') || '08123456789',
  };

  const [isEditing, setIsEditing] = useState(false);
  const [editedPartisipan, setEditedPartisipan] = useState({
    nama_partisipan: localStorage.getItem('partisipan_nama') || '',
    email_partisipan: localStorage.getItem('partisipan_email') || '',
    usia: localStorage.getItem('partisipan_usia') || '',
    no_telp: localStorage.getItem('partisipan_no_telp') || '',
    foto_profile: localStorage.getItem('partisipan_foto_profile') || profileImage,
  });

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;

    if (type === 'file') {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setEditedPartisipan((prevPartisipan) => ({ ...prevPartisipan, [name]: reader.result }));
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    } else {
      setEditedPartisipan((prevPartisipan) => ({ ...prevPartisipan, [name]: value }));
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    localStorage.setItem('partisipan_nama', editedPartisipan.nama_partisipan);
    localStorage.setItem('partisipan_email', editedPartisipan.email_partisipan);
    localStorage.setItem('partisipan_usia', editedPartisipan.usia);
    localStorage.setItem('partisipan_no_telp', editedPartisipan.no_telp);
    localStorage.setItem('partisipan_foto_profile', editedPartisipan.foto_profile);
    
    setIsEditing(false);

    // Lakukan permintaan API untuk menyimpan perubahan
    fetch(`https://localhost:8080/update/partisipan/${localStorage.getItem('partisipan_id')}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedPartisipan),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2 className="profile-title">Profile</h2>
        <div className="avatar-container">
          <img src={editedPartisipan.foto_profile} alt="Avatar" className="avatar" />
        </div>
        <div className="welcome-message">
          <p>Selamat datang, {editedPartisipan.nama_partisipan}!</p>
        </div>
      </div>
      <div className="profile-content">
        <div className="profile-info">
          {isEditing ? (
            <EditProfileForm
              editedPartisipan={editedPartisipan}
              onInputChange={handleInputChange}
              onSaveClick={handleSaveClick}
              onCancelClick={() => setIsEditing(false)}
            />
          ) : (
            <>
              <p id="nama_partisipan">{partisipan.nama_partisipan}</p>
              <p id="email_partisipan">{partisipan.email_partisipan}</p>
              <p id="usia">{partisipan.usia}</p>
              <p id="no_telp">{partisipan.no_telp}</p>
              <button className="edit-profile-button" onClick={handleEditClick}>
                Edit Profile
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
