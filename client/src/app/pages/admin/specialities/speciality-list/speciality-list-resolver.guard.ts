import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Resolve, Router } from '@angular/router';
import { Observable, EMPTY } from 'rxjs';
import { TableDataSource } from '../../../../shared/datasource.component';
import { Speciality } from '../speciality.model';
import { SpecialityService } from '../speciality.service';

@Injectable({
  providedIn: 'root'
})
export class SpecialityListResolverGuard implements Resolve<TableDataSource<Speciality>>  {
  private dataSource: TableDataSource<Speciality>;
  constructor(private _specialityService: SpecialityService, private router: Router) { }
  // tslint:disable-next-line: max-line-length
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): TableDataSource<Speciality> | Observable<TableDataSource<Speciality>> | Promise<TableDataSource<Speciality>> {
    this.dataSource = new TableDataSource(this._specialityService);
    const filter: string = route.queryParamMap.get('filter') || '';
    const pageIndex: number = +route.queryParamMap.get('pageIndex') || 0;
    const pageSize: number = +route.queryParamMap.get('pageSize') || 10;
    return this.dataSource.load(
      filter,
      'id',
      'asc',
      pageIndex,
      pageSize
    ).then((data) => {
        return this.dataSource;
      });
  }
}
