import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import * as _ from 'lodash';
import urlJoin from 'url-join';
import { Subscription } from 'rxjs';
import { Category } from '../category.model';
import { NotificationService } from '../../../../services/notification.service';
import { HttpService } from '../../../../services/http.service';


declare var $: any;
@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.scss']
})
export class CategoryDetailComponent implements OnInit, OnDestroy {
  Category: Category;
  CategorySubscription: Subscription = new Subscription();
  permission = [[]];
  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    name: new FormControl(null, Validators.required),
    active: new FormControl(true),
  });
  constructor(
    private notificationService: NotificationService,
    private dialogRef: MatDialogRef<CategoryDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _httpService: HttpService,
  ) {
    if (data) {
      this.populateForm(data);
    }
  }
  ngOnDestroy() {
    this.CategorySubscription.unsubscribe();
  }
  ngOnInit() {}
  onClear() {
    this.onClose();
  }
  onClose(refresh?) {
    this.dialogRef.close(refresh);
  }
  onSubmit() {
    // if (this.form.valid) {
    //   if (!this.form.get('id').value) {
    //     this._httpService.add<Category>(this.form.value).subscribe(
    //       (resp: any) => {
    //         this.onClose(true);
    //         this.notificationService.success(':: La especialidad ha sido creado');
    //       },
    //       (err) => {
    //         this.notificationService.error(`:: ${err}`);
    //       },
    //     );
    //   } else {
    //     this._httpService.update<Category>(this.form.value).subscribe(
    //       (Category) => {
    //         this.onClose(true);
    //         this.notificationService.success(
    //           ':: La especialidad ha sido actualizado',
    //         );
    //       },
    //       (err) => {
    //         this.notificationService.error(`:: ${err}`);
    //       },
    //     );
    //   }
    // }
  }
  initializeFormGroup() {
    this.form.setValue({
      id: null,
      description: '',
      active: true,
    });
  }
  populateForm(data) {
    // this.CategorySubscription = this._httpService
    //   .getSingle<Category>(data.id)
    //   .subscribe((res: any) => {
    //     this.Category = res.payload;
    //     this.form.get('id').setValue(this.Category.id);
    //     this.form.get('name').setValue(this.Category.name);
    //     this.form.get('active').setValue(this.Category.active);
    //   }, err => this.notificationService.error(`:: ${err}`));
  }
}
