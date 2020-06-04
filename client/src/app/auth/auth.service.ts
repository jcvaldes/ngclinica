import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { User } from '../pages/admin/users/user.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../services/http.service';
import { environment } from '../../environments/environment';
import urljoin from 'url-join';
import { throwError } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends HttpService {
  user: User;
  token: string;
  menu: any = [];
  urlRedirect = '';
  private loginUrl: string;
  constructor(
    public http: HttpClient,
    private router: Router,
  ) {
    super(http);
    this.loginUrl = urljoin(environment.apiUrl, '/api/auth');
    this.loadStorage();
  }
  renewToken() {
    const url = urljoin(this.loginUrl, `/renewtoken?token=${this.token}`);
    return this.http
      .get(url)
      .pipe(
        map((response: any) => {
          this.token = response.token;
          localStorage.setItem('token', this.token);
          console.log('Token renovado');
          return true;
        })
      )
      .pipe(
        catchError(err => {
          this.logout();
          Swal.fire(
            'No se pudo renovar el token',
            'No fue posible renovar el token',
            'error'
          );
          return throwError(err);
        })
      );
  }
  loginEmailUser(user, remember: boolean = false) {
    // this.store.dispatch(new ActivarLoadingAction());
    if (remember) {
      localStorage.setItem('email', user.email);
    } else {
      localStorage.removeItem('email');
    }
    return this.http
      .post(this.loginUrl, user)
      .pipe(
        map((response: any) => {
          this.saveStorage(
            response.id,
            response.token,
            response.user,
            response.menu
          );
          this.router.navigate(['/dashboard']);
        })
      )
      .pipe(
        catchError(err => {
          return throwError(err);
        })
      );
  }

  saveStorage(id: string, token: string, user: User, menu: any) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('menu', JSON.stringify(menu));
    this.user = user;
    this.token = token;
    this.menu = menu;
  }
  logout() {
    this.user = null;
    this.token = '';
    this.menu = [];
    // this.store.dispatch( new UnsetUserAction() );
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('menu');
    this.router.navigate(['/login']);
  }

  isLoggedIn(url: string) {
    this.urlRedirect = url;
    const isLogged = this.token.length > 5;
    if (!isLogged)  {
      return false;
    } else {
      return true;
    }
  }
  private loadStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.user = JSON.parse(localStorage.getItem('user'));
      this.menu = JSON.parse(localStorage.getItem('menu'));
    } else {
      this.token = '';
      this.user = null;
      this.menu = [];
    }
  }
}
