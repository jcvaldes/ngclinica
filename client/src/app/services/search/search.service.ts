import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import urljoin from 'url-join';
import { environment } from '../../../environments/environment';
// import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { User } from '../../pages/admin/users/user.model';
import { map } from 'rxjs/operators';

@Injectable()
export class SearchService {
  constructor(public http: HttpClient, public router: Router) {}

  search(searchText: string) {
    let url = urljoin(environment.apiUrl, '/search/all/' + searchText);
    return this.http.get(url).pipe(map((response: any) => response));
  }
}
