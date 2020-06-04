import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PatientsRoutingModule } from './patients-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { PatientService } from './patient.service';
import { MaterialModule } from '../../shared/material.module';
import { PatientListComponent } from './turn-list/turn-list.component';
import { PatientDetailComponent } from './patient-detail/patient-detail.component';
import { NotificationService } from '../../services/notification.service';
import { PatientsComponent } from './patients.component';
import { PatientListResolverGuard } from './turn-list/turn-list-resolver.guard';
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
  providers: [PatientService, PatientListResolverGuard]
})
export class PatientsModule {}
