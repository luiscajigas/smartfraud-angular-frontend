import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { LoginRequest, LoginResponse } from './models/login.model';
import { RegisterRequest } from './models/register.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly loginUrl = `${environment.authUrl}/login`;
  private readonly registerUrl = `${environment.authUrl}/register`;
  private readonly refreshUrl = `${environment.authUrl}/refresh`;

  constructor(private readonly http: HttpClient) {}

  login(payload: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.loginUrl, payload);
  }

  register(payload: RegisterRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.registerUrl, payload);
  }

  refresh(refreshToken: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.refreshUrl, { refreshToken });
  }
}
