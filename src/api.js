// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080', // URL base de tu backend
  timeout: 5000, // tiempo máximo de espera
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para añadir el token JWT a cada petición
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para manejar errores globalmente
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expirado o no válido
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      window.location.href = '/login'; // Redirige al login
    }
    return Promise.reject(error);
  }
);

export default api;