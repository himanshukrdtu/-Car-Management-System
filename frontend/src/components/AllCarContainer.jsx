import React, { useEffect } from 'react';
import axios from 'axios';
import CarCard from './CarCard';
import { useNavigate } from 'react-router-dom';
import { useCars } from '../context/CarContext'; 
import './AllCarContainer.css';

const AllCarContainer = () => {
  const { allCars, updateAllCars } = useCars();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/car/getAllCars');
        updateAllCars(response.data.cars);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };

    fetchCars();
  }, [updateAllCars]);

  const handleViewDetails = (car) => {
    navigate(`/view-car-details/${car._id}`, { state: { car } });
  };

  return (
    <div className="car-container">
      {allCars.length > 0 ? (
        allCars.map(car => <CarCard key={car._id}
            car={car}
            onViewDetails={handleViewDetails}
             />)
        
      ) : (
        <p>No cars available at the moment.</p>
      )}
    </div>
  );
};

export default AllCarContainer;
