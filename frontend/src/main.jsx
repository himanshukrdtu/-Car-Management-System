import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext';  
import { UserProvider } from './context/UserContext';
  
 import { CarsProvider } from './context/CarContext'; 

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <CarsProvider> 
    <UserProvider>   
      <AuthProvider>  
        <App />
      </AuthProvider>
    </UserProvider>
    </CarsProvider> 
  </StrictMode>
);
