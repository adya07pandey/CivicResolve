import axios from "axios";

const API = axios.create({
  baseURL: "https://civicresolve-p5ec.onrender.com/api/v1",
  withCredentials: true,
});

export default API;