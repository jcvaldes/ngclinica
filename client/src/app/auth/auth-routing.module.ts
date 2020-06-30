import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { validRoles } from '../utils/enums';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'register-prof',
    component: RegisterComponent,
    data: { role: validRoles.Professional }
  },
  { path: 'register', component: RegisterComponent, data: { role: validRoles.Patient } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
