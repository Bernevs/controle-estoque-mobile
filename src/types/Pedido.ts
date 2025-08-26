export interface Pedido {
  id?: number;
  cliente_id: number;
  cliente_nome?: string;
  produto_id: number;
  produto_nome?: string;
  preco_venda?: number;
  quantidade: number;
}
