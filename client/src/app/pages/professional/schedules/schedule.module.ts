import { ScheduleListComponent } from './schedule-list/schedule-list.component';
import { ScheduleComponent } from './schedule.component';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../shared/material.module';

import { SharedModule } from '../../../shared/shared.module';

import { PipesModule } from '../../../pipes/pipes.module';
import { ScheduleRoutingModule } from './schedule-routing.module';



@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ScheduleRoutingModule,
    PipesModule,
    SharedModule,
   
  ],
  declarations: [
    ScheduleComponent,
   
    ScheduleListComponent,

  ],

  providers: [],
  entryComponents: []
})
export class ScheduleModule {}
