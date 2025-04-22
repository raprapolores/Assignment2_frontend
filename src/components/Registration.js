import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './Registration.css';
import { BaseUrl } from "../constants";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Registration = () => {
  const [first_name, setFirstname] = useState('');
  const [last_name, setLastname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch(BaseUrl + '/api/register/', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ first_name, last_name, username, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Registration successful!");
        setFirstname("");
        setLastname("");
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      } else {
        setMessage(data.error || "Registration failed");
      }
    } catch (error) {
      setMessage("Error connecting to the server");
      console.error("Registration Error:", error);
    }
  };

  const handleClose = () => {
    navigate('/login');
  };

  return (
    <div className="registration-container">
      <div className="registration-form-container">
        <button onClick={handleClose} className="close-btn">X</button>

        <form onSubmit={handleSubmit} className="registration-form">
          <h2>Create an Account</h2>

          {message && <div className="form-message">{message}</div>}

          <div className="input-group">
            <label htmlFor="first_name">Firstname</label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              value={first_name}
              onChange={(e) => setFirstname(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="last_name">Lastname</label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              value={last_name}
              onChange={(e) => setLastname(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group password-group">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          <div className="input-group password-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <span className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          <button type="submit" className="register-btn">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Registration;
