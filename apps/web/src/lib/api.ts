// src/lib/api.ts
import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Interceptor to add the token to every request
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Interceptor to handle API errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      throw new Error(
        `API error: ${error.response.status} - ${
          error.response.data.message || 'Unknown error'
        }`,
      );
    } else if (error.request) {
      throw new Error('No response received from server');
    } else {
      throw new Error(`Request setup error: ${error.message}`);
    }
  },
);

export default api;