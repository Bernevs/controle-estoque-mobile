import api from "../api";

export async function getClientes() {
  const response = await api.get("/cliente");

  return response.data;
}

export async function getClienteById(id: number) {
  const response = await api.get(`/cliente/${id}`);

  return response.data;
}
