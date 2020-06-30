import { environment } from './../../../../../environments/environment';
import { Component, OnInit } from '@angular/core';


// tslint:disable-next-line: import-name
import Swal from 'sweetalert2';

import { HttpService } from '../../../../services/http.service';
import { User } from '../user.model';
import { UserService } from '../user.service';
import { NotificationService } from '../../../../services/notification.service';
import { AuthService } from '../../../../auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
    `
      p-b-20: {
        padding-bottom: 20px;
      }
    `,
  ]
})
export class ProfileComponent implements OnInit {
  userId: number;
  constructor(
    public _authService: AuthService,
  ) {
    debugger
    this.userId = _authService.user.id;
  }
  ngOnInit() { }
 

}
