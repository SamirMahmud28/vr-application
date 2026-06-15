import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const API = `${API_BASE_URL}/scene`;

export const loadScene = () => {
  return axios.get(API, {
    withCredentials: true,
  });
};

export const saveScene = (objects) => {
  return axios.post(
    API,
    { objects },
    {
      withCredentials: true,
    }
  );
};