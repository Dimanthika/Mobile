import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://52.54.109.5:8400/",
  // baseURL: "http://localhost:8080/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
