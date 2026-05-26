import { Injectable, signal } from '@angular/core';

export type UserRole = 'ADMIN' | 'ANALISTA' | 'CLIENTE';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  private readonly token = signal<string | null>(localStorage.getItem('token'));
  private readonly refreshToken = signal<string | null>(localStorage.getItem('refreshToken'));
  private readonly usuario = signal<string | null>(localStorage.getItem('usuario'));
  private readonly rol = signal<UserRole | null>((localStorage.getItem('rol') as UserRole | null) ?? null);

  getToken(): string | null {
    return this.token();
  }

  getRefreshToken(): string | null {
    return this.refreshToken();
  }

  getUsuario(): string | null {
    return this.usuario();
  }

  getRol(): UserRole | null {
    return this.rol();
  }

  setSession(payload: { token: string; refreshToken: string; usuario: string; rol: UserRole }): void {
    localStorage.setItem('token', payload.token);
    localStorage.setItem('refreshToken', payload.refreshToken);
    localStorage.setItem('usuario', payload.usuario);
    localStorage.setItem('rol', payload.rol);
    this.token.set(payload.token);
    this.refreshToken.set(payload.refreshToken);
    this.usuario.set(payload.usuario);
    this.rol.set(payload.rol);
  }

  clear(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('usuario');
    localStorage.removeItem('rol');
    this.token.set(null);
    this.refreshToken.set(null);
    this.usuario.set(null);
    this.rol.set(null);
  }
}
