import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppointmentsComponent } from './appointments.component';
import { AppointmentListComponent } from './appointment-list/appointment-list.component';
import { AppointmentDetailComponent } from './appointment-detail/appointment-detail.component';
import { VerifyTokenGuard } from '../../services/guards/verify-token.guard';

const routes: Routes = [
  {
    path: '',
    component: AppointmentsComponent,
    canActivateChild: [VerifyTokenGuard],
    data: { titulo: 'Gestión de Turnos' },
    children: [
      {
        path: '',
        component: AppointmentListComponent
      },
      {
        path: 'new',
        component: AppointmentDetailComponent,
        data: { titulo: 'Gestión de Turnos' },
      },
      { path: ':id', component: AppointmentDetailComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppointmentsRoutingModule { }
