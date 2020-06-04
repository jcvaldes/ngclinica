import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Resolve, Router } from '@angular/router';
import { Observable, EMPTY } from 'rxjs';
import { TableDataSource } from '../../../../shared/datasource.component';
import { Role } from '../role.model';
import { RoleService } from '../role.service';

@Injectable({
  providedIn: 'root'
})
export class RoleListResolverGuard implements Resolve<TableDataSource<Role>>  {
  private dataSource: TableDataSource<Role>;
  constructor(private _roleService: RoleService, private router: Router) {}
  // tslint:disable-next-line: max-line-length
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): TableDataSource<Role> | Observable<TableDataSource<Role>> | Promise<TableDataSource<Role>> {
    this.dataSource = new TableDataSource(this._roleService);
    const filter: string = route.queryParamMap.get('filter') || '';
    const pageIndex: number = +route.queryParamMap.get('pageIndex') || 0;
    const pageSize: number = +route.queryParamMap.get('pageSize') || 10;
    return this.dataSource.load(filter, 'id', 'asc', pageIndex, pageSize).then((data) => {
      return this.dataSource;
    });
  }
}
