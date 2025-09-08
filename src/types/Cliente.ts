export interface Cliente {
  id: number;
  nome: string;
  total_gasto?: number;
  total_pago?: number;
  status: string;
}
