import { User } from './user.model';
import { Injectable } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { HttpClient } from '@angular/common/http';
import urljoin from 'url-join';
import { environment } from '../../../../environments/environment';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { throwError } from 'rxjs';
import { FileUploadService } from '../../../services/file-upload/file-upload.service';
import { AuthService } from '../../../auth/auth.service';
@Injectable()
export class UserService extends HttpService {
  url: string;
  constructor(
    public http: HttpClient,
    public _authService: AuthService,
    public _fileUploadService: FileUploadService,
  ) {
    super(http);
    this.url = urljoin(environment.apiUrl, '/api/user');
  }
  newUser(user) {
    return this.post(this.url, user)
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
  changeImage(file: File, id: number) {
    return this._fileUploadService
      .fileUpload(file, 'users', id)
      .then((response: any) => {
        if (id === this._authService.user.id) {
          this._authService.user.img = response.user.img;
          Swal.fire('Imagen actualizada', this._authService.user.firstname, 'success');
          this._authService.saveStorage(id.toString(), this._authService.token, this._authService.user, this._authService.menu);
        }
        return true;
      })
      .catch(error => {
        console.error(error);
      });
  }
  uploadImage(file: File, id: number, name: string) {
    return this._fileUploadService
      .fileUpload(file, name, id)
      .then((response: any) => {
        this._authService.saveStorage(id.toString(), this._authService.token, this._authService.user, this._authService.menu);
        return true;
      })
      .catch(error => {
        console.error(error);
      });
  }
}
