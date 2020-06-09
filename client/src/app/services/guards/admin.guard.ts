import { AuthService } from './../../auth/auth.service';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
  constructor(public _authService: AuthService) {}
  canActivate() {
    let roles = this._authService.user.roles;
    if (containsAdminRole(roles) >= 0) {
      return true;
    } else {
      this._authService.logout();
      return false;
    }
  }
}
function containsAdminRole(roles) {
  return roles.findIndex(role => role.name === 'Administrador');
}
