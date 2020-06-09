import { TableDataSource } from '../../../../shared/datasource.component';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Resolve, Router } from '@angular/router';
import { Observable, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserService } from '../user.service';
import { User } from '../user.model';
import { validRoles } from '../../../../utils/enums';

@Injectable()
export class UserListResolverGuard implements Resolve<TableDataSource<User>>  {
  private dataSource: TableDataSource<User>;
  constructor(private _userService: UserService, private router: Router) {}
  // tslint:disable-next-line: max-line-length
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): TableDataSource<User> | Observable<TableDataSource<User>> | Promise<TableDataSource<User>> {
    this.dataSource = new TableDataSource(this._userService);
    const filter: string = route.queryParamMap.get('filter') || '';
    const pageIndex: number = +route.queryParamMap.get('pageIndex') || 0;
    const pageSize: number = +route.queryParamMap.get('pageSize') || 10;
    debugger
    return this.dataSource.load(
      filter,
      'id',
      'asc',
      pageIndex,
       pageSize,
       [validRoles.Admin, validRoles.Profesional]).then((data) => {
      return this.dataSource;
    });
  }
}
