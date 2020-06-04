import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RolesComponent } from './roles.component';
import { RoleListComponent } from './role-list/role-list.component';
import { RoleDetailComponent } from './role-detail/role-detail.component';
import { RoleListResolverGuard } from './role-list/role-list-resolver.guard';
import { RoleSingleResolverGuard } from './role-detail/role-single-resolver.guard';
import { VerifyTokenGuard } from '../../../services/guards/verify-token.guard';

const routes: Routes = [
  {
    path: '',
    component: RolesComponent,
    canActivateChild: [VerifyTokenGuard],
    data: { titulo: 'Gestión de Roles' },
    children: [
      {path: '', component: RoleListComponent,  runGuardsAndResolvers: 'always', resolve: { roles: RoleListResolverGuard }},
      {path: 'new', component: RoleDetailComponent},
      {path: ':id', component: RoleDetailComponent, resolve: { role: RoleSingleResolverGuard } },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolesRoutingModule { }
