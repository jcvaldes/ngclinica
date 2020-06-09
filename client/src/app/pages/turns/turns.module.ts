import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TurnsRoutingModule } from './turns-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { TurnService } from './turn.service';
import { MaterialModule } from '../../shared/material.module';
import { TurnListComponent } from './turn-list/turn-list.component';
import { TurnDetailComponent } from './turn-detail/turn-detail.component';
import { NotificationService } from '../../services/notification.service';
import { TurnsComponent } from './turns.component';
import { TurnListResolverGuard } from './turn-list/turn-list-resolver.guard';
import { PipesModule } from '../../pipes/pipes.module';
import { CategoriesModule } from '../admin/categories/categories.module';
import { UsersModule } from '../admin/users/users.module';

@NgModule({
  declarations: [
    TurnsComponent,
    TurnListComponent,
    TurnDetailComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    TurnsRoutingModule,
    PipesModule,
    RouterModule,
    CategoriesModule,
    UsersModule
  ],
  providers: [TurnService, TurnListResolverGuard]
})
export class TurnsModule {}
