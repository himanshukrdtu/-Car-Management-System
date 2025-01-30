import React, { useState } from 'react';
import axios from 'axios';
import { useUser } from "../context/UserContext"; 
import './CarForm.css';

function CarForm() {
  
  const { user } = useUser();
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

    if (!user) {
      setMessage('You must be logged in to add a car.');
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
    formData.append('tags', JSON.stringify(tagsArray));
    formData.append('user', user._id);

    images.forEach((image) => {
      formData.append('photos', image);
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
