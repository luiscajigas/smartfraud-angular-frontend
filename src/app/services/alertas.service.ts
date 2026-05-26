import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ActualizarEstadoRequest, AlertaFraude, HistorialRevision } from '../models/alerta.model';

@Injectable({
  providedIn: 'root'
})
export class AlertasService {
  private readonly baseUrl = `${environment.apiUrl}/alertas`;

  constructor(private readonly http: HttpClient) {}

  listarTodas(): Observable<AlertaFraude[]> {
    return this.http.get<AlertaFraude[]>(this.baseUrl);
  }

  listarMias(): Observable<AlertaFraude[]> {
    return this.http.get<AlertaFraude[]>(`${this.baseUrl}/mias`);
  }

  actualizarEstado(id: number, payload: ActualizarEstadoRequest): Observable<AlertaFraude> {
    return this.http.put<AlertaFraude>(`${this.baseUrl}/${id}/estado`, payload);
  }

  historial(id: number): Observable<HistorialRevision[]> {
    return this.http.get<HistorialRevision[]>(`${this.baseUrl}/${id}/historial`);
  }
}
