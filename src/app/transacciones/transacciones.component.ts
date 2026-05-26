import { Component, OnInit, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TransaccionesService } from '../services/transacciones.service';
import { CrearTransaccionRequest, Transaccion } from '../models/transaccion.model';
import { TokenStorageService } from '../token-storage.service';

@Component({
  selector: 'app-transacciones',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './transacciones.component.html',
  styleUrl: './transacciones.component.css'
})
export class TransaccionesComponent implements OnInit {
  private readonly service = inject(TransaccionesService);
  private readonly tokenStorage = inject(TokenStorageService);

  readonly rol = computed(() => this.tokenStorage.getRol());

  creando = false;
  errorMessage = '';

  form: CrearTransaccionRequest = {
    monto: 0,
    moneda: 'USD',
    comercio: '',
    ubicacion: ''
  };

  transacciones: Transaccion[] = [];
  selectedTransaccionId: number | null = null;

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    const rol = this.rol();
    const obs = rol === 'ADMIN' || rol === 'ANALISTA' ? this.service.listarTodas() : this.service.listarMias();
    obs.subscribe((data) => (this.transacciones = data));
  }

  seleccionar(id: number): void {
    this.selectedTransaccionId = id;
  }

  crear(): void {
    this.errorMessage = '';
    this.creando = true;
    this.service.crear(this.form).subscribe({
      next: () => {
        this.creando = false;
        this.form = { monto: 0, moneda: 'USD', comercio: '', ubicacion: '' };
        this.cargar();
        this.selectedTransaccionId = null;
      },
      error: () => {
        this.creando = false;
        this.errorMessage = 'No se pudo crear la transacción.';
      }
    });
  }
}
