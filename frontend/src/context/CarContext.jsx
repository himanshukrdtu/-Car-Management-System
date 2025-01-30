import React, { createContext, useState, useContext } from 'react';

const CarsContext = createContext();

export const useCars = () => {
  return useContext(CarsContext);
};

export const CarsProvider = ({ children }) => {
  const [allCars, setAllCars] = useState([]);
  const [userCars, setUserCars] = useState([]);

  const updateAllCars = (newCars) => {
    setAllCars(newCars);
  };

  const updateUserCars = (newCars) => {
    setUserCars(newCars);
  };

  return (
    <CarsContext.Provider value={{ allCars, userCars, updateAllCars, updateUserCars }}>
      {children}
    </CarsContext.Provider>
  );
};