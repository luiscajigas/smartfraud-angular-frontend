export interface RegisterRequest {
  usuario: string;
  contrasena: string;
  rol: 'CLIENTE';
  email: string;
  direccion: string;
  telefono: string;
  nombreCompleto?: string;
}
