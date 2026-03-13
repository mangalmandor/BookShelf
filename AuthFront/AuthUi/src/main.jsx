import React from 'react';
import { createRoot } from 'react-dom/client';
import { AuthProvider } from './context/authContext';
import './index.css';
import App from './App.jsx';
import axios from 'axios';
import Swal from 'sweetalert2';
import { CartProvider } from './context/CartContext'; 

// --- AXIOS CONFIG START (Hamesha render se bahar rakhein) ---
axios.defaults.withCredentials = true;

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    // Agar Backend 401 bhej raha hai (Cookie expire ho gayi ya delete ho gayi)
    if (error.response && error.response.status === 401) {
      
      // Safety: Agar pehle se login page par hain toh dubara popup na aaye
      if (window.location.pathname === '/login') {
        return Promise.reject(error);
      }

      Swal.fire({
        icon: 'error',
        title: 'Session Expired',
        text: 'Aapka session khatam ho gaya hai. Dobara login karein.',
        background: '#111827',
        color: '#fff',
        confirmButtonColor: '#3b82f6',  
        allowOutsideClick: false,
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.clear(); 
          window.location.href = '/login'; 
        }
      });
    }
    return Promise.reject(error);
  }
);
// --- AXIOS CONFIG END ---

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider> 
        <App />
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);