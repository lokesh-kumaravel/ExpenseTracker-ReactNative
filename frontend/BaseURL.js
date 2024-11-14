// BaseURL.js
import axios from "axios";

const URL = "http://localhost:5000/api"; // Your base URL

const axiosInstance = axios.create({
  baseURL: URL,
});

export default axiosInstance;
