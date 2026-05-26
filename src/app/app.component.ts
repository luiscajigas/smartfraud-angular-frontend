import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TokenStorageService } from './token-storage.service';
import { SidebarComponent } from './sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  private readonly tokenStorage = inject(TokenStorageService);
  private readonly router = inject(Router);

  readonly usuario = computed(() => this.tokenStorage.getUsuario());
  readonly rol = computed(() => this.tokenStorage.getRol());
  readonly isLoggedIn = computed(() => !!this.tokenStorage.getToken());

  logout(): void {
    this.tokenStorage.clear();
    this.router.navigate(['/login']);
  }
}
