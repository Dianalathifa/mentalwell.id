import React from 'react';

const EditProfileForm = ({ editedPartisipan, onInputChange, onSaveClick, onCancelClick }) => {
    
  return (
    <div className="edit-profile-modal">
      <div className="modal-content">
        <span className="close" onClick={onCancelClick}>&times;</span>
        <label htmlFor="nama">Nama:</label>
        <input
          type="text"
          id="nama"
          name="nama"
          value={editedPartisipan.nama_partisipan}
          onChange={onInputChange}
        />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={editedPartisipan.email_partisipan}
          onChange={onInputChange}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={editedPartisipan.password_partisipan}
          onChange={onInputChange}
        />
        <label htmlFor="usia">Usia:</label>
        <input
          type="number"
          id="usia"
          name="usia"
          value={editedPartisipan.usia}
          onChange={onInputChange}
        />
        <label htmlFor="no_telp">Nomor Telepon:</label>
        <input
          type="tel"
          id="no_telp"
          name="no_telp"
          value={editedPartisipan.no_telp}
          onChange={onInputChange}
        />
        <button className="save-profile-button" onClick={onSaveClick}>
          Save Profile
        </button>
      </div>
    </div>
  );
};

export default EditProfileForm;
