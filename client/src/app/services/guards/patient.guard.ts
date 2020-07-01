import { AuthService } from '../../auth/auth.service';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { validRoles } from '../../utils/enums';

@Injectable({ providedIn: 'root' })
export class StudentGuard implements CanActivate {
  constructor(public _authService: AuthService) {}
  canActivate() {
    let role = this._authService.user.role;
    if (containsPatientRole(role)) {
      return true;
    } else {
      this._authService.logout();
      return false;
    }
  }
}
function containsPatientRole(role) {
  return role.name === validRoles.Patient;
}
