import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import './UpdateCarDetails.css';

const UpdateCarDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [images, setImages] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (state && state.car) {
      setTitle(state.car.title);
      setDescription(state.car.description);
      setTags(state.car.tags.join(', '));
      setImages(state.car.images);
    }
  }, [state]);

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files) {
      setImages([...files]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim() || !tags.trim()) {
      setErrorMessage('Please fill in all fields and upload images.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('tags', tags.split(',').map((tag) => tag.trim()));
    formData.append('car_id', state.car._id);

    images.forEach((image) => {
      formData.append('images', image);
    });

    
    
      try {
        
        const response = await axios.put(
            `http://localhost:8000/api/v1/car/updateCar/${state.car._id}`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true, 
            }
        );
    
        alert('Car details updated successfully!');
        navigate(`/view-your-cars`);
    } catch (error) {
        console.error('Error updating car:', error);
        setErrorMessage('Error updating car details.');
    }
  };

  return (
    <div className="update-car-form">
      <h1>Update Car Details</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Car Title:</label>
          <input
            type="text"
            placeholder="Enter car title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            placeholder="Enter car description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>Tags:</label>
          <input
            type="text"
            placeholder="Enter car tags (comma separated)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>
        <div>
          <label>Upload New Car Images:</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
          />
        </div>
        {errorMessage && <p className="error">{errorMessage}</p>}
        <button type="submit">Update Car</button>
      </form>
    </div>
  );
};

export default UpdateCarDetails;
