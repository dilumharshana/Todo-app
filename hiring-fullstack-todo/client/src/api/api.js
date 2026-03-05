import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL;
console.log(baseURL);

const apiClient = axios.create({
  baseURL: baseURL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/jsn',
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || 'Something went wrong';
    console.error(`[API Error]: ${message}`);
    return Promise.reject(error);
  }
);

export default apiClient;