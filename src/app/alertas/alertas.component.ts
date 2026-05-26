import { Component, OnInit, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertasService } from '../services/alertas.service';
import { ActualizarEstadoRequest, AlertaFraude, EstadoAlerta, HistorialRevision } from '../models/alerta.model';
import { TokenStorageService } from '../token-storage.service';

@Component({
  selector: 'app-alertas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './alertas.component.html',
  styleUrl: './alertas.component.css'
})
export class AlertasComponent implements OnInit {
  private readonly service = inject(AlertasService);
  private readonly tokenStorage = inject(TokenStorageService);

  readonly rol = computed(() => this.tokenStorage.getRol());

  alertas: AlertaFraude[] = [];
  historial: HistorialRevision[] = [];
  selectedAlertId: number | null = null;
  updating = false;

  updateModel: ActualizarEstadoRequest = { nuevoEstado: 'EN_REVISION' };

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    const rol = this.rol();
    const obs = rol === 'ADMIN' || rol === 'ANALISTA' ? this.service.listarTodas() : this.service.listarMias();
    obs.subscribe((data) => (this.alertas = data));
  }

  selectAlert(id: number): void {
    this.selectedAlertId = id;
    this.service.historial(id).subscribe((h) => (this.historial = h));
  }

  actualizarEstado(alerta: AlertaFraude): void {
    if (this.rol() !== 'ADMIN' && this.rol() !== 'ANALISTA') {
      return;
    }
    if (this.updating) {
      return;
    }
    this.updating = true;
    this.service.actualizarEstado(alerta.id, this.updateModel).subscribe(() => {
      this.cargar();
      if (this.selectedAlertId === alerta.id) {
        this.selectAlert(alerta.id);
      }
      this.updating = false;
    }, () => {
      this.updating = false;
    });
  }

  selectedAlerta(): AlertaFraude | null {
    if (this.selectedAlertId === null) {
      return null;
    }
    return this.alertas.find((a) => a.id === this.selectedAlertId) ?? null;
  }

  actualizarSeleccionada(): void {
    const alerta = this.selectedAlerta();
    if (!alerta) {
      return;
    }
    this.actualizarEstado(alerta);
  }

  estados(): EstadoAlerta[] {
    return ['PENDIENTE', 'EN_REVISION', 'APROBADA', 'FRAUDE_CONFIRMADO'];
  }
}
