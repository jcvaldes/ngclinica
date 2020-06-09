import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../../users/user.service';
import { Category } from '../category.model';
import { HttpService } from '../../../../services/http.service';

@Injectable({
  providedIn: 'root'
})
export class CategorySingleResolverGuard implements Resolve<Category>  {
  constructor(private httpService: HttpService, private userService: UserService) {
    this.httpService.url = `/api/category`;
  }
  // tslint:disable-next-line: max-line-length
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Category | Observable<Category> | Promise<Category> {
    const id: number = +route.paramMap.get('id');
    return this.httpService.getSingle(id);
  }
}
