import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../services/dashboard.service';
import { DashboardStats } from '../models/dashboard.model';

@Component({
  selector: 'app-estadisticas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './estadisticas.component.html',
  styleUrl: './estadisticas.component.css'
})
export class EstadisticasComponent implements OnInit {
  private readonly dashboardService = inject(DashboardService);

  stats: DashboardStats | null = null;

  ngOnInit(): void {
    this.dashboardService.stats().subscribe((s) => (this.stats = s));
  }
}
