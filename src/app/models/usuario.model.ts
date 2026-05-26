export type RolUsuario = 'ADMIN' | 'ANALISTA' | 'CLIENTE';

export interface Usuario {
  id: number;
  usuario: string;
  rol: RolUsuario;
  email: string;
  direccion: string;
  telefono: string;
}
