import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PatientsRoutingModule } from './patients-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { MaterialModule } from '../../shared/material.module';
import { PatientListComponent } from './patient-list/patient-list.component';
import { PatientDetailComponent } from './patient-detail/patient-detail.component';
import { PatientsComponent } from './patients.component';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    PatientsComponent,
    PatientListComponent,
    PatientDetailComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    PatientsRoutingModule,
    PipesModule,
    RouterModule
  ],
  providers: []
})
export class PatientsModule {}
