import { User } from './user.model';
import { Injectable } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { HttpClient } from '@angular/common/http';
import urljoin from 'url-join';
import { environment } from '../../../../environments/environment';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { throwError } from 'rxjs';
@Injectable()
export class UserService extends HttpService{
  constructor(
    public http: HttpClient
  ) {
    super(http);
    this.url = urljoin(environment.apiUrl, '/api/user');
  }
  newUser(user) {
    return this.add(user)
    .pipe(
      map((response: any) => {
        Swal.fire('Usuario creado', user.email, 'success');
        return response.user;
      })
    )
    .pipe(
      catchError(err => {
        Swal.fire('Error', err, 'error');
        return throwError(err);
      })
    );
  }

}
