import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import CarForm from './components/CarForm';  
import Footer from './components/Footer';
import Home from './components/Home';
import UserCar from './components/UserCar';
import Register from './components/Register';
import Login from './components/Login';
import AllCarContainer from './components/AllCarContainer';
import ViewCarDetails from './components/ViewCarDetails';
import UpdateCarDetails from './components/UpdateCarDetails';
function App() {

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/add-car" element={<CarForm />} />
        <Route path="/view-all-cars" element={<AllCarContainer/>} />
        <Route path="/view-your-cars" element={<UserCar/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register />}/>
        <Route path="/view-car-details/:carId" element={<ViewCarDetails />} />
        <Route path="/update-car-details/:carId" element={<UpdateCarDetails />} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
