import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../shared/material.module';
import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesComponent } from './categories.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { SharedModule } from '../../../shared/shared.module';
import { CategorySearchComponent } from './category-search/category-search.component';


@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CategoriesRoutingModule,
    SharedModule,
  ],
  declarations: [
    CategoriesComponent,
    CategoryDetailComponent,
    CategoryListComponent,
    CategorySearchComponent
  ],
  exports: [
    CategorySearchComponent,
  ],
  providers: [],
  entryComponents: []
})
export class CategoriesModule {}
