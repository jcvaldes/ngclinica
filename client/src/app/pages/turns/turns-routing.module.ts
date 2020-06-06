import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TurnsComponent } from './turns.component';
import { TurnListComponent } from './turn-list/turn-list.component';
import { TurnDetailComponent } from './turn-detail/turn-detail.component';
import { VerifyTokenGuard } from '../../services/guards/verify-token.guard';
import { TurnListResolverGuard } from './turn-list/turn-list-resolver.guard';

const routes: Routes = [
  {
    path: '',
    component: TurnsComponent,
    canActivateChild: [VerifyTokenGuard],
    data: { titulo: 'Gestión de Turnos' },
    children: [
      { path: '', component: TurnListComponent, runGuardsAndResolvers: 'always', resolve: { turns: TurnListResolverGuard } },
      { path: 'new', component: TurnDetailComponent },
      { path: ':id', component: TurnDetailComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TurnsRoutingModule { }
