import React from 'react';
import { Link } from 'react-router-dom';
import './Homepage.css';
import { FiLogOut } from 'react-icons/fi';


const NavHeader = ({ isLoggedIn, setIsLoggedIn }) => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    localStorage.setItem('isLoggedIn', 'false');
    setIsLoggedIn(false);
  };

  return (
    <nav className="navbar">
      <div className="logo">BlogMaster</div>
      <ul className="nav-links">
        <li><Link to="/homepage">Home</Link></li>
        {!isLoggedIn ? (
          <>
            <li><Link to="/login">Log In</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        ) : (
          <>
            <li><Link to="/editmyprofile">My Profile</Link></li>
            <li><Link to="/viewmyblog">My Blogs</Link></li>
<li>
  <button
    onClick={handleLogout}
    className="logout-btn"
    style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
  >
    <FiLogOut />
    Log Out
  </button>
</li>          </>
        )}
      </ul>
    </nav>
  );
};

export default NavHeader;
