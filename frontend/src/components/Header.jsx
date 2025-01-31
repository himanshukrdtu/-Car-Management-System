import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';  
import { useUser } from '../context/UserContext';
import './Header.css';

function Header() {
  const { isLoggedIn, setIsLoggedIn } = useAuth();  
  const { user, login, logout } = useUser(); 
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    logout();
    setIsLoggedIn(false);
    navigate('/login');
  };

  

  return (
    <header className="Header">
      <div className="logo">Car Management</div>
      <nav>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/add-car"  >Add Car</Link></li>
          <li><Link to="/view-all-cars">View All Cars</Link></li>
          <li><Link to="/view-your-cars" >View Your Cars</Link></li>  
          {isLoggedIn ? (
            <>
              <li>Welcome , {user ? user.fullname : 'User'}</li>
              <li><button onClick={handleLogout}>Logout</button></li>
            </>
          ) : (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
