import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SpecialitiesComponent } from './specialities.component';
import { SpecialityListComponent } from './speciality-list/speciality-list.component';
import { SpecialityDetailComponent } from './speciality-detail/speciality-detail.component';
import { SpecialityListResolverGuard } from './speciality-list/speciality-list-resolver.guard';
import { SpecialitySingleResolverGuard } from './speciality-detail/speciality-single-resolver.guard';
import { VerifyTokenGuard } from '../../../services/guards/verify-token.guard';

const routes: Routes = [
  {
    path: '',
    component: SpecialitiesComponent,
    canActivateChild: [VerifyTokenGuard],
    data: { titulo: 'Gestión de Especialidades' },
    children: [
      {
        path: '',
        component: SpecialityListComponent,
        runGuardsAndResolvers: 'always',
        resolve: { specialities: SpecialityListResolverGuard }
      },
      { path: 'new', component: SpecialityDetailComponent },
      { path: ':id', component: SpecialityDetailComponent, resolve: { speciality: SpecialitySingleResolverGuard } },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpecialitiesRoutingModule { }
