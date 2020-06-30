import { Component, OnInit, OnDestroy, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { Subscription } from 'rxjs';
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
import { TimeSlot } from '../../../../models/timeslot.model';
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
  dataSource = new MatTableDataSource<TimeSlotElement>(ELEMENT_DATA);
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
    private _authService: AuthService,
    private _userService: UserService,
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
      timeslot: new FormControl([]),
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
    this.form.get('timeslot').setValue(this.dataSource.data);
   
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.user && changes.user.currentValue) {
      this.populateForm(changes.user.currentValue.id);
    }
  }
  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      const id = +params.id;
      if (!isNaN(id)) {
        this.populateForm(id);
      } else {
        this.populateForm(this.userId);
      }
    });
   }
  onClear() {
    this.form.reset();
  }

  onSubmit() {
    if (this.form.valid) {
      if (!this.form.get('id').value) {
        this.form.get('timeslot').setValue(
          this.filterTimeSlot(this.form.get('timeslot').value)
        );
        this._userService.post(this.url, this.form.value).subscribe(
          (resp: any) => {
            this.notificationService.success(':: El usuario ha sido creado');
            this.form.get('id').setValue(resp.user.id);
          },
          (err) => {
            this.notificationService.error(`:: ${err}`);
          },
        );
      } else {
        const id = !this.userId ? this.form.get('id').value : this._authService.user.id;
        this._userService.put<User>(`${this.url}/${id}`, this.form.value).subscribe(
          () => {
            this.router.navigate(['/users']);
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

  populateForm(id) {

      this._userService.getSingle(this.url, id).subscribe((data: any) => {
        const { firstname, lastname, email, role, categories } = data.user;
        this.user = data.user;
        this.form.get('id').setValue(id);
        this.form.get('firstname').setValue(firstname);
        this.form.get('lastname').setValue(lastname);
        this.form.get('email').setValue(email);
        this.form.get('role').setValue(role.toString());
        if (role === validRoles.Professional) {
          this.isProfessional = true;
          this.form.get('categories').setValue(categories.map(i => i.id));
          // TimeSlots.map(el => {

          //   if (el.day === i) {
          //     this.dataSource.data['timeStart'] = el.timeStart;
          //   }
          // });
          this.form.get('TimeSlots').setValue(categories.map(i => i.id));
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
  timeChanged(evt, el, ts) {
  
    if (ts === 's') {
      el.timeStart = evt;
    } else {
      el.timeEnd = evt;
    }
  }
  private filterTimeSlot(timeslot: TimeSlot[]) {
    return timeslot.filter(i => {
      return i.timeStart && i.timeEnd;
    });
  }

  selectImage(file: File) {
    if (!file) {
      this.imageUpload = null;
      return;
    }
    if (file.type.indexOf('image') < 0) {
      Swal.fire(
        'Sólo imágenes',
        'El archivo seleccionado no es una imagen',
        'error'
      );
      this.imageUpload = null;
      return;
    }
    this.imageUpload = file;

    // hace preview de la imagen
    let reader = new FileReader();
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

const ELEMENT_DATA: TimeSlotElement[] = [
  { day: 1, timeStart: null, timeEnd: null },
  { day: 2, timeStart: null, timeEnd: null },
  { day: 3, timeStart: null, timeEnd: null },
  { day: 4, timeStart: null, timeEnd: null },
  { day: 5, timeStart: null, timeEnd: null },
  { day: 6, timeStart: null, timeEnd: null },
  { day: 7, timeStart: null, timeEnd: null },
];
