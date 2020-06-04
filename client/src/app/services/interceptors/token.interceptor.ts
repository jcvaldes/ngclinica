import { AuthService } from './../../auth/auth.service';
import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {
  constructor (private injector: Injector) {}

  intercept (request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const auth = this.injector.get(AuthService);
    const token = auth.user && auth.token ? auth.token : '';
    request = request.clone({
      setHeaders: {
        // 'Api-Token': token,
        // TODO: Replace following line with an actual Base64 | JWT-based token
        'Authorization': `Bearer ${token}`,
        'X-Requested-With': 'XMLHttpRequest'
      }
    });

    return next.handle(request);
  }
}
