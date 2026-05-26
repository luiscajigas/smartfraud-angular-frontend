import { Component, OnInit, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AlertasService } from '../services/alertas.service';
import { DashboardService } from '../services/dashboard.service';
import { DashboardStats } from '../models/dashboard.model';
import { AlertaFraude } from '../models/alerta.model';
import { TokenStorageService } from '../token-storage.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  private readonly dashboardService = inject(DashboardService);
  private readonly alertasService = inject(AlertasService);
  private readonly tokenStorage = inject(TokenStorageService);

  readonly rol = computed(() => this.tokenStorage.getRol());
  stats: DashboardStats | null = null;
  recentAlertas: AlertaFraude[] = [];

  ngOnInit(): void {
    if (this.rol() === 'ADMIN' || this.rol() === 'ANALISTA') {
      this.dashboardService.stats().subscribe((s) => (this.stats = s));
      this.alertasService.listarTodas().subscribe((data) => (this.recentAlertas = data.slice(0, 5)));
    }
  }
}
