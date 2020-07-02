import { CategoriesModule } from './../categories/categories.module';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../shared/material.module';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserListComponent } from './user-list/user-list.component';
import { SharedModule } from '../../../shared/shared.module';
import { UserSearchComponent } from './user-search/user-search.component';
import { PipesModule } from '../../../pipes/pipes.module';
import { ProfileComponent } from './profile/profile.component';
import { ProfessionalSearchComponent } from './professional-search/professional-search.component';



@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    UsersRoutingModule,
    PipesModule,
    SharedModule,
    CategoriesModule
  ],
  declarations: [
    UsersComponent,
    UserDetailComponent,
    ProfileComponent,
    UserListComponent,
    UserSearchComponent,
    ProfessionalSearchComponent
  ],
  exports: [
    UserSearchComponent,
    ProfessionalSearchComponent,
    UserDetailComponent
  ],
  providers: [],
  entryComponents: []
})
export class UsersModule {}
