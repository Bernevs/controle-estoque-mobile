import axios from "axios";

const api = axios.create({ baseURL: "https://naturagleici-api.vercel.app" });

export default api;
