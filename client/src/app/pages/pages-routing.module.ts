import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginGuard } from '../services/guards/login.guard';
import { VerifyTokenGuard } from '../services/guards/verify-token.guard';
import { AdminGuard } from '../services/guards/admin.guard';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [VerifyTokenGuard],
    data: { titulo: 'Dashboard' }
  }, {
    path: 'users',
    canActivate: [AdminGuard],
    loadChildren: () => import('./admin/users/users.module').then(m => m.UsersModule)
  }, {
    path: 'roles',
    canActivate: [AdminGuard],
    loadChildren: () => import('./admin/roles/roles.module').then(m => m.RolesModule)
  }, {
    path: 'specialities',
    canActivate: [AdminGuard],
    loadChildren: () => import('./admin/specialities/specialities.module').then(m => m.SpecialitiesModule)
  }, {
    path: 'patients',
    canActivate: [LoginGuard],
    loadChildren: () => import('./patients/patients.module').then(m => m.PatientsModule)
  }, {
    path: 'turns',
    canActivate: [LoginGuard],
    loadChildren: () => import('./turns/turns.module').then(m => m.TurnsModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
