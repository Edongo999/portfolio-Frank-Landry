import axios from 'axios';

const baseURL =
  import.meta.env.VITE_API_URL ||
  'https://laravel-backend-portfolio.onrender.com/api';

console.log('✅ API utilisée :', baseURL);

const axiosInstance = axios.create({
  baseURL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
