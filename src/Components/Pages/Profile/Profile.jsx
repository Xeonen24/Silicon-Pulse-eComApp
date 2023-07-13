import React, { useEffect, useState } from 'react';
import axios from 'axios';
import userLogo from '../../../Images/user.png';
import './profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [formattedDate, setFormattedDate] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [newusername, setUsername] = useState('');
  const [previousPassword, setPreviousPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    const userData = localStorage.getItem('userDetails');

    if (userData) {
      const parsedUserData = JSON.parse(userData);
      setUser(parsedUserData);

      const createdAt = parsedUserData.createdAt;
      const date = new Date(createdAt);
      const formattedDate = date.toLocaleDateString('en-GB');
      setFormattedDate(formattedDate);
    }
  }, []);

  const handleEditProfile = () => {
    setEditMode(true);
    setUsername(user.username);
  };

  const handleSaveProfile = () => {
    const updatedProfile = {
      newusername,
      previousPassword,
      newPassword,
    };
  
    axios
      .post('http://localhost:5000/api/update-profile', updatedProfile, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        setUser(response.data.user);
        setEditMode(false);
        setPreviousPassword('');
        setNewPassword('');
  
        window.alert('Profile updated successfully. Please re-login.');
        setTimeout(() => {
          logoutUser(); 
        }, 3000);
      })
      .catch(error => {
        if (error.response && error.response.data && error.response.data.error) {
          window.alert(error.response.data.error);
        } else {
          console.error('Error updating profile:', error);
        }
      });
  };
  
  const logoutUser = async () => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/logout',
        {},
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      localStorage.removeItem('userDetails');
      window.location.href = '/'; 
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleCancelEdit = () => {
    setEditMode(false);
    setUsername(user.newusername);
    setPreviousPassword('');
    setNewPassword('');
  };

  if (!user) {
    return <div>Redirecting...</div>;
  }

  return (
    <div className="profile">
      <div className="profile-header">
        <h2 className="profile-title">Your Profile</h2>
      </div>
      <div className="profile-content">
        <div className="profile-image">
          <img src={userLogo} alt="User Profile" />
        </div>
        <div className="profile-details">
          {editMode ? (
            <>
              <input
                type="text"
                value={newusername}
                onChange={e => setUsername(e.target.value)}
                placeholder="Username"
                className="profile-input"
              />
              <input
                type="password"
                value={previousPassword}
                onChange={e => setPreviousPassword(e.target.value)}
                placeholder="Previous Password"
                className="profile-input"
              />
              <input
                type="password"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                placeholder="New Password"
                className="profile-input"
              />
            </>
          ) : (
            <>
              <h2 className="profile-name">{user.username}</h2>
              <p className="profile-email">Email: {user.email}</p>
              <p className="profile-location">Profile Created: {formattedDate}</p>
            </>
          )}
          {editMode ? (
            <div>
              <button className="profile-save-button" onClick={handleSaveProfile}>
                Save
              </button>
              <button className="profile-cancel-button" onClick={handleCancelEdit}>
                Cancel
              </button>
            </div>
          ) : (
            <button className="profile-edit-button" onClick={handleEditProfile}>
              Edit Profile
            </button>
          )}
        </div>
      </div>
      <div className="profile-orders">
        <h3 className="profile-section-title">Order History</h3>
        <div className="profile-order-item">
          <p className="profile-order-id">Order ID:</p>
          <p className="profile-order-date">Order Date:</p>
          <p className="profile-order-total">Order Total: </p>
          <button className="profile-order-details-button">View Details</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
