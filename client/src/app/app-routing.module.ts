import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages/pages.component';
import { Page404Component } from './shared/page404/page404.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { LoginGuard } from './services/guards/login.guard';


const routes: Routes = [
  // { path: 'user/profile', component: ProfileComponent},
  {
    path: '',
    component: PagesComponent,
    canActivate: [LoginGuard],
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
  },
   { path: '**', component: Page404Component},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
