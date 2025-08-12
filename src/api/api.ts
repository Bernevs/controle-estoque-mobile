import axios from "axios";
export const endpoint = "http://192.168.100.247:3000";
const api = axios.create({ baseURL: endpoint });

export default api;
