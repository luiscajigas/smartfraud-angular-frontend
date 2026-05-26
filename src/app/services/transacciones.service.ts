import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CrearTransaccionRequest, Transaccion } from '../models/transaccion.model';

@Injectable({
  providedIn: 'root'
})
export class TransaccionesService {
  private readonly baseUrl = `${environment.apiUrl}/transacciones`;

  constructor(private readonly http: HttpClient) {}

  crear(payload: CrearTransaccionRequest): Observable<Transaccion> {
    return this.http.post<Transaccion>(this.baseUrl, payload);
  }

  listarMias(): Observable<Transaccion[]> {
    return this.http.get<Transaccion[]>(`${this.baseUrl}/mias`);
  }

  listarTodas(): Observable<Transaccion[]> {
    return this.http.get<Transaccion[]>(this.baseUrl);
  }
}
