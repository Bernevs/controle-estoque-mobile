import axios from "axios";
export const endpoint = "https://controle-estoque-mobile-api.vercel.app";
const api = axios.create({ baseURL: endpoint });

export default api;
