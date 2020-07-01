import { UserService } from '../../pages/admin/users/user.service';
import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';

import { Router, ActivationEnd } from '@angular/router';
import { validRoles } from '../../utils/enums';
import { map } from 'rxjs/operators';

declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  role: number;
  constructor(
    public _userService: UserService,
    public router: Router
  ) { }

  comparePasswords(field1: string, field2: string) {
    // tslint:disable-next-line:no-shadowed-variable
    return (group: FormGroup) => {
      let pass1 = group.controls[field1].value;
      let pass2 = group.controls[field2].value;
      if (pass1 === pass2) {
        return null;
      }

      return {
        areEquals: true
      };
    };
  }

  ngOnInit() {
    init_plugins();
    this.router.events
      .pipe(map((evento: ActivationEnd) => evento.snapshot.data)).subscribe(role => {
        debugger
      });
    this.form = new FormGroup(
      {
        firstname: new FormControl(null, Validators.required),
        lastname: new FormControl(null, Validators.required),
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, Validators.required),
        confirmPassword: new FormControl(null, Validators.required)
      },
      { validators: this.comparePasswords('password', 'confirmPassword') }
    );
  }

  register() {
    if (this.form.invalid) {
      return;
    }
    const user = {
      firstname: this.form.value.firstname,
      lastname: this.form.value.lastname,
      email: this.form.value.email,
      password: this.form.value.password,
      role: this.role === validRoles.Professional ? validRoles.Professional : validRoles.Patient
    };
    this._userService
      .newUser(user)
      .subscribe(() => this.router.navigate(['/login']),
    );
  }
}
