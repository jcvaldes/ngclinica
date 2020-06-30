import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NotificationService } from '../../../services/notification.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Patient } from '../patient.model';
import { HttpService } from '../../../services/http.service';

declare var $: any;
@Component({
  selector: 'app-patient-detail',
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.scss']
})
export class PatientDetailComponent implements OnInit, OnDestroy {
  patient: Patient;
  patientSubscription: Subscription = new Subscription();

  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    name: new FormControl(null, Validators.required),
    active: new FormControl(true),
  });
  constructor(
    private notificationService: NotificationService,
    private dialogRef: MatDialogRef<PatientDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _httpService: HttpService,
  ) {
    if (data) {
      this.populateForm(data);
    }
  }
  ngOnDestroy() {
    this.patientSubscription.unsubscribe();
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
      //   this._httpService.add<HttpService>(this.form.value).subscribe(
      //     (resp: any) => {
      //       this.onClose(true);
      //       this.notificationService.success(':: El paciente ha sido creado');
      //     },
      //     (err) => {
      //       this.notificationService.error(`:: ${err}`);
      //     },
      //   );
      // } else {
      //   this._httpService.update<HttpService>(this.form.value).subscribe(
      //     (patient) => {
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
      description: '',
      active: true,
    });
  }
  populateForm(data) {
    // this.patientSubscription = this._httpService
    //   .HttpService<Patient>(data.id)
    //   .subscribe((res: any) => {
    //     this.patient = res.payload;
    //     this.form.get('id').setValue(this.patient.id);
    //     this.form.get('patientname').setValue(this.patient.patientname);
    //     this.form.get('description').setValue(this.patient.description);
    //     this.form.get('ApplicationId').setValue(this.patient.ApplicationId);
    //     this.form.get('active').setValue(this.patient.active);
    //   }, err => this.notificationService.error(`:: ${err}`));
  }
}
