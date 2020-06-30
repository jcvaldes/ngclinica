import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { VerifyTokenGuard } from '../../../services/guards/verify-token.guard';
import { validRoles } from '../../../utils/enums';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    canActivateChild: [VerifyTokenGuard],
    data: { titulo: 'Gestión de Usuarios' },
    children: [
      {
        path: '',
        component: UserListComponent
      },
      { path: 'new', component: UserDetailComponent, data: { role: validRoles.Admin} },
      { path: ':id', component: UserDetailComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
