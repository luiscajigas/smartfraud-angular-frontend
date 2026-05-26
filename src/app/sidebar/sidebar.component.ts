import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuService } from '../services/menu.service';
import { MenuItem } from '../models/menu-item.model';
import { MenuNodeComponent } from '../menu-node/menu-node.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, MenuNodeComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  private readonly menuService = inject(MenuService);

  menu: MenuItem[] = [];
  loading = false;
  error: string | null = null;

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.loading = true;
    this.error = null;
    this.menuService.obtenerMenu().subscribe({
      next: (data) => {
        this.menu = data ?? [];
        this.loading = false;
      },
      error: () => {
        this.error = 'No se pudo cargar el menú';
        this.loading = false;
      }
    });
  }
}

