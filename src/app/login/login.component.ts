import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoginCredentials } from '../models/login.model';
import { AuthService } from '../auth.service';
import { TokenStorageService } from '../token-storage.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  credentials: LoginCredentials = {
    usuario: '',
    contrasena: '',
    recordarme: false
  };

  errorMessage: string = '';

  constructor(
    private readonly authService: AuthService,
    private readonly tokenStorage: TokenStorageService,
    private readonly router: Router
  ) {}

  onSubmit(): void {
    this.errorMessage = '';
    this.authService
      .login({
        usuario: this.credentials.usuario,
        contrasena: this.credentials.contrasena
      })
      .subscribe({
        next: (response) => {
          this.tokenStorage.setSession({
            token: response.token,
            refreshToken: response.refreshToken,
            usuario: response.usuario,
            rol: response.rol
          });
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          this.errorMessage = 'Credenciales inválidas. Por favor, intente de nuevo.';
        }
      });
  }
}
