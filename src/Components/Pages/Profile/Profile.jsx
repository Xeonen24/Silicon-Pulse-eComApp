import React, { useEffect, useState } from 'react';
import userLogo from '../../../Images/user.png'
import './profile.css'

const Profile = () => {
  const [user, setUser] = useState(null);
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    const userData = localStorage.getItem('userDetails');

    if (userData) {
      const parsedUserData = JSON.parse(userData);
      setUser(parsedUserData);

      const createdAt = parsedUserData.createdAt;
      const date = new Date(createdAt);
      const formattedDate = date.toLocaleDateString("en-GB");
      setFormattedDate(formattedDate);
    }
  }, []);

  if (!user) {
    return <div>Loading...</div>;
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
          <h2 className="profile-name">{user.username}</h2>
          <p className="profile-email">Email:{user.email}</p>
          <p className="profile-location">Profile Created:{formattedDate}</p>
          <button className="profile-edit-button">Edit Profile</button>
        </div>
      </div>
      <div className="profile-orders">
        <h3 className="profile-section-title">Order History</h3>
          <div className="profile-order-item" >
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
