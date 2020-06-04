import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { VerifyTokenGuard } from '../../../services/guards/verify-token.guard';
import { UserListResolverGuard } from './user-list/user-list-resolver.guard';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    canActivateChild: [VerifyTokenGuard],
    data: { titulo: 'Gestión de Usuarios' },
    children: [
      { path: '', component: UserListComponent, runGuardsAndResolvers: 'always', resolve: { users: UserListResolverGuard } },
      { path: 'new', component: UserDetailComponent },
      { path: ':id', component: UserDetailComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
