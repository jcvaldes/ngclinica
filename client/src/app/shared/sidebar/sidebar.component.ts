import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { SidebarService } from './sidebar.service';
import { User } from '../../pages/admin/users/user.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {
  user: User;
  constructor(
    public _sidebar: SidebarService,
    public _authService: AuthService) { }

  ngOnInit() {
    this.user = this._authService.user;
    this._sidebar.loadMenu();
  }
}
