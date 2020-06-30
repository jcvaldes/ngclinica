import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NotificationService } from '../../../services/notification.service';
import { Appointment } from '../appointment.model';
import { User } from '../../admin/users/user.model';
import { Category } from '../../admin/categories/category.model';
import { NgxCalendarComponent } from 'ss-ngx-calendar';
import Swal from 'sweetalert2';
import * as moment from 'moment';
import { HttpService } from '../../../services/http.service';

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
  appointmentTime: string = null;
  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    CategoryId: new FormControl(null, Validators.required),
    ProfessionalId: new FormControl(null, Validators.required),
    appointmentDate: new FormControl(null, Validators.required)
    // active: new FormControl(true),
  });
  calendarValue = null;
  calendarOptions = { isWeek: true, isWithTime: true, fromHour: 7, toHour: 19, fromDate: moment(), minuteInterval: 30, toDate: moment().add(1, 'M') };
  calendarRange = null;
  calendarEvents = [moment(), '2020-06-19'];
  constructor(
    private _notificationService: NotificationService,
    public _httpService: HttpService,
  ) {
    this.form.get('ProfessionalId').valueChanges.subscribe(value => {
      this.professional = this.professionals.filter(el => {
        return el.id === value;
      })[0];
      this.atendeeDays = this.professional.TimeSlot.map(item => item.day);
    });
  }
  ngOnDestroy() {
    this.appointmentSubscription.unsubscribe();
  }
  ngOnInit() {

  }
  onClear() {
    this.form.reset();
    Object.keys(this.form.controls).forEach(key => {
      this.form.get(key).setErrors(null);
    });
    this.category = null;
    this.professional = null;
    this.timeTable = null;
    this.appointmentTime = null;
  }
  onClose(refresh?) {
  }
  onSubmit() {
    // if (this.form.valid) {
      // if (!this.form.get('id').value) {
      //   Swal.fire({
      //     title: '¿Deseas Confirmar el Turno?',
      //     html: `
      //         Estás a punto de agendar un turno con el profesional <strong>${this.professional.firstname} ${this.professional.lastname}</strong> en la especialidad de <strong>${this.category.name}</strong>
      //     `,
      //     icon: 'warning',
      //     showCancelButton: true,
      //     confirmButtonText: 'Sí, Agendar!',
      //     cancelButtonText: 'No',
      //   }).then((result) => {
      //     if (result.value) {
          //   this._httpService.add<HttpService>(this.form.value).subscribe(
          //     (resp: any) => {
          //       Swal.fire(
          //         'Atención',
          //         'El turno ha sido creado',
          //         'success'
          //       );
          //       this.onClear();
          //     },
          //     (err) => {
          //       Swal.fire(
          //         'Error',
          //         `:: ${err}`,
          //         'error'
          //       );
          //     },
          //   );
          // }
        // });
      // } else {
        // this._httpService.update<HttpService>(this.form.value).subscribe(
        //   (appointment) => {
        //     Swal.fire(
        //       'Atención',
        //       ':: El turno ha sido actualizado',
        //       'success'
        //     );
        //   },
        //   (err) => {
        //     Swal.fire(
        //       'Error',
        //       `:: ${err}`,
        //       'error'
        //     );
        //   },
        // );
    //   }
    // }
  }
  populateForm(data) {
    // this.appointmentSubscription = this._httpService
    // HttpService<Appointment>(data.id)
    //   .subscribe((res: any) => {
    //     this.appointment = res.payload;
    //     this.form.get('id').setValue(this.appointment.id);
    //     this.form.get('active').setValue(this.appointment.active);
    //   }, err => this._notificationService.error(`:: ${err}`));
  }
  categoryChanged(category: Category) {
    this.category = category;
    this.professionals = category.users;
  }

  onChooseDate(date: any) {
    this.calendarValue = date.value;
    this.appointmentTime = null;
    this.timeTable = null;
    if (this.validateSchedule()) {
      this.createTimeTable();
    } else {
      this.form.get('appointmentDate').setValue(null);
    }
  }

  onChangeDate(date: any) {
    this.calendarRange = date;
  }
  private validateSchedule() {
    if (!this.professional || !this.category) {
      this._notificationService.error('Ingresa una especialidad y un profesional antes de continuar');
      return false;
    }
    if (!this.atendeeDays.includes(this.calendarValue.isoWeekday())) {
      this._notificationService.error('El profesional elegido no atiende el dia seleccionado, revisa los días en los que atiende e intenta nuevamente');
      return false;
    }
    return true;
  }
  private createTimeTable() {
    const x = 30; // minutes interval
    const schedule: any = this.professional.TimeSlot.find(i => i.day === this.calendarValue.isoWeekday());
    const hourStart = +schedule.timeStart.split(':')[0];
    const hourEnd = +schedule.timeEnd.split(':')[0];
    let times = []; // time array
    let tt = 0; // start time
    const ap = ['AM', 'PM']; // AM-PM
    // loop to increment the time and push results in array
    for (let i = 0; tt < 24 * 60; i++) {
      let hh = Math.floor(tt / 60); // getting hours of day in 0-24 format
      let mm = (tt % 60); // getting minutes of the hour in 0-55 format
      times[i] = (hh % 24) +
        ':' + ('0' + mm).slice(-2) // + ap[Math.floor(hh / 12)]; // pushing data in array in [00:00 - 12:00 AM/PM format]
      tt = tt + x;
    }

    this.timeTable = times.slice(
      times.findIndex(i => i === schedule.timeStart),
      times.findIndex(i => i === schedule.timeEnd)
    );
  }
  timeChange(evt) {
    const time = evt.value.split(':');
    this.appointmentTime = evt;
    debugger
    this.form.get('appointmentDate').setValue(
      new Date(
        this.calendarValue.year(),
        this.calendarValue.month(),
        this.calendarValue.date(),
        time[0],
        time[1]
      )
    );
  }
}
