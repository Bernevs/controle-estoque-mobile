import { Produto } from "../../types/Produto";
import api from "../api";

export async function createProduto(produto: Produto) {
  const response = await api.post("/produto", produto);

  return response;
}

export async function getProdutos() {
  const response = await api.get("/produto");

  return response;
}

export async function getProdutoById(id: number) {
  const response = await api.get(`/produto/${id}`);

  return response;
}

export async function updateProduto(id: number, produto: Produto) {
  const response = await api.put(`/produto/${id}`, produto);

  return response;
}

export async function deleteProduto(id: number) {
  const response = await api.delete(`/produto/${id}`);

  return response;
}

export async function readPDF(base64: string) {
  const response = await fetch("http://192.168.100.181:3000/produto/pdf", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ base64 }),
  });

  return response;
}
