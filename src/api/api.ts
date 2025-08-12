import axios from "axios";
export const endpoint = "https://naturagleici-api.vercel.app";
const api = axios.create({ baseURL: endpoint });

export default api;
