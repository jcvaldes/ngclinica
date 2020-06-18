import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NotificationService } from '../../../services/notification.service';
import { AppointmentService } from '../appointment.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Appointment } from '../appointment.model';
import { User } from '../../admin/users/user.model';
import { Category } from '../../admin/categories/category.model';

import { NgxCalendarComponent } from 'ss-ngx-calendar';
import * as moment from 'moment';

declare var $: any;
@Component({
  selector: 'app-appointment-detail',
  templateUrl: './appointment-detail.component.html',
  styleUrls: ['./appointment-detail.component.scss']
})
export class AppointmentDetailComponent implements OnInit, OnDestroy {
  @ViewChild('calendar') calendar: NgxCalendarComponent;
  atendeeDays: number[] = [];
  professionals: User[] = [];
  professional: User;
  timeTable: string[];
  category: Category;
  appointment: Appointment;
  appointmentSubscription: Subscription = new Subscription();

  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    CategoryId: new FormControl(null, Validators.required),
    ProfesionalId: new FormControl(null, Validators.required),
    appointmentDate: new FormControl(null, Validators.required)    
    // active: new FormControl(true),
  });
  calendarOptions = {};

  calendarValue = null;

  calendarOptions2 = {
    isWeek: true
  };

  calendarRange = null;


  calendarOptions3 = {
    isWeek: true,
    isWithTime: true
  };
  constructor(
    private notificationService: NotificationService,
    public _appointmentService: AppointmentService,
  ) {
    this.form.get('ProfesionalId').valueChanges.subscribe(value => {
      this.professional = this.professionals.filter(el => {
        return el.id === value;
      })[0];
      this.atendeeDays = this.professional.Schedules.map(item => item.day);
    });
  }
  ngOnDestroy() {
    this.appointmentSubscription.unsubscribe();
  }
  ngOnInit() {

  }
  onClear() {
    this.onClose();
  }
  onClose(refresh?) {
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
    this.appointmentSubscription = this._appointmentService
      .getSingle<Appointment>(data.id)
      .subscribe((res: any) => {
        this.appointment = res.payload;
        this.form.get('id').setValue(this.appointment.id);
        this.form.get('active').setValue(this.appointment.active);
      }, err => this.notificationService.error(`:: ${err}`));
  }
  categoryChanged(category: Category) {
    this.category = category;
    this.professionals = category.users;
  }

  onChooseDate(date: any) {
    this.calendarValue = date;
    if (this.validateSchedule()) {
      this.createTimeTable();
    };
  }

  onChangeDate(date: any) {
    this.calendarRange = date;
  }
  private validateSchedule() {
    if (!this.professional || !this.category) {
      this.notificationService.error('Ingresa una especialidad y un profesional antes de continuar');
      return false;
    }
    if (!this.atendeeDays.includes(this.calendarValue.isoWeekday())) {
      this.notificationService.error('El profesional elegido no atiende el dia seleccionado, revisa los días en los que atiende e intenta nuevamente');
      return false;
    }
    return true;
  }
  private createTimeTable() {
    const x = 30; // minutes interval
    debugger
    const schedule: any = this.professional.Schedules.find(i => i.day === this.calendarValue.isoWeekday());
    const hourStart = +schedule.timeStart.split(':')[0];
    const hourEnd = +schedule.timeEnd.split(':')[0];

    let times = []; // time array
    let tt = 0; // start time
    const ap = ['AM', 'PM']; // AM-PM
    // loop to increment the time and push results in array
    for (let i = 0; tt < 24 * 60; i++) {
      let hh = Math.floor(tt / 60); // getting hours of day in 0-24 format
      let mm = (tt % 60); // getting minutes of the hour in 0-55 format
      times[i] =(hh % 12) +
        ':' + ('0' + mm).slice(-2) // + ap[Math.floor(hh / 12)]; // pushing data in array in [00:00 - 12:00 AM/PM format]
      tt = tt + x;
    }

    this.timeTable = times.slice(
      times.findIndex(i => i === schedule.timeStart),
      times.findIndex(i => i === schedule.timeEnd)
    );

  }
}
