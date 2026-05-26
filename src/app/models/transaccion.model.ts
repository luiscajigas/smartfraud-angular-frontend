export interface Transaccion {
  id: number;
  monto: number;
  moneda: string;
  comercio: string;
  ubicacion: string;
  fechaHora: string;
}

export interface CrearTransaccionRequest {
  monto: number;
  moneda: string;
  comercio: string;
  ubicacion: string;
}
