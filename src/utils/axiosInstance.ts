import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://laravel-backend-portfolio.onrender.com/api',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

console.log('API BLOG : https://laravel-backend-portfolio.onrender.com/api');

export default axiosInstance;
