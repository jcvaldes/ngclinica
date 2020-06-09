import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { NotificationService } from '../../../services/notification.service';
import { AppointmentService } from '../appointment.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Appointment } from '../appointment.model';

declare var $: any;
@Component({
  selector: 'app-appointment-detail',
  templateUrl: './appointment-detail.component.html',
  styleUrls: ['./appointment-detail.component.scss']
})
export class AppointmentDetailComponent implements OnInit, OnDestroy {
  appointment: Appointment;
  turnSubscription: Subscription = new Subscription();

  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    CategoryId: new FormControl(null, Validators.required),
    ProfesionalId: new FormControl(null, Validators.required),
    turnDate: new FormControl(null, Validators.required),
    active: new FormControl(true),
  });
  constructor(
    private notificationService: NotificationService,
    private dialogRef: MatDialogRef<AppointmentDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _appointmentService: AppointmentService,
  ) {
    if (data) {
      this.populateForm(data);
    }
  }
  ngOnDestroy() {
    this.turnSubscription.unsubscribe();
  }
  ngOnInit() { }
  onClear() {
    this.onClose();
  }
  onClose(refresh?) {
    this.dialogRef.close(refresh);
  }
  onSubmit() {
    if (this.form.valid) {
      // if (!this.form.get('id').value) {
      //   this._appointmentService.add<Appointment>(this.form.value).subscribe(
      //     (resp: any) => {
      //       this.onClose(true);
      //       this.notificationService.success(':: El paciente ha sido creado');
      //     },
      //     (err) => {
      //       this.notificationService.error(`:: ${err}`);
      //     },
      //   );
      // } else {
      //   this._appointmentService.update<Appointment>(this.form.value).subscribe(
      //     (appointment) => {
      //       this.onClose(true);
      //       this.notificationService.success(
      //         ':: El paciente ha sido actualizado',
      //       );
      //     },
      //     (err) => {
      //       this.notificationService.error(`:: ${err}`);
      //     },
      //   );
      // }
    }
  }
  initializeFormGroup() {
    this.form.setValue({
      id: null,

      active: true,
    });
  }
  populateForm(data) {
    this.turnSubscription = this._appointmentService
      .getSingle<Appointment>(data.id)
      .subscribe((res: any) => {
        this.appointment = res.payload;
        this.form.get('id').setValue(this.appointment.id);
        this.form.get('active').setValue(this.appointment.active);
      }, err => this.notificationService.error(`:: ${err}`));1
  }
}
