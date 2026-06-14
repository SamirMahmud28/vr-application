import axios from "axios";

const API = "http://localhost:5000/api/auth";

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