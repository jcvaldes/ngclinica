import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import * as _ from 'lodash';
import urlJoin from 'url-join';
import { Subscription } from 'rxjs';
import { Role } from '../role.model';
import { NotificationService } from '../../../../services/notification.service';
import { RoleService } from '../role.service';

declare var $: any;
@Component({
  selector: 'app-role-detail',
  templateUrl: './role-detail.component.html',
  styleUrls: ['./role-detail.component.scss']
})
export class RoleDetailComponent implements OnInit, OnDestroy {
  role: Role;
  roleSubscription: Subscription = new Subscription();
  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    name: new FormControl(null, Validators.required),
    description: new FormControl(null),
    active: new FormControl(true),
  });
  constructor(
    private notificationService: NotificationService,
    private dialogRef: MatDialogRef<RoleDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _httpService: RoleService,
  ) {
    if (data) {
      this.populateForm(data);
    }
  }
  ngOnDestroy() {
    this.roleSubscription.unsubscribe();
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
        this._httpService.add<Role>(this.form.value).subscribe(
          (resp: any) => {
            this.onClose(true);
            this.notificationService.success(':: El rol ha sido creado');
          },
          (err) => {
            this.notificationService.error(`:: ${err}`);
          },
        );
      } else {
        this._httpService.update<Role>(this.form.value).subscribe(
          (role) => {
            this.onClose(true);
            this.notificationService.success(
              ':: El rol ha sido actualizado',
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
    this.roleSubscription = this._httpService
      .getSingle<Role>(data.id)
      .subscribe((res: any) => {
        this.role = res.payload;
        this.form.get('id').setValue(this.role.id);
        this.form.get('name').setValue(this.role.name);
        this.form.get('description').setValue(this.role.description);
        this.form.get('active').setValue(this.role.active);
      }, err => this.notificationService.error(`:: ${err}`));
  }
}
