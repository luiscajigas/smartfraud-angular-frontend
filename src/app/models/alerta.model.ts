export type EstadoAlerta = 'PENDIENTE' | 'EN_REVISION' | 'APROBADA' | 'FRAUDE_CONFIRMADO';

export interface AlertaFraude {
  id: number;
  transaccionId: number;
  estado: EstadoAlerta;
  riesgo: number;
  regla: string;
  mensaje: string;
  creadoEn: string;
}

export interface ActualizarEstadoRequest {
  nuevoEstado: EstadoAlerta;
  comentario?: string;
}

export interface HistorialRevision {
  id: number;
  estadoAnterior: EstadoAlerta;
  estadoNuevo: EstadoAlerta;
  comentario?: string;
  analista?: string;
  creadoEn: string;
}
