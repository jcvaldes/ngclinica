import { Speciality } from './speciality.model';
import { Injectable } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { HttpClient } from '@angular/common/http';
import urljoin from 'url-join';
import { environment } from '../../../../environments/environment';
import Swal from 'sweetalert2';
import { throwError } from 'rxjs';
@Injectable()
export class SpecialityService extends HttpService{
  constructor(
    public http: HttpClient
  ) {
    super(http);
    this.url = urljoin(environment.apiUrl, '/api/speciality');
  }
}
