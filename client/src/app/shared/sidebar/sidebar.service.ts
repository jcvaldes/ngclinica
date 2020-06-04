import { Injectable } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Injectable({providedIn: 'root'})
export class SidebarService {
  menu: any = [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Dashboard', url: '/dashboard' },
      ]
    },
    {
      titulo: 'Mantenimientos',
      icono: 'mdi mdi-folder-lock-open',
      submenu: [
        { titulo: 'Profesionales', url: '/profesionales' },
        { titulo: 'Pacientes', url: '/patients' },
        // { titulo: 'Hospitales', url: '/hospitales' },
        { titulo: 'Turnos', url: '/turnos' },
      ]
    }
  ];
  constructor(
    public _authService: AuthService
  ) {}
  loadMenu() {
    this.menu = this._authService.menu;
  }
}
