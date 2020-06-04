import { TableDataSource } from '../../../shared/datasource.component';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Resolve, Router } from '@angular/router';
import { Observable, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PatientService } from '../patient.service';
import { Patient } from '../patient.model';
import { validRoles } from '../../../utils/enums';

@Injectable({
  providedIn: 'root'
})
export class PatientListResolverGuard implements Resolve<TableDataSource<Patient>>  {
  private dataSource: TableDataSource<Patient>;
  constructor(private _patientService: PatientService, private router: Router) { }
  // tslint:disable-next-line: max-line-length
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): TableDataSource<Patient> | Observable<TableDataSource<Patient>> | Promise<TableDataSource<Patient>> {
    this.dataSource = new TableDataSource(this._patientService);
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
