import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from './../services/interceptors/token.interceptor';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { Page404Component } from './page404/page404.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { PipesModule } from '../pipes/pipes.module';
import { ModalUploadComponent } from './modal-upload/modal-upload.component';
import { NotificationService } from '../services/notification.service';
import { FileUploadService } from '../services/file-upload/file-upload.service';
import { ModalUploadService } from './modal-upload/modal-upload.service';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    HttpClientModule,
    PipesModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    HeaderComponent,
    BreadcrumbsComponent,
    SidebarComponent,
    Page404Component,
    ModalUploadComponent,
  ],
  exports: [
    HeaderComponent,
    BreadcrumbsComponent,
    SidebarComponent,
    Page404Component,
    ModalUploadComponent,
  ],
  providers: [
    ModalUploadService,
    FileUploadService,
    NotificationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ]
})
export class SharedModule { }
