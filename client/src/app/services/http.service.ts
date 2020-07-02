import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

// import { Config } from '../config';

@Injectable({providedIn: 'root'})
export class HttpService {
  constructor(protected _http: HttpClient) {
  }

  public get<T>(url, roles?): Observable<any> {
    // new HttpHeaders() returns an immutable object,
    // so BE SURE you add your headers to the initial instance
    let options = {};
    if (roles) {
      options = {
        params: new HttpParams()
          .set('roles', roles.join(', '))
      };
      return this._http.get(url, options);
    } else {
      return this._http.get(url);
    }
    
    
  }

  public post(url, payload): Observable<any> {
    // new HttpHeaders() returns an immutable object,
    // so BE SURE you add your headers to the initial instance
    // const headers = new HttpHeaders();
    // headers.set('Content-Type', 'application/json');
    // headers.set('Api-Token', token);

    // const options = {
    //   // This is NOT going to work, since the application/json is never assigned to the immutable object
    //   // headers: new HttpHeaders()
    //   //   .set('Content-Type', 'application/json')
    //   //   .set('Api-Token', token),
    //   headers: headers
    // };

    return this._http.post(url, payload);
  }

  public put<T>(url, payload: T): Observable<T> {
    // new HttpHeaders() returns an immutable object,
    // so BE SURE you add your headers to the initial instance
    // const headers = new HttpHeaders()
    //   .set('Content-Type', 'application/json');
    // .set('Api-Token', token);
    // .set('Authorization', token);

    // const options = {
    //   headers: headers
    // };

    // console.warn('Token', headers.get('Api-Token'), headers.get('Content-Type'));

    return this._http.put<T>(url, payload);
  }


  public delete<T>(url): Observable<T> {
    // new HttpHeaders() returns an immutable object,
    // so BE SURE you add your headers to the initial instance
    // const headers = new HttpHeaders();
    // headers.set('Content-Type', 'application/json');
    // headers.set('Api-Token', token);
    //
    // const options = {
    //   headers: headers
    // };

    return this._http.delete<T>(url);
  }
  getSingle<T>(url) {
    return this._http.get<T>(
      `${url}`
    );
  }
}
