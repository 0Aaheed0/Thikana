// UserProfileSidebar.jsx
import React, { useState } from 'react';
import './UserProfileSidebar.css';
import { useAuth } from './AuthContext';

const UserProfileSidebar = ({ user, onClose, isOpen }) => {
  const { logout, updateUser } = useAuth();
  const [username, setUsername] = useState(user.username || "");
  const [email, setEmail] = useState(user.email || "");
  const [password, setPassword] = useState('');
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [previewSrc, setPreviewSrc] = useState(
    user.profilePhoto ? `http://localhost:5000${user.profilePhoto}` : 'https://via.placeholder.com/150'
  );

  // Handle file selection and live preview
  const handlePhotoChange = e => {
    if (e.target.files[0]) {
      setProfilePhoto(e.target.files[0]);
      setPreviewSrc(URL.createObjectURL(e.target.files[0])); // immediate preview
    }
  };

  // Handle profile update
  const handleUpdate = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    if (password) formData.append('password', password);
    if (profilePhoto) formData.append('profilePhoto', profilePhoto);

    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/user/profile', {
        method: 'PUT',
        headers: { 'x-auth-token': token },
        body: formData
      });
if (res.ok) {
  const data = await res.json();
  updateUser(data.user); // update global state
  setPreviewSrc(`http://localhost:5000${data.user.profilePhoto}?t=${Date.now()}`); // refresh preview with uploaded image
  setProfilePhoto(null); // reset local file
}

        onClose();
      } else {
        console.error('Failed to update profile:', await res.text());
      }
    } catch (err) {
      console.error('Error updating profile:', err);
    }
  };

const profileSrc = user?.profilePhoto
  ? `http://localhost:5000${user.profilePhoto}?t=${Date.now()}`
  : 'https://via.placeholder.com/150';

  return (
    <div className={`user-profile-sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <button onClick={onClose} className="close-btn">&times;</button>
        <button onClick={logout} className="logout-btn">Logout</button>
      </div>
      <div className="profile-photo-section">
        <img src={previewSrc} alt="Profile" className="profile-photo"/>
        <label htmlFor="photo-upload" className="photo-upload-label">Change Photo</label>
        <input id="photo-upload" type="file" onChange={handlePhotoChange}/>
      </div>
      <form onSubmit={handleUpdate} className="profile-form">
        <label>
          Username
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
        </label>
        <label>
          Email
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
        </label>
        <label>
          New Password
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </label>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default UserProfileSidebar;
