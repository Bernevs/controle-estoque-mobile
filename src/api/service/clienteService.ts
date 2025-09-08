import api from "../api";

export async function getClientes() {
  const response = await api.get("/cliente");

  return response.data;
}

export async function getClienteById(id: number) {
  const response = await api.get(`/cliente/${id}`);

  return response.data;
}

export async function createCliente(nome: string) {
  const response = await api.post("/cliente", { nome: nome });

  return response;
}

export async function getValorCliente() {
  const response = await api.get("/cliente/total");

  return response.data;
}

export async function updateCliente(id: number, nome: string) {
  const response = await api.put(`/cliente/${id}`, { novoNome: nome });

  return response;
}

export async function deleteCliente(id: number) {
  const response = await api.delete(`/cliente/${id}`);

  return response;
}

export async function getPedidoById(id: number) {
  const response = await api.get(`/pedido/cliente/${id}`);

  return response.data;
}
