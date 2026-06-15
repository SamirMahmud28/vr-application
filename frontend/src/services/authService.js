import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const API = `${API_BASE_URL}/auth`;

export const signup = (data) => {
  return axios.post(`${API}/signup`, data, {
    withCredentials: true,
  });
};

export const login = (data) => {
  return axios.post(`${API}/login`, data, {
    withCredentials: true,
  });
};

export const logout = () => {
  return axios.post(
    `${API}/logout`,
    {},
    {
      withCredentials: true,
    }
  );
};