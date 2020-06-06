import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams
} from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError as observableThrowError,  Subject } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private _url: string;
  constructor(
    public httpClient: HttpClient
  ) {}
  public get url() {
    return this._url;
  }
  public set url(value: string) {
    this._url = value;
  }
  getAll<T>(
    filter = '',
    sortField = 'id',
    sortDirection = 'asc',
    pageNumber = 0,
    pageSize = 0,
    roles = []
  ): Observable<T> {
    // const mergedUrl =
    //   `${this.url}` +
    //   `?page=${this.paginationService.page}&pageCount=${
    //     this.paginationService.pageCount
    //   }`;
    const options: { params } = {
      params: new HttpParams()
        .set('filter', filter)
        .set('sortField', sortField)
        .set('sortDirection', sortDirection)
        .set('pageNumber', pageNumber.toString())
        .set('pageSize', pageSize.toString())
    };
    if (roles) {
      options.params.updates.push(
        {param: 'roles', value: roles.join(','), op: 's'});
    }
    return this.httpClient
      .get<T>(this.url, options)
      .pipe(
        map((res: any) => res),
        catchError(this.handleError),
      );
  }
  getSingle<T>(id: number): Observable<T> {
    return this.httpClient.get<T>(`${this.url}/${id}`);
  }
  add<T>(toAdd: T): Observable<T> {
    return this.httpClient.post<T>(this.url, toAdd, httpOptions).pipe(
      map((response: any) => {
        // this.dataChange.next(response.business);
        return response;
      }),
      catchError(this.handleError)
    );
  }

  update<T>(toUpdate: T): Observable<T> {
    const id = typeof toUpdate === 'number' ? toUpdate : toUpdate['id'];
    const url = `${this.url}/${id}`;
    // _.omit(toUpdate, ['id']);
    return this.httpClient
      .put<T>(url, toUpdate, httpOptions)
      .pipe(catchError(this.handleError));
  }
  delete<T>(toDelete: T | number): Observable<T> {
    // return this.httpClient.delete(url);
    const id = typeof toDelete === 'number' ? toDelete : toDelete['id'];
    const url = `${this.url}/${id}`;
    return this.httpClient
      .delete<T>(url, httpOptions)
      .pipe(catchError(this.handleError));
  }
  public handleError(error: HttpErrorResponse) {
    let message = '';
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      // console.error('An error occurred:', error.error.message);
      message = error.error.message;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      // console.error(
      //   `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      // );
      if (error.error.message instanceof Array) {
        error.error.message.map(el => {
          message += `${el.message}\n`;
        });
      } else {
        message = error.error.message;
      }
    }
    // return an observable with a user-facing error message
    return observableThrowError(message);
  }
}

// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

// // import { Config } from '../config';

// @Injectable()
// export class HttpService {
//   constructor(protected _http: HttpClient) { }
//   public get<T>(url): Observable<any> {
//     // new HttpHeaders() returns an immutable object,
//     // so BE SURE you add your headers to the initial instance
//     // const headers = new HttpHeaders();
//     // headers.set('Content-Type', 'application/json');
//     // headers.set('Api-Token', token);
//     // const options = {
//     //   // This is NOT going to work, since the application/json is never assigned to the immutable object
//     //   // headers: new HttpHeaders()
//     //   //   .set('Content-Type', 'application/json')
//     //   //   .set('Api-Token', token),
//     //   headers: headers
//     // };

//     return this._http.get(url);
//   }

//   public post(url, payload): Observable<any> {
//     // new HttpHeaders() returns an immutable object,
//     // so BE SURE you add your headers to the initial instance
//     // const headers = new HttpHeaders();
//     // headers.set('Content-Type', 'application/json');
//     // headers.set('Api-Token', token);

//     // const options = {
//     //   // This is NOT going to work, since the application/json is never assigned to the immutable object
//     //   // headers: new HttpHeaders()
//     //   //   .set('Content-Type', 'application/json')
//     //   //   .set('Api-Token', token),
//     //   headers: headers
//     // };

//     return this._http.post(url, payload);
//   }

//   public put<T>(url, payload: T): Observable<T> {
//     // new HttpHeaders() returns an immutable object,
//     // so BE SURE you add your headers to the initial instance
//     // const headers = new HttpHeaders()
//     //   .set('Content-Type', 'application/json');
//     // .set('Api-Token', token);
//     // .set('Authorization', token);

//     // const options = {
//     //   headers: headers
//     // };

//     // console.warn('Token', headers.get('Api-Token'), headers.get('Content-Type'));

//     return this._http.put<T>(url, payload);
//   }


//   public delete(url): Observable<any> {
//     // new HttpHeaders() returns an immutable object,
//     // so BE SURE you add your headers to the initial instance
//     // const headers = new HttpHeaders();
//     // headers.set('Content-Type', 'application/json');
//     // headers.set('Api-Token', token);
//     //
//     // const options = {
//     //   headers: headers
//     // };

//     return this._http.delete(url);
//   }

// }
