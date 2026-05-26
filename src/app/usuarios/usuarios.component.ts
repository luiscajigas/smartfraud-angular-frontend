import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuariosService } from '../services/usuarios.service';
import { Usuario } from '../models/usuario.model';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent implements OnInit {
  private readonly service = inject(UsuariosService);

  usuarios: Usuario[] = [];
  selected: Usuario | null = null;
  editModel: { email: string; direccion: string; telefono: string } = { email: '', direccion: '', telefono: '' };
  saving = false;

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.service.listar().subscribe((u) => (this.usuarios = u));
  }

  abrirEditar(u: Usuario): void {
    this.selected = u;
    this.editModel = { email: u.email, direccion: u.direccion, telefono: u.telefono };
  }

  cerrarEditar(): void {
    this.selected = null;
  }

  guardar(): void {
    if (!this.selected) {
      return;
    }
    this.saving = true;
    this.service.actualizar(this.selected.id, this.editModel).subscribe({
      next: () => {
        this.saving = false;
        this.cerrarEditar();
        this.cargar();
      },
      error: () => {
        this.saving = false;
      }
    });
  }

  eliminar(id: number): void {
    this.service.eliminar(id).subscribe(() => this.cargar());
  }
}
