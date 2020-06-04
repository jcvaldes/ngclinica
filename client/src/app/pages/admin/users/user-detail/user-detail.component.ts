import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import * as _ from 'lodash';

import urlJoin from 'url-join';
import { Subscription } from 'rxjs';
import { User } from '../user.model';
import { NotificationService } from '../../../../services/notification.service';
import { UserService } from '../user.service';

declare var $: any;
@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit, OnDestroy {
  user: User;
  userSubscription: Subscription = new Subscription();
  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    fullname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    enabled: new FormControl(true),
    password: new FormControl(null, Validators.required),
    confirmPassword: new FormControl(null, Validators.required),
    roles: new FormControl([], Validators.required),
    active: new FormControl(true),
  });
  constructor(
    private notificationService: NotificationService,
    private dialogRef: MatDialogRef<UserDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _userService: UserService
  ) {
    if (data) {
      this.populateForm(data);
    }
  }
  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
  ngOnInit() {}
  onClear() {
    this.onClose();
  }
  onClose(refresh?) {
    this.dialogRef.close(refresh);
  }
  onSubmit() {

    if (this.form.valid) {
      if (!this.form.get('id').value) {
        this._userService.add<User>(this.form.value).subscribe(
          (resp: any) => {
            this.onClose(true);
            this.notificationService.success(':: El usuario ha sido creado');
          },
          (err) => {
            this.notificationService.error(`:: ${err}`);
          },
        );
      } else {
        this._userService.update<User>(this.form.value).subscribe(
          (user) => {
            this.onClose(true);
            this.notificationService.success(
              ':: El usuario ha sido actualizado',
            );
          },
          (err) => {
            this.notificationService.error(`:: ${err}`);
          },
        );
      }
    }
  }
  initializeFormGroup() {
    this.form.setValue({
      id: null,
      description: '',
      active: true,
    });
  }
  populateForm(data) {
    this.userSubscription = this._userService
      .getSingle<User>(data.id)
      .subscribe((res: any) => {
        debugger
        this.user = res.payload;
      });
  }
}
