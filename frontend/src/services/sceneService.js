import axios from "axios";

const API = "http://localhost:5000/api/scene";

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