import axios from "axios";

const API_HOST = import.meta.env.VITE_API_HOST || "http://localhost:3001";

const api = axios.create({
  baseURL: API_HOST,
});
// Book create API
export { api };
