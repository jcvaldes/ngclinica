import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScheduleComponent } from './schedule.component';
import { ScheduleListComponent } from './schedule-list/schedule-list.component';
import { ScheduleDetailComponent } from './schedule-detail/schedule-detail.component';
import { VerifyTokenGuard } from '../../services/guards/verify-token.guard';

const routes: Routes = [
  {
    path: '',
    component: ScheduleComponent,
    canActivateChild: [VerifyTokenGuard],
    data: { titulo: 'Gestión de Turnos' },
    children: [
      {
        path: '',
        component: ScheduleListComponent
      },
      { path: ':id', component: ScheduleDetailComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScheduleRoutingModule { }
