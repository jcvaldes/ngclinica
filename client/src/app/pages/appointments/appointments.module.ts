import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppointmentsRoutingModule } from './appointments-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { MaterialModule } from '../../shared/material.module';
import { AppointmentListComponent } from './appointment-list/appointment-list.component';
import { AppointmentDetailComponent } from './appointment-detail/appointment-detail.component';
import { AppointmentsComponent } from './appointments.component';

import { PipesModule } from '../../pipes/pipes.module';
import { CategoriesModule } from '../admin/categories/categories.module';
import { UsersModule } from '../admin/users/users.module';
import { NgxCalendarModule } from 'ss-ngx-calendar';

@NgModule({
  declarations: [
    AppointmentsComponent,
    AppointmentListComponent,
    AppointmentDetailComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule,
    AppointmentsRoutingModule,
    PipesModule,
    RouterModule,
    CategoriesModule,
    UsersModule,
    NgxCalendarModule,
  ],
  providers: []
})
export class AppointmentsModule { }
