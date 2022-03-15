import axios from "axios";

const appAxios = axios.create({
  baseURL: "https://express-birthday-reminder.herokuapp.com",
});

appAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default appAxios;
