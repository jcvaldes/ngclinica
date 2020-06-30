import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
declare function init_plugins();
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loading: boolean;
  subscription: Subscription;
  email: string;
  password: string;
  captchaResponse = '';
  rememberme = false;
  constructor(
    public _authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    init_plugins();
    this.email = localStorage.getItem('email') || '';
    if (this.email.length > 1) {
      this.rememberme = true;
    }
  }
  onLogin(f: NgForm) {
    const user = { email: f.value.email, password: f.value.password };
    this._authService.loginEmailUser(user, f.value.rememberme)
      .subscribe(
        response => {
          this.onLoginRedirect();
        },
        err => this.handleError(err));
  }
  resolved(captchaResponse: string) {
    this.captchaResponse = captchaResponse;
    console.log(`Resolved response token: ${captchaResponse}`);
  }
  onLoginFacebook() { }
  onLoginGoogle() { }

  private onLoginRedirect() {
    this.router.navigate(['/dashboard']);
  }
  private handleError(err) {
    if (err.error.errors) {
      Swal.fire('Error', err.error.errors, 'error');
    } else {
      Swal.fire('Error', err.message, 'error');
    }
  }
}
