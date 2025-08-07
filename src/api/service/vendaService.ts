import { Pedido } from "../../types/Pedido";
import api from "../api";

export async function readPDF(base64: string) {
  const response = await fetch("http://192.168.100.247:3000/pdf", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ base64 }),
  });

  return response;
}

export async function createPedido(pedido: Pedido[]) {
  const response = await api.post("/pedido", pedido);

  return response;
}
