import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL;

console.log('🔥🔥🔥 TEST VERCEL 🔥🔥🔥');
console.log('🔥 VITE_API_URL =', import.meta.env.VITE_API_URL);
console.log('🔥 BASE URL =', baseURL);

const axiosInstance = axios.create({
  baseURL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
