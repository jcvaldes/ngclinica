import { Injectable } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { HttpClient } from '@angular/common/http';
import urljoin from 'url-join';
import { environment } from '../../../environments/environment';

@Injectable()
export class AppointmentService extends HttpService{
  constructor(
    public http: HttpClient
  ) {
    super(http);
    super.url = urljoin(environment.apiUrl, '/api/appointment');
  }

}
