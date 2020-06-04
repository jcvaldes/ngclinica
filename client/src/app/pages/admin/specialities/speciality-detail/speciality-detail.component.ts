import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import * as _ from 'lodash';
import urlJoin from 'url-join';
import { Subscription } from 'rxjs';
import { Speciality } from '../speciality.model';
import { NotificationService } from '../../../../services/notification.service';
import { SpecialityService } from '../speciality.service';

declare var $: any;
@Component({
  selector: 'app-speciality-detail',
  templateUrl: './speciality-detail.component.html',
  styleUrls: ['./speciality-detail.component.scss']
})
export class SpecialityDetailComponent implements OnInit, OnDestroy {
  speciality: Speciality;
  specialitySubscription: Subscription = new Subscription();
  permission = [[]];
  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    name: new FormControl(null, Validators.required),
    active: new FormControl(true),
  });
  constructor(
    private notificationService: NotificationService,
    private dialogRef: MatDialogRef<SpecialityDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _httpService: SpecialityService,
  ) {
    if (data) {
      this.populateForm(data);
    }
  }
  ngOnDestroy() {
    this.specialitySubscription.unsubscribe();
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
        this._httpService.add<Speciality>(this.form.value).subscribe(
          (resp: any) => {
            this.onClose(true);
            this.notificationService.success(':: La especialidad ha sido creado');
          },
          (err) => {
            this.notificationService.error(`:: ${err}`);
          },
        );
      } else {
        this._httpService.update<Speciality>(this.form.value).subscribe(
          (speciality) => {
            this.onClose(true);
            this.notificationService.success(
              ':: La especialidad ha sido actualizado',
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
    this.specialitySubscription = this._httpService
      .getSingle<Speciality>(data.id)
      .subscribe((res: any) => {
        this.speciality = res.payload;
        this.form.get('id').setValue(this.speciality.id);
        this.form.get('name').setValue(this.speciality.name);
        this.form.get('active').setValue(this.speciality.active);
      }, err => this.notificationService.error(`:: ${err}`));
  }
}
