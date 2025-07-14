export interface Pagamento {
  id?: number;
  cliente_id: number;
  valor_pago: number;
  data_pagamento: Date;
}
