import { TableDataSource } from '../../../shared/datasource.component';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Resolve, Router } from '@angular/router';
import { Observable, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppointmentService } from '../appointment.service';
import { Appointment } from '../appointment.model';
import { validRoles } from '../../../utils/enums';

@Injectable({
  providedIn: 'root'
})
export class AppointmentListResolverGuard implements Resolve<TableDataSource<Appointment>>  {
  private dataSource: TableDataSource<Appointment>;
  constructor(private _turnService: AppointmentService, private router: Router) { }
  // tslint:disable-next-line: max-line-length
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): TableDataSource<Appointment> | Observable<TableDataSource<Appointment>> | Promise<TableDataSource<Appointment>> {
    this.dataSource = new TableDataSource(this._turnService);
    const filter: string = route.queryParamMap.get('filter') || '';
    const pageIndex: number = +route.queryParamMap.get('pageIndex') || 0;
    const pageSize: number = +route.queryParamMap.get('pageSize') || 10;
    return this.dataSource.load(
      filter,
      'id',
      'asc',
      pageIndex,
      pageSize,
      [validRoles.Paciente]
    ).then((data) => {
      return this.dataSource;
    });
  }
}
