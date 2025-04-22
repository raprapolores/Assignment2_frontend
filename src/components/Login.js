import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "axios";
import { BaseUrl } from "../constants";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(BaseUrl + '/api/login/', {
        username,
        password
      });

      if (response.status === 200) {
        setMessage("Login successful!");

        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user_id", response.data.user_id);
          localStorage.setItem("isLoggedIn", "true");

          setIsLoggedIn(true); // Update state
          navigate("/viewmyblog");
        } else {
          setMessage("Token not received.");
        }
      } else {
        setMessage(response.data.error || "Invalid credentials");
      }
    } catch (error) {
      setMessage("Error connecting to the server");
      console.error("Login Error:", error);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>

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

        <button type="submit" className="login-btn">Login</button>
        {message && <p className="message">{message}</p>}

        <div className="signup-link">
          <p>
            Don't have an account?
            <Link to="/register"> <strong>Sign up here</strong></Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
