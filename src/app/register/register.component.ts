import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { TokenStorageService } from '../token-storage.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  model: {
    usuario: string;
    contrasena: string;
    rol: 'CLIENTE';
    email: string;
    direccion: string;
    telefono: string;
    nombreCompleto: string;
  } = {
    usuario: '',
    contrasena: '',
    rol: 'CLIENTE',
    email: '',
    direccion: '',
    telefono: '',
    nombreCompleto: ''
  };

  errorMessage = '';

  constructor(
    private readonly authService: AuthService,
    private readonly tokenStorage: TokenStorageService,
    private readonly router: Router
  ) {}

  onSubmit(): void {
    this.errorMessage = '';
    this.authService.register(this.model).subscribe({
      next: (response) => {
        this.tokenStorage.setSession({
          token: response.token,
          refreshToken: response.refreshToken,
          usuario: response.usuario,
          rol: response.rol
        });
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.errorMessage = 'No se pudo registrar. Verifica los datos e intenta de nuevo.';
      }
    });
  }
}
