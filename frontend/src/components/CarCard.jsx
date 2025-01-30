import React from 'react';
import './UserCarCard.css';

const UserCarCard = ({ car, onViewDetails, onEdit, onDelete }) => {
  return (
    <div className="car-card">
      <div className="car-image">
        {car.images.length > 0 ? (
          <img src={car.images[0]} alt={car.title} />
        ) : (
          <img src="https://via.placeholder.com/150" alt="No image available" />
        )}
      </div>

      <div className="car-card-buttons">
        <button onClick={() => onViewDetails(car)}>View Details</button>
      </div>

      <div className="car-details">
        <h3>{car.title}</h3>
        <p><strong>Description:</strong> {car.description}</p>
        <p><strong>Car Type:</strong> {car.car_type}</p>
        <p><strong>Company:</strong> {car.company}</p>
        <p><strong>Dealer:</strong> {car.dealer}</p>
        <p><strong>Year:</strong> {car.year}</p>
        <p><strong>Price:</strong> ₹{car.price}</p>
        <p><strong>Tags:</strong> {car.tags.join(', ')}</p>
      </div>
    </div>
  );
};

export default UserCarCard;