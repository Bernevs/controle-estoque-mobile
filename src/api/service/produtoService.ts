import api from "../api";

export async function getProdutos() {
  const response = await api.get("/produto");

  return response;
}
