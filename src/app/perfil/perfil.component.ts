import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TokenStorageService } from '../token-storage.service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {
  private readonly tokenStorage = inject(TokenStorageService);
  private readonly router = inject(Router);

  readonly usuario = computed(() => this.tokenStorage.getUsuario());
  readonly rol = computed(() => this.tokenStorage.getRol());

  logout(): void {
    this.tokenStorage.clear();
    this.router.navigate(['/login']);
  }
}
