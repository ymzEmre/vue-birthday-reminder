import axios from "axios";

const appAxios = axios.create({
  baseURL: "http://localhost:5000",
});

appAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default appAxios;
