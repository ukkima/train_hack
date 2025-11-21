import axios from "axios";
import { TOKEN_KEY } from "../consts/localStorage.js";

export const $api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

$api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    config.headers.authorization = token;
  }
  return config;
});
