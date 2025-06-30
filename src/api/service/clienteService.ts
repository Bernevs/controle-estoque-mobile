import api from "../api";

export async function getClientes() {
  const response = await api.get("/cliente");

  return response.data;
}
