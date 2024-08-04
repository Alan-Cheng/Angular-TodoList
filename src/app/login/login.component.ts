import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Auth } from '../domain/entities';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  auth!: Auth;

  constructor(@Inject('auth') private service: AuthService, private router: Router) {}

  ngOnInit() {}

  onSubmit(formValue: any) {
    this.service.loginWithCredentials(formValue.login.username, formValue.login.password)
    .then(auth => {
      let redirectUrl = (auth.redirectUrl === '/') ? '/' : auth.redirectUrl;
      console.log(redirectUrl);
      if (!auth.hasError) {
        this.router.navigate([redirectUrl]);
        localStorage.removeItem('redirectUrl');
      }
      else {
        this.auth = Object.assign({}, auth);
      }
    });
  }
}
