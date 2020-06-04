import { HttpService } from '../services/http.service';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, finalize, distinctUntilChanged } from 'rxjs/operators';


export class TableDataSource<T> implements DataSource<T> {
  payloadSubject = new BehaviorSubject<T[]>([]);

  private loadingSubject = new BehaviorSubject<boolean>(false);
  private countSubject = new BehaviorSubject<number>(0);
  public payload: T[];
  // indicador de carga
  public loading$ = this.loadingSubject.asObservable();
  public count$ = this.countSubject.asObservable();
  constructor(private _httpService: HttpService) {}

  load(
    filter: string,
    sortField: string,
    sortDirection: string,
    pageIndex: number,
    pageSize: number,
    roles = []
  ) {
    return new Promise((resolve, reject) => {
      this.loadingSubject.next(true);
      this._httpService
        .getAll<T>(
          filter, sortField, sortDirection, pageIndex, pageSize, roles
        )
        .pipe(
          catchError(() => of([])),
          finalize(() => {
            this.loadingSubject.next(false);
          })
        )
        .subscribe(res => {
         // this.payload = res['payload'];
          this.payloadSubject.next(res['payload']);
          this.countSubject.next(res['count']);
          resolve(this.payloadSubject);
        });
    });
  }

  connect(collectionViewer: CollectionViewer): Observable<T[]> {
    console.log('Connecting data source');
    return this.payloadSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.payloadSubject.complete();
    this.loadingSubject.complete();
  }
}
