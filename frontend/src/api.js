import axios from 'axios';

// API configuration for single URL deployment
const api = axios.create({
  baseURL: '/api', // Same domain for both frontend and backend
  withCredentials: true,
});

export default api;
