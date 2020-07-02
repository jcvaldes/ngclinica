import { TimeSlot } from './../../../../models/timeslot.model';
import { Component, OnInit, OnDestroy, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray, AbstractControl } from '@angular/forms';
import * as _ from 'lodash';
import { Subscription, BehaviorSubject } from 'rxjs';
import { User } from '../user.model';
import { NotificationService } from '../../../../services/notification.service';
import { UserService } from '../user.service';
import { validRoles } from '../../../../utils/enums';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../../../environments/environment';
import Swal from 'sweetalert2';
import { AuthService } from '../../../../auth/auth.service';

import * as moment from 'moment';
@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})

export class UserDetailComponent implements OnInit, OnDestroy, OnChanges {
  url: string;
  isRequired = false;
  displayedColumns: string[] = ['day', 'timeStart', 'timeEnd'];
  selection = new SelectionModel<TimeSlotElement>(true, []);
  timeData: TimeSlotElement[] = [];
  dataSource: MatTableDataSource<TimeSlotElement>;
  user: User;
  @Input() userId: number;
  isProfessional = false;
  userSubscription: Subscription = new Subscription();
  imageUpload: File;
  imageTemp: string | ArrayBuffer;
  form: FormGroup;

  constructor(
    private notificationService: NotificationService,
    private activatedRoute: ActivatedRoute,
    public _authService: AuthService,
    public _userService: UserService,
    private router: Router
  ) {
    this.url = `${environment.apiUrl}/api/user`;
    this.form = new FormGroup({
      id: new FormControl(null),
      firstname: new FormControl(null, Validators.required),
      lastname: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      role: new FormControl('1', [Validators.required]),
      categories: new FormControl([]),
      timeslot: new FormArray([
        this.addTimeSlot(1),
        this.addTimeSlot(2),
        this.addTimeSlot(3),
        this.addTimeSlot(4),
        this.addTimeSlot(5),
        this.addTimeSlot(6),
        this.addTimeSlot(7)
      ]),
      active: new FormControl(true),
    });
    if (router.url.indexOf('/new') !== -1) {
      this.form.addControl('password', new FormControl(null, Validators.required));
      this.form.addControl('confirmPassword', new FormControl(null, Validators.required));
      this.isRequired = true;
    } else {
      this.form.addControl('password', new FormControl(null));
      this.form.addControl('confirmPassword', new FormControl(null));
    }
    this.form.updateValueAndValidity();
    // this.form.get('timeslot').setValue(this.dataSource.data);

  }
  get timeslot() {
    return this.form.get('timeslot') as FormArray;
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.user && changes.user.currentValue) {
      this.populateForm(changes.user.currentValue.id);
   }
  }
  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
  addTimeSlot(i) {
    return new FormGroup({
      day: new FormControl(i),
      timeStart: new FormControl(null),
      timeEnd: new FormControl(null)
    });
  }
  ngOnInit() {
    this.dataSource = new MatTableDataSource<TimeSlotElement>(ELEMENT_DATA);
    this.activatedRoute.params.subscribe(params => {
      if (this.router.url.indexOf('new') === -1) {
        const id = +params.id;
        if (!isNaN(id)) {
          this.populateForm(id);
        } else {
          this.populateForm(this.userId);
        }
      }
    });
  }
  onClear() {
    this.form.reset();
  }

  onSubmit() {
    if (this.form.valid) {
      if (!this.form.get('id').value) {
        this._userService.post(this.url, this.form.value).subscribe(
          (resp: any) => {
            Swal.fire(
              'Atención :)',
              'El usuario ha sido creado',
              'success',
            );
            this.form.get('id').setValue(resp.user.id);
          },
          (err) => {
            this.handleError(err);
          },
        );
      } else {
        const id = !this.userId ? this.form.get('id').value : this._authService.user.id;
        this._userService.put<User>(`${this.url}/${id}`, this.form.value).subscribe(
          () => {
            if (this._authService.user.role === validRoles.Admin) {
              this.router.navigate(['/users']);
            }
            Swal.fire(
              'Atención',
              'El usuario ha sido actualizado',
              'success',
            );
          },
          (err) => this.handleError(err)

        );
      }
    }
  }
  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);

    Swal.fire(
      'Error :(',
      `${errMsg}`,
      'error',
    );

  }
  populateForm(id) {
    this._userService.getSingle(`${this.url}/${id}`).subscribe((data: any) => {
      const { firstname, lastname, email, role } = data.user;
      this.user = data.user;
      const categories = data.user.Professional ? data.user.Professional.categories : null;
      const timeslot = data.user.Professional ? data.user.Professional.timeslot : null;

      this.form.get('id').setValue(id);
      this.form.get('firstname').setValue(firstname);
      this.form.get('lastname').setValue(lastname);
      this.form.get('email').setValue(email);
      this.form.get('role').setValue(role.toString());
      if (role === validRoles.Professional) {
        this.isProfessional = true;
        this.form.get('categories').setValue(categories.map(i => i.id));
        timeslot.map((value, key) => {

          this.timeslot.controls[value.day - 1].get('timeStart').setValue(value.timeStart);
          this.timeslot.controls[value.day - 1].get('timeEnd').setValue(value.timeEnd);
        });
      }
    });

    // const { firstname, lastname, email, role, categories, TimeSlots } = ;
    // this.form.get('id').setValue(this.user.id);
    // this.form.get('firstname').setValue(this.user.firstname);
    // this.form.get('lastname').setValue(this.user.lastname);
    // this.form.get('email').setValue(this.user.email);
    // this.form.get('role').setValue(this.user.role);

  }
  onSelectionChange(evt) {
    this.isProfessional = (+evt.value === validRoles.Professional);
  }
  setDefaultTime(evt) {
    evt.stopPropagation();
  }
  // timeChanged(evt, el, ts) {

  //   if (ts === 's') {
  //     el.timeStart = evt;
  //   } else {
  //     el.timeEnd = evt;
  //   }
  // }
  // private filterTimeSlot(timeslot: TimeSlot[]) {
  //   return timeslot.filter(i => {
  //     return i.timeStart && i.timeEnd;
  //   });
  // }

  selectImage(file: File) {
    if (!file) {
      this.imageUpload = null;
      return;
    }
    if (file.type.indexOf('image') < 0) {
      Swal.fire(
        'Sólo imágenes',
        'El archivo seleccionado no es una imagen',
        'error',
      );
      this.imageUpload = null;
      return;
    }
    this.imageUpload = file;

    // hace preview de la imagen
    let reader = new FileReader();
    let urlImageTmp = reader.readAsDataURL(file);
    reader.onloadend = () => (this.imageTemp = reader.result);
  }

  changeImage() {
    this._userService
      .changeImage(this.imageUpload, !this.userId ? this.form.get('id').value : this._authService.user.id)
      .then(() => {
        this.imageUpload = null;
        Swal.fire(
          'Atención',
          'Se ha actualizado la imagen del usuario',
          'success'
        );
      });
  }
}
export interface TimeSlotElement {

  day: number;
  timeStart: string;
  timeEnd: string;
}

let ELEMENT_DATA: TimeSlotElement[] = [
  { day: 1, timeStart: null, timeEnd: null },
  { day: 2, timeStart: null, timeEnd: null },
  { day: 3, timeStart: null, timeEnd: null },
  { day: 4, timeStart: null, timeEnd: null },
  { day: 5, timeStart: null, timeEnd: null },
  { day: 6, timeStart: null, timeEnd: null },
  { day: 7, timeStart: null, timeEnd: null },

];
