import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';  
import { useUser } from '../context/UserContext';
import './Header.css';

function Header() {
  const { isLoggedIn, setIsLoggedIn } = useAuth();  
  const { user, login, logout } = useUser(); 
  
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (token) {
      setIsLoggedIn(true);
    }

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        login(parsedUser);
        console.log("User loaded from localStorage:", parsedUser);
      } catch (error) {
        console.error("Error parsing user from localStorage:", error);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    logout();
    setIsLoggedIn(false);
    navigate('/login');
  };

  const handleAddCarClick = () => {
    if (!isLoggedIn) {
      alert("Please log in first to add a car.");
      navigate('/login');
    } else {
      navigate('/add-car');
    }
  };

  return (
    <header className="Header">
      <div className="logo">Car Management</div>
      <nav>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><a onClick={handleAddCarClick}>Add Car</a></li>
          <li><Link to="/view-all-cars">View All Cars</Link></li>
          <li><Link to="/view-your-cars">View Your Cars</Link></li>
          {isLoggedIn ? (
            <>
              <li>Welcome, {user ? user.name : 'User'}</li>
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
