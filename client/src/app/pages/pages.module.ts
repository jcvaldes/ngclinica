import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PagesComponent } from './pages.component';

@NgModule({
  declarations: [
    DashboardComponent,
    PagesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    PagesRoutingModule
  ],
  exports: [DashboardComponent],
  providers: []
})
export class PagesModule { }
