import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Resolve, Router } from '@angular/router';
import { Observable, EMPTY } from 'rxjs';
import { TableDataSource } from '../../../../shared/datasource.component';
import { Category } from '../category.model';
import { CategoryService } from '../category.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryListResolverGuard implements Resolve<TableDataSource<Category>>  {
  private dataSource: TableDataSource<Category>;
  constructor(private _categoryService: CategoryService, private router: Router) { }
  // tslint:disable-next-line: max-line-length
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): TableDataSource<Category> | Observable<TableDataSource<Category>> | Promise<TableDataSource<Category>> {
    this.dataSource = new TableDataSource(this._categoryService);
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
