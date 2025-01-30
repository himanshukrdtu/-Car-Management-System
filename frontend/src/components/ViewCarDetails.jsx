import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import './ViewCarDetails.css';

const ViewCarDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { carId } = useParams();
  const car = location.state?.car;

  if (!car) {
    return <p>Car details not found.</p>;
  }

  return (
    <div className="car-details-page">
      <button onClick={() => navigate(-1)}>Back</button>
      <h1>{car.title}</h1>
      <div className="car-images">
        {car.images.length > 0 ? (
          car.images.map((image, index) => (
            <img key={index} src={image} alt={`Car Image ${index + 1}`} />
          ))
        ) : (
          <p>No images available</p>
        )}
      </div>
      <p><strong>Description:</strong> {car.description}</p>
      <p><strong>Car Type:</strong> {car.car_type}</p>
      <p><strong>Company:</strong> {car.company}</p>
      <p><strong>Dealer:</strong> {car.dealer}</p>
      <p><strong>Year:</strong> {car.year}</p>
      <p><strong>Price:</strong> ₹{car.price}</p>
      <p><strong>Tags:</strong> {car.tags.join(', ')}</p>
    </div>
  );
};

export default ViewCarDetails;
