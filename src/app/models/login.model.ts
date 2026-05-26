export interface LoginCredentials {
  usuario: string;
  contrasena: string;
  recordarme?: boolean;
}

export interface LoginRequest {
  usuario: string;
  contrasena: string;
}

export interface LoginResponse {
  token: string;
  refreshToken: string;
  usuario: string;
  rol: 'ADMIN' | 'ANALISTA' | 'CLIENTE';
}
