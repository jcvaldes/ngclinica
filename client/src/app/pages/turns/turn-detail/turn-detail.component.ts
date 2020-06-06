import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { NotificationService } from '../../../services/notification.service';
import { TurnService } from '../turn.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Turn } from '../turn.model';

declare var $: any;
@Component({
  selector: 'app-turn-detail',
  templateUrl: './turn-detail.component.html',
  styleUrls: ['./turn-detail.component.scss']
})
export class TurnDetailComponent implements OnInit, OnDestroy {
  turn: Turn;
  turnSubscription: Subscription = new Subscription();

  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    SpecialityId: new FormControl(null, Validators.required),
    ProfesionalId: new FormControl(null, Validators.required),
    turnDate: new FormControl(null, Validators.required),
    active: new FormControl(true),
  });
  constructor(
    private notificationService: NotificationService,
    private dialogRef: MatDialogRef<TurnDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _turnService: TurnService,
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
      //   this._turnService.add<Turn>(this.form.value).subscribe(
      //     (resp: any) => {
      //       this.onClose(true);
      //       this.notificationService.success(':: El paciente ha sido creado');
      //     },
      //     (err) => {
      //       this.notificationService.error(`:: ${err}`);
      //     },
      //   );
      // } else {
      //   this._turnService.update<Turn>(this.form.value).subscribe(
      //     (turn) => {
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
    this.turnSubscription = this._turnService
      .getSingle<Turn>(data.id)
      .subscribe((res: any) => {
        this.turn = res.payload;
        this.form.get('id').setValue(this.turn.id);
        this.form.get('active').setValue(this.turn.active);
      }, err => this.notificationService.error(`:: ${err}`));1
  }
}
