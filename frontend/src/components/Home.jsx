import React from 'react';
import './Home.css';  

const Home = () => {
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
