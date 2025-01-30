import React, { useEffect } from 'react';
import './Home.css';  
import { useUser } from "../context/UserContext";
import { useAuth } from "../context/AuthContext";  // Assuming you need to check login status as well

const Home = () => {
  const { user, login } = useUser();
  const { isLoggedIn, setIsLoggedIn } = useAuth();  // To access login state

  useEffect(() => {
    // Check localStorage for token and user data on component mount
    const token = localStorage.getItem('token');
    const userFromStorage = localStorage.getItem('user');

    if (token && userFromStorage) {
      // If both token and user exist, update the global user context
      login(JSON.parse(userFromStorage));
      setIsLoggedIn(true);  // Set logged-in status to true
    } else {
      setIsLoggedIn(false);  // Set logged-in status to false if no token is found
    }
  }, []); // Dependency array ensures login is only called once on mount

  console.log("user in home", user);

  return (
    <div className="home-container">
      <h1 className="welcome-title">Welcome to the Car Management System</h1>
      <p className="intro-paragraph">
        The Car Management System is designed to streamline the management of your vehicle
        fleet, making it easier than ever to monitor, track, and manage each car in your collection.
        Whether you're running a rental service, a dealership, or simply maintaining a personal fleet,
        our system offers advanced features to keep your cars organized and well-maintained. 
        From tracking service records to managing rental schedules, we provide the tools you need
        to stay in control and ensure smooth operations every day.
      </p>
    </div>
  );
};

export default Home;
