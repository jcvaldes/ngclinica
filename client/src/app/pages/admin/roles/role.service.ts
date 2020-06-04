import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import urljoin from 'url-join';
import { environment } from '../../../../environments/environment';
import { HttpService } from '../../../services/http.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService extends HttpService {
  constructor(
    public http: HttpClient,
  ) {
    super(http);
    this.url = urljoin(environment.apiUrl, '/api/role');
  }
}
