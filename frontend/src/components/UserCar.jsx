import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserCarCard from './UserCarCard';
import './UserCar.css';
import { useUser } from "../context/UserContext";
import { useCars } from "../context/CarContext";
import { useAuth } from "../context/AuthContext";   
  

const UserCar = () => {
  const { userCars, updateUserCars } = useCars();
  const { user } = useUser();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();


  
  useEffect(() => {
    const fetchCars = async () => {
      console.log(user);
      if (user) {
        try {
          const response = await axios.get(`http://localhost:8000/api/v1/car/getCarsByUserId`, {
            params: { user: user._id }
          });
          updateUserCars(response.data.cars);
        } catch (error) {
          console.error("Error fetching cars for user:", error);
        }
      } else {
        console.log("User is not logged in");
      }
    };

    fetchCars();
  }, [user]);

  const handleViewDetails = (car) => {
    navigate(`/view-car-details/${car._id}`, { state: { car } });
  };

  const handleEdit = (car) => {
    navigate(`/update-car-details/${car._id}`, { state: { car } });
  };

  const handleDelete = async (carId) => {
    console.log("Attempting to delete car with ID:", carId);
    try {
       
      await axios.delete(`http://localhost:8000/api/v1/car/deleteCar/${carId}`, {
        withCredentials: true,  
      });
      updateUserCars(userCars.filter(car => car._id !== carId));
      console.log("Car deleted:", carId);
    } catch (error) {
      console.error("Error deleting car:", error.response?.data || error);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="CarForm">
        <h1>Please log in to view cars added by you</h1>
        <button onClick={() => navigate('/login')}>Login</button>  
      </div>
    );
  }

  return (
    <div className="car-container">
      {userCars.length > 0 ? (
        userCars.map(car => (
          <UserCarCard
            key={car._id}
            car={car}
            onViewDetails={handleViewDetails}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))
      ) : (
        <p>No cars available for this user.</p>
      )}
    </div>
  );
};

export default UserCar;
