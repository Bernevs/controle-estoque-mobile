import { Pedido } from "../../types/Pedido";
import api from "../api";

export async function readPDF(base64: string) {
  const response = await fetch("https://naturagleici-api.vercel.app/pdf", {
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
