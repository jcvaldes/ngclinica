import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatientsComponent } from './patients.component';
import { PatientListComponent } from './patient-list/patient-list.component';
import { PatientDetailComponent } from './patient-detail/patient-detail.component';
import { VerifyTokenGuard } from '../../services/guards/verify-token.guard';

const routes: Routes = [
  {
    path: '',
    component: PatientsComponent,
    canActivateChild: [VerifyTokenGuard],
    data: { titulo: 'Gestión de Pacientes' },
    children: [
      { path: '', component: PatientListComponent },
      { path: 'new', component: PatientDetailComponent },
      { path: ':id', component: PatientDetailComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientsRoutingModule { }
