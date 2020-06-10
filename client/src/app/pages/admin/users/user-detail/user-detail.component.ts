import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import * as _ from 'lodash';

import urlJoin from 'url-join';
import { Subscription } from 'rxjs';
import { User } from '../user.model';
import { NotificationService } from '../../../../services/notification.service';
import { UserService } from '../user.service';
import { validRoles } from '../../../../utils/enums';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';

declare var $: any;
@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})

export class UserDetailComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['select', 'id', 'day', 'timeStart', 'timeEnd'];
  selection = new SelectionModel<ScheduleElement>(true, []);
  dataSource = new MatTableDataSource<ScheduleElement>(ELEMENT_DATA);
  user: User;
  isProfessional = false;
  userSubscription: Subscription = new Subscription();
  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    CategoryId: new FormControl([]),
    fullname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl(null, Validators.required),
    confirmPassword: new FormControl(null, Validators.required),
    roles: new FormControl([], Validators.required),
    timeStart: new FormControl(null),
    timeEnd: new FormControl(null),
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
  ngOnInit() { }
  onClear() {
    this.onClose();
  }
  onClose(refresh?) {
    this.dialogRef.close(refresh);
  }
  onSubmit() {
    debugger
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
        this.user = res.payload;
      });
  }
  onSelectionChange(evt) {
    debugger
    this.isProfessional = (evt.indexOf(validRoles.Profesional) >= 0);
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: ScheduleElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }
}
export interface ScheduleElement {
  id: number;
  day: string;
  timeStart: string;
  timeEnd: string;
}

const ELEMENT_DATA: ScheduleElement[] = [
  {id: 1, day: 'Lunes', timeStart: null, timeEnd: null},
  {id: 2, day: 'Martes', timeStart: null, timeEnd: null},
  {id: 3, day: 'Miércoles', timeStart: null, timeEnd: null},
  {id: 4, day: 'Jueves', timeStart: null, timeEnd: null},
  {id: 5, day: 'Viernes', timeStart: null, timeEnd: null},
  {id: 6, day: 'Sábado', timeStart: null, timeEnd: null},
  {id: 7, day: 'Domingo', timeStart: null, timeEnd: null},

];