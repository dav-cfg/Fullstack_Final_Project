import axios from "axios";

// Use environment variable or production backend URL
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 
  (import.meta.env.DEV ? "http://localhost:3000" : "https://novy-grafyniq.onrender.com");

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = sessionStorage.getItem("token");
    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default axiosInstance;
