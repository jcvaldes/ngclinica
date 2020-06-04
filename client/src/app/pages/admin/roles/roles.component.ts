import {
  Component,
  OnInit,
} from '@angular/core';

import { ViewChild } from '@angular/core';
import { RoleDetailComponent } from './role-detail/role-detail.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html'
})
export class RolesComponent implements OnInit {
  constructor(private router: Router) {}
  ngOnInit() {}
  createdRole() {
    this.router.navigate(['roles']);
  }
}
