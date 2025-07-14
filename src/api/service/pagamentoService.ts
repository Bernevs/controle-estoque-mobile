import { Pagamento } from "../../types/Pagamento";
import api from "../api";

export async function createPagamento(pagamento: Pagamento) {
  const response = await api.post("/pagamento", pagamento);

  return response;
}

export async function getPagamento(cliente_id: number) {
  const response = await api.get(`/pagamento/cliente/${cliente_id}`);

  return response;
}

export async function getPagamentoById(id: number) {
  const response = await api.get(`/pagamento/${id}`);

  return response;
}

export async function updatePagamento(id: number, pagamento: Pagamento) {
  const response = await api.put(`/pagamento/${id}`, pagamento);

  return response;
}

export async function deletePagamento(id: number) {
  const response = await api.delete(`/pagamento/${id}`);

  return response;
}
