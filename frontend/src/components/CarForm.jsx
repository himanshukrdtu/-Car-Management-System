import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from "../context/AuthContext";  // Import the useAuth hook
import { useNavigate } from 'react-router-dom';  // Import useNavigate from react-router-dom
import './CarForm.css';

function CarForm() {
  const { isLoggedIn, user } = useAuth();  // Get the logged-in status and user from context
  const navigate = useNavigate();  // Initialize navigate function
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [carType, setCarType] = useState('');
  const [company, setCompany] = useState('');
  const [dealer, setDealer] = useState('');
  const [year, setYear] = useState('');
  const [price, setPrice] = useState('');
  const [tags, setTags] = useState('');
  const [message, setMessage] = useState('');
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    // Retrieve user from localStorage if not from context
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setLoggedInUser(storedUser);
    }
  }, []);

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files) {
      setImages([...images, ...files]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim() || !images.length || !carType || !company || !dealer || !year || !price) {
      setMessage('Please fill in all fields and upload images.');
      return;
    }

    if (isNaN(year) || isNaN(price)) {
      setMessage('Year and Price must be valid numbers.');
      return;
    }

    const tagsArray = tags.split(',').map(tag => tag.trim());

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('car_type', carType);
    formData.append('company', company);
    formData.append('dealer', dealer);
    formData.append('year', year);
    formData.append('price', price);
    formData.append('tags', tagsArray);

    // Append the user ID from context or localStorage
    if (user) {
      formData.append('user', user._id); // If user is available in context
    } else if (loggedInUser) {
      formData.append('user', loggedInUser._id); // If user is available in localStorage
    } else {
      setMessage('User is not logged in.');
      return;
    }

    images.forEach((image) => {
      formData.append('images', image);
    });

    try {
      const response = await axios.post('http://localhost:8000/api/v1/car/add-car', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setMessage('Car details submitted successfully!');
      console.log(response.data);
    } catch (error) {
      setMessage('Error submitting data.');
      console.error(error);
    }
  };

  if (!isLoggedIn && !loggedInUser) {
    return (
      <div className="CarForm">
        <h1>Please log in to add a car</h1>
        <button onClick={() => navigate('/login')}>Login</button> {/* Use navigate here */}
      </div>
    );
  }

  return (
    <div className="CarForm">
      <h1>Add Your Car</h1>
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
          <input
            type="text"
            placeholder="Enter car description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>Upload Car Images:</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
          />
        </div>
        <div>
          <label>Car Type:</label>
          <input
            type="text"
            placeholder="Enter car type (e.g., sedan, SUV)"
            value={carType}
            onChange={(e) => setCarType(e.target.value)}
          />
        </div>
        <div>
          <label>Company:</label>
          <input
            type="text"
            placeholder="Enter car company (e.g., Toyota, Honda)"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>
        <div>
          <label>Dealer:</label>
          <input
            type="text"
            placeholder="Enter dealer name"
            value={dealer}
            onChange={(e) => setDealer(e.target.value)}
          />
        </div>
        <div>
          <label>Year:</label>
          <input
            type="number"
            placeholder="Enter car year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            placeholder="Enter car price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div>
          <label>Tags (comma-separated):</label>
          <input
            type="text"
            placeholder="e.g., luxury, used"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default CarForm;
