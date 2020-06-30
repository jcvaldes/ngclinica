import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ScheduleRoutingModule } from './schedule-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { MaterialModule } from '../../shared/material.module';
import { AppointmentListComponent } from './schedule-list/schedule-list.component';
import { AppointmentDetailComponent } from './schedule-detail/schedule-detail.component';
import { ScheduleComponent } from './schedule.component';

import { PipesModule } from '../../pipes/pipes.module';
import { CategoriesModule } from '../admin/categories/categories.module';
import { UsersModule } from '../admin/users/users.module';
import { NgxCalendarModule } from 'ss-ngx-calendar';


@NgModule({
  declarations: [
    ScheduleComponent,
    AppointmentListComponent,
    AppointmentDetailComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule,
    ScheduleRoutingModule,
    PipesModule,
    RouterModule,
    CategoriesModule,
    UsersModule,
    NgxCalendarModule,
  ],
  providers: []
})
export class ScheduleModule { }
