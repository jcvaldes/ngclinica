import { Injectable } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Injectable()
export class SidebarService {
  menu: any = [];
  // menu: any = [
  //   {
  //     titulo: 'Principal',
  //     icono: 'mdi mdi-gauge',
  //     submenu: [
  //       { titulo: 'Dashboard', url: '/dashboard' },
  //       { titulo: 'ProgressBar', url: '/progress' },
  //       { titulo: 'Gráficas', url: '/graficas1' },
  //       { titulo: 'Promesas', url: '/promesas' },
  //       { titulo: 'Rxjs', url: '/rxjs' },
  //     ]
  //   },
  //   {
  //     titulo: 'Mantenimientos',
  //     icono: 'mdi mdi-folder-lock-open',
  //     submenu: [
  //       { titulo: 'Usuarios', url: '/users'},
  //       { titulo: 'Hospitales', url: '/hospitales'},
  //       { titulo: 'Médicos', url: '/medicos'}
  //     ]
  //   }
  // ];
  constructor(
    public _authService: AuthService
  ) {
  }
  loadMenu() {
    this.menu = this._authService.menu;
  }
}
