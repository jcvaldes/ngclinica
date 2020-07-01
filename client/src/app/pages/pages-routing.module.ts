import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginGuard } from '../services/guards/login.guard';
import { VerifyTokenGuard } from '../services/guards/verify-token.guard';
import { AdminGuard } from '../services/guards/admin.guard';
import { ProfileComponent } from './admin/users/profile/profile.component';
import { ProfessionalGuard } from '../services/guards/professional.guard';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [VerifyTokenGuard],
    data: { titulo: 'Dashboard' }
  }, {
    path: 'profile',
    canActivate: [LoginGuard],
    component: ProfileComponent,
    data: { titulo: 'Perfil de usuario'}
  }, {
    path: 'users',
    canActivate: [AdminGuard],
    loadChildren: () => import('./admin/users/users.module').then(m => m.UsersModule)
  }, {
    path: 'categories',
    canActivate: [AdminGuard],
    loadChildren: () => import('./admin/categories/categories.module').then(m => m.CategoriesModule)
  }, {
    path: 'patients',
    canActivate: [LoginGuard],
    loadChildren: () => import('./patients/patients.module').then(m => m.PatientsModule)
  }, {
    path: 'appointments',
    canActivate: [LoginGuard],
    loadChildren: () => import('./appointments/appointments.module').then(m => m.AppointmentsModule)
  },
  {
    path: 'schedules',
    canActivate: [ProfessionalGuard],
    loadChildren: () => import('./professional/schedules/schedule.module').then(m => m.ScheduleModule)
  },
  { path: '**', component: DashboardComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
