import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL;

console.log('🔥🔥🔥 NOUVEL AXIOS PORTFOLIO 🔥🔥🔥');
console.log('🔥 API URL =', baseURL);

const axiosInstance = axios.create({
  baseURL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
