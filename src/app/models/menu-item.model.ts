export interface MenuItem {
  id: number;
  nombre: string;
  ruta?: string | null;
  hijos?: MenuItem[];
}
