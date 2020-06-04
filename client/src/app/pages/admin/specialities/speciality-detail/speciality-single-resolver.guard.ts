import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../../users/user.service';
import { Speciality } from '../speciality.model';
import { HttpService } from '../../../../services/http.service';

@Injectable({
  providedIn: 'root'
})
export class SpecialitySingleResolverGuard implements Resolve<Speciality>  {
  constructor(private httpService: HttpService, private userService: UserService) {
    this.httpService.url = `/api/speciality`;
  }
  // tslint:disable-next-line: max-line-length
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Speciality | Observable<Speciality> | Promise<Speciality> {
    const id: number = +route.paramMap.get('id');
    return this.httpService.getSingle(id);
  }
}
