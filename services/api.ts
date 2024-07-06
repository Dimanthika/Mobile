import axios from "axios";
import { getAuthToken } from "./token";

const baseURL = "http://52.54.109.5:8400/";
// const baseURL = "http://localhost:8080/";

const api = axios.create({
  baseURL: baseURL,
});

const axiosInstance = axios.create({
  baseURL: baseURL,
});

api.interceptors.request.use(
  async (config) => {
    const token = await getAuthToken("token");
    if (token) {
      config.headers["x-access-token"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { api, axiosInstance };
