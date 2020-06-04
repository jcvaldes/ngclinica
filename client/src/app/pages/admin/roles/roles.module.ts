import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../shared/material.module';

import { RolesRoutingModule } from './roles-routing.module';
import { RolesComponent } from './roles.component';
import { RoleDetailComponent } from './role-detail/role-detail.component';
import { RoleListComponent } from './role-list/role-list.component';
import { RoleSearchComponent } from './role-search/role-search.component';
import { SharedModule } from '../../../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RolesRoutingModule,
    SharedModule,
  ],
  declarations: [
    RolesComponent,
    RoleListComponent,
    RoleDetailComponent,
    RoleSearchComponent
  ],
  exports: [
    RoleSearchComponent,
  ],
  providers: [],
  entryComponents: []
})
export class RolesModule {}
