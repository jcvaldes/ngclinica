import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../pages/admin/users/user.model';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {
  user: User;
  constructor(
    public _authService: AuthService,
    public router: Router
  ) { }

  ngOnInit() {
    this.user = this._authService.user;
  }
  search( term: string) {
    this.router.navigate(['/search', term]);
  }
}
