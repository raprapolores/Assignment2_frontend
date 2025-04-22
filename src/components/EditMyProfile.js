import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EditMyProfile.css';
import { BaseUrl } from "../constants";

const EditMyProfile = () => {
  const token = localStorage.getItem('token'); // corrected key
  const [message, setMessage] = useState('');
  const [profileData, setProfileData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${BaseUrl}/api/user/profile/`, {
          headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'application/json'
          }
        });

        setProfileData((prevData) => ({
          ...prevData,
          first_name: response.data.first_name || '',
          last_name: response.data.last_name || '',
          username: response.data.username || '',
          email: response.data.email || ''
        }));
      } catch (error) {
        setMessage('Error fetching user data: ' + error.message);
      }
    };

    fetchUserData();
  }, [token]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  // Handle saving changes to the profile
  const handleSaveChanges = async (e) => {
    e.preventDefault();

    // Frontend validation
    if (profileData.newPassword && profileData.newPassword !== profileData.confirmPassword) {
      setMessage('New passwords do not match!');
      return;
    }

    if (profileData.newPassword && profileData.newPassword.length < 6) {
      setMessage('New password must be at least 6 characters long.');
      return;
    }

    if (profileData.email && !/\S+@\S+\.\S+/.test(profileData.email)) {
      setMessage('Please enter a valid email address.');
      return;
    }

    const updatedData = {
      first_name: profileData.first_name,
      last_name: profileData.last_name,
      username: profileData.username,
      email: profileData.email,
      ...(profileData.newPassword || profileData.currentPassword
        ? { password: profileData.newPassword || profileData.currentPassword }
        : {})
    };

    try {
      // API call to update the profile
      await axios.put(`${BaseUrl}/api/user/edit/`, updatedData, {
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json'
        }
      });

      setMessage('Profile updated successfully!');
      setProfileData({
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });

      setTimeout(() => setMessage(''), 5000);
    } catch (error) {
      // Improved error handling
      setMessage('Error updating profile: ' + (error.response?.data?.detail || error.message));
    }
  };

  return (
    <div className="profile-container">
      <h1>Edit Profile</h1>
      {message && <div className="message">{message}</div>}

      <form onSubmit={handleSaveChanges} className="profile-form">
        <div className="input-group">
          <label htmlFor="first_name">First Name</label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={profileData.first_name}
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <label htmlFor="last_name">Last Name</label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={profileData.last_name}
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={profileData.username}
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={profileData.email}
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <label htmlFor="currentPassword">Current Password</label>
          <input
            type="password"
            id="currentPassword"
            name="currentPassword"
            value={profileData.currentPassword}
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <label htmlFor="newPassword">New Password</label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            value={profileData.newPassword}
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <label htmlFor="confirmPassword">Confirm New Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={profileData.confirmPassword}
            onChange={handleChange}
          />
        </div>

        <div className="buttons">
          <button type="submit" className="save-btn">Save Changes</button>
        </div>
      </form>
    </div>
  );
};

export default EditMyProfile;
