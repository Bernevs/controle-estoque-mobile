import axios from "axios";

const api = axios.create({ baseURL: "http://192.168.100.247:3000" });

export default api;
