import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create axios instance with defaults and credential support
export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  // Enable sending cookies with requests
  withCredentials: true
});

// Add response interceptor to handle unauthorized responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 unauthorized responses
    if (error.response?.status === 401) {
      // Redirect to login or handle unauthorized access
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);