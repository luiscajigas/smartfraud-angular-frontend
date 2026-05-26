import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MenuItem } from '../models/menu-item.model';

@Component({
  selector: 'app-menu-node',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './menu-node.component.html',
  styleUrl: './menu-node.component.css'
})
export class MenuNodeComponent {
  @Input({ required: true }) item!: MenuItem;
  @Input() nivel = 0;

  expanded = true;

  toggle(): void {
    this.expanded = !this.expanded;
  }

  hasChildren(): boolean {
    return !!this.item.hijos && this.item.hijos.length > 0;
  }
}
