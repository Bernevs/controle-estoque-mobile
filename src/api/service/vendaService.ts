import { Pedido } from "../../types/Pedido";
import api, { endpoint } from "../api";

export async function createPedido(pedido: Pedido[]) {
  const response = await api.post("/pedido", pedido);

  return response;
}
